import { describe, expect, it } from "vitest";
import { getUrlOptions } from "../src/utils.js";

describe("getUrlOptions", () => {
  it("should return the correct options", () => {
    const url =
      "postgres://xx:xx@localhost/xx?encrypt=true&trustServerCertificate=true&connectionTimeout=30";

    const options = getUrlOptions(url);
    expect(options).toEqual({
      protocol: "postgres",
      options: {
        encrypt: true,
        trustServerCertificate: true,
        connectionTimeout: "30",
      },
    });
  });

  it("should return empty options if there are no options", () => {
    const url = "postgres://xx:xx@localhost/xx";

    const options = getUrlOptions(url);
    expect(options).toEqual({
      protocol: "postgres",
      options: {},
    });
  });
});
