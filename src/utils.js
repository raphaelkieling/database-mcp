export function getUrlOptions(databaseUrl) {
  const url = new URL(databaseUrl);
  return {
    protocol: url.protocol.replace(":", ""),
    options: Object.fromEntries(
      Array.from(url.searchParams.entries()).map(([key, value]) => [
        key,
        value === "true" ? true : value === "false" ? false : value,
      ])
    ),
  };
}
