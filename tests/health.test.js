const { expect } = require("./config");
const { axiosApiClient } = require("./utils");

describe("Api", () => {
  describe("GET /health", () => {
    it("When service is up it should return message : ok and status 200", async () => {
      // Act
      const response = await axiosApiClient.get("/health");

      // Assert
      expect(response.status).to.eql(200);
    });
  });
});
