import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server";

const databaseUrlEnv = process.env.DATABASE_URL;

async function runServer() {
  const transport = new StdioServerTransport();
  await createServer(databaseUrlEnv).connect(transport);
}

runServer().catch(console.error);
