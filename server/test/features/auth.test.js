import Auth from "./auth";

describe("Auth", () => {
  it("should return an error if auth_token is missing", () => {
    const result = Auth("", "header_token");
    expect(result.error).toBe("Token is required.");
  });

  it("should return an error if header_token is missing", () => {
    const result = Auth("auth_token", "");
    expect(result.error).toBe("Token is required.");
  });

  it("should return an error if auth_token is invalid", () => {
    const result = Auth("invalid_token", "header_token");
    expect(result.error).toBe("Token is invalid.");
  });

  it("should return an error if Google OAuth verification fails", async () => {
    const result = await Auth("valid_token", "header_token");
    expect(result.error).toBe("Not Authenticated.");
  });

  it("should return null if authentication is successful", async () => {
    const result = await Auth("valid_token", "header_token");
    expect(result.error).toBeNull();
  });
});