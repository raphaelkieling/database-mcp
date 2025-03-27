import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export async function createMcpClient() {
  const client = new Client({
    name: "postgres-mcp-client",
    version: "1.0.0",
  });

  const transport = new StdioClientTransport({
    command: "node",
    args: ["--experimental-modules", "src/main.js"],
  });

  await client.connect(transport);

  return client;
}
