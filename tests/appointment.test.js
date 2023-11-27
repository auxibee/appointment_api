const config = require("../server/config/general");
const statusCodes = require("../server/shared/statusCodes");

const { Appointment, AppointmentDay, User } = require("../models");
const {
  request,
  expect,
  commonHeaders,
  routes,
  appointmentDays,
} = require("./config");

const { resetDb, postRequest } = require("./utils");

const { faker } = require("@faker-js/faker");
const { generateToken } = require("../server/shared/utils/token");

describe("POST /appointment", function () {
  let user, appointmentDay, token;
  before(async () => {
    await resetDb();
    user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    appointmentDay = await AppointmentDay.create({ day: "2023-12-01" });

    token = await generateToken(user.id);
  });

  it("creates a new appointment", async function () {
    const response = await postRequest({
      url: routes.appointment,
      token: token,
      data: { userId: user.id, appointmentDayId: appointmentDay.id },
    });

    expect(response.status).to.eql(statusCodes.CREATED);
    expect(response.body.id).to.eql(1);
  });

  it("fails when appointment has already been created", async () => {
    //  insert the same userId and AppointmentDayId
    const response = await postRequest({
      url: routes.appointment,
      token: token,
      data: { userId: user.id, appointmentDayId: appointmentDay.id },
    });

    expect(response.status).to.eql(statusCodes.FORBIDDEN);
    expect(response.body.error).to.eql(
      "Delete appointment before creating another one"
    );
  });

  it("fails with non existing user or appointment day", async () => {
    const response = await postRequest({
      url: routes.appointment,
      token: token,
      data: { userId: 100, appointmentDayId: 100 },
    });

    expect(response.status).to.eql(statusCodes.FORBIDDEN);
    expect(response.body.error).to.eql("Something went wrong");
  });

  it("fails with empty userId or appontmentDayId", async () => {
    const response = await postRequest({
      url: routes.appointment,
      token: token,
      data: { userId: "2", appointmentDayId: "" },
    });

    expect(response.status).to.eql(statusCodes.FORBIDDEN);
  });
});
