const { expect } = require("./config");
const { setUp, tearDown, axiosApiClient } = require("./utils");

describe("Api", () => {
  describe("GET /not-found-route", () => {
    it("When a non-existing route is visited it should return status 404", async () => {
      // Act
      const response = await axiosApiClient.get("/not-found-route");

      // Assert
      expect(response.status).to.eql(404);
    });
  });
});
