/* eslint-disable no-undef */

const statusCodes = require("../server/shared/statusCodes");
const { request, expect, commonHeaders, routes } = require("./config");
const { createUser, loginUser, resetDb } = require("./utils");
const { faker } = require("@faker-js/faker");

describe("POST /auth/signup", function () {
  before(resetDb);
  it("creates a new user", async function () {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const response = await request
      .post(routes.signUp)
      .set(commonHeaders)
      .send({ email: user.email, password: user.password });

    expect(response.status).to.eql(201);
    expect(response.body).to.deep.equal({
      id: response.body.id,
      email: user.email,
    });
  });

  it("fails with invalid email", async function () {
    const response = await request
      .post(routes.signUp)
      .set(commonHeaders)
      .send({
        email: faker.internet.userName(),
        password: faker.internet.password(),
      });

    expect(response.status).to.eql(statusCodes.FORBIDDEN);

    expect(response.body.error.length).to.eql(1);
    expect(response.body.error[0].msg).to.eql("Email should be valid");
  });

  it("fails without a password or password with less than 5 characters", async function () {
    const response = await request
      .post(routes.signUp)
      .set(commonHeaders)
      .send({ email: faker.internet.email(), password: "" });

    expect(response.status).to.eql(statusCodes.FORBIDDEN);
    expect(response.body.error.length).to.eql(2);
    expect(response.body.error[0].msg).to.eql("Password cannot be empty");
    expect(response.body.error[1].msg).to.eql(
      "Password Lenght must be atleat 5 characters"
    );
  });
});

describe("POST auth/login", function () {
  it("Authenticates a user with a valid credential", async function () {
    // create a new user
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const newUser = await request
      .post(routes.signUp)
      .set(commonHeaders)
      .send(user);

    const response = await request.post(routes.login).send(user);
    const keys = Object.keys(response.body);
    expect(response.status).to.eql(200);
    expect(response.body.email).to.eql(user.email);
    expect(keys).to.include.members(["id", "token", "email"]);
  });

  it("Fails with an invalid credential", async function () {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    // create a new user
    const newUser = await request
      .post(routes.signUp)
      .set(commonHeaders)
      .send(user);

    const wrongEmail = await request
      .post(routes.login)
      .set(commonHeaders)
      .send({ email: faker.internet.email(), password: user.password });

    const wrongPassword = await request
      .post(routes.login)
      .set(commonHeaders)
      .send({ email: user.email, password: faker.internet.password() });

    expect(wrongEmail.status).to.eql(statusCodes.FORBIDDEN);
    expect(wrongEmail.body.error).to.eql("Wrong username or password");

    expect(wrongPassword.status).to.eql(statusCodes.FORBIDDEN);
    expect(wrongPassword.body.error).to.eql("Wrong username or password");
  });
});
