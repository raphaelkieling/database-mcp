# Database MCP

Simple database MCP implementation.

- Install `Node`
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

#### Example of chat:

<img src="./example.png" height="600px">