import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { getUrlOptions } from "./utils.js";

export function createServer(databaseUrl) {
  const server = new McpServer({
    name: "DatabaseMCP",
    version: "1.0.0",
  });

  const urlOptions = getUrlOptions(databaseUrl);

  const dataSource = new DataSource({
    type: urlOptions.protocol,
    url: databaseUrl,
    synchronize: false,
    logging: false,
    options: urlOptions.options,
  });

  server.tool(
    "get_all_schemas",
    "Use this tool to get all the schemas in the database",
    {},
    async ({}) => {
      await dataSource.initialize();
      try {
        const result = await dataSource.query(
          `SELECT table_schema, table_name 
           FROM information_schema.tables 
           WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
           ORDER BY table_schema, table_name;`
        );

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } finally {
        await dataSource.destroy();
      }
    }
  );

  server.tool(
    "get_table_schema",
    "Use this tool to get the schema of a table, like the fields, types, and constraints. ",
    {
      schema: z.string().describe("The schema of the table"),
      table: z.string().describe("The table to get the schema of"),
    },
    async ({ schema, table }) => {
      await dataSource.initialize();
      try {
        let query;
        let params = [schema, table];

        switch (dataSource.options.type) {
          case "postgres":
          case "mysql":
            query = `SELECT COLUMN_NAME, 
                            DATA_TYPE, 
                            IS_NULLABLE, 
                            COLUMN_DEFAULT
                     FROM INFORMATION_SCHEMA.COLUMNS
                     WHERE TABLE_SCHEMA = $1 AND TABLE_NAME = $2`;
            break;

          case "mssql":
            query = `SELECT COLUMN_NAME, 
                            DATA_TYPE, 
                            IS_NULLABLE, 
                            COLUMN_DEFAULT
                     FROM INFORMATION_SCHEMA.COLUMNS
                     WHERE TABLE_SCHEMA = @0 AND TABLE_NAME = @1`;
            break;

          default:
            throw new Error("Database not supported.");
        }

        const result = await dataSource.query(query, params);

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } finally {
        await dataSource.destroy();
      }
    }
  );

  server.tool(
    "run_query",
    "Use this tool to run a query on the database",
    { query: z.string().describe("The query to run") },
    async ({ query }) => {
      await dataSource.initialize();
      try {
        const result = await dataSource.query(query);

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } finally {
        await dataSource.destroy();
      }
    }
  );

  return server;
}
