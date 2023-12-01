const { faker } = require("@faker-js/faker");
const { axiosApiClient } = require("./utils");

const chai = require("chai");
const chaiSubsect = require("chai-subset");
const { routes } = require("./config");

chai.use(chaiSubsect);
const expect = chai.expect;

describe("API", () => {
  describe("POST /auth/signup", () => {
    it("Creates a new user succesfully", async () => {
      // Arrange
      const userData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      // Act
      const response = await axiosApiClient.post(routes.signUp, userData);

      // Assert
      expect(response).to.containSubset({
        status: 201,
        data: {
          email: userData.email,
          id: response.data.id,
        },
      });
    });

    it("When an invalid email|empty email|empty|password is provided, return 403 response", async () => {
      // Arrange
      const invalidUserData = {
        email: faker.internet.userName(),
        password: faker.internet.password(),
      };

      const emptyEmailUserData = {
        email: "",
        password: faker.internet.password(),
      };

      const emptyPasswordUserData = {
        email: faker.internet.email(),
        password: "",
      };

      // Act
      const invalidEmailResponse = await axiosApiClient.post(
        routes.signUp,
        invalidUserData
      );
      const emptyEmailBodyResponse = await axiosApiClient.post(
        routes.signUp,
        emptyEmailUserData
      );
      const emptyPasswordBodyResponse = await axiosApiClient.post(
        routes.signUp,
        emptyPasswordUserData
      );

      // Assert
      expect(invalidEmailResponse).to.containSubset({
        status: 403,
      });
      expect(emptyEmailBodyResponse).to.containSubset({
        status: 403,
      });

      expect(emptyPasswordBodyResponse).to.containSubset({
        status: 403,
      });
    });
  });

  describe("POST /auth/login", () => {
    it("Given a valid email and password, return status 200 and valid token", async () => {
      // Arrange
      const userData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      // Act
      // register user
      const addedUser = await axiosApiClient.post(routes.signUp, userData);

      const loginResponse = await axiosApiClient.post(routes.login, userData);

      // Assert
      expect(loginResponse).to.containSubset({
        status: 200,
        data: {
          id: loginResponse.data.id,
          token: loginResponse.data.token,
          email: loginResponse.data.email,
        },
      });
    });
  });
});
