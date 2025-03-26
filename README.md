## Database MCP

Simple study around the Cursor MCP support.

- Install `Bun`
- Install `Cursor`
- Paste the following json at the `MCP` specification in the `Cursor` settings

```json
{
  "mcpServers": {
    "postgres": {
      "command": "node",
      "args": ["--experimental-modules","/path/to/this/repository/src/main.js"],
      "env": {
        "DATABASE_URL": "postgres://xx:xx@localhost/xx"
      }
    }
  }
}
```
