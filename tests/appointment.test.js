const config = require("../server/config/general");
const statusCodes = require("../server/shared/statusCodes");

const {
  Appointment,
  AppointmentDay,
  User,
  AppointmentDetail,
} = require("../models");
const {
  request,
  expect,
  commonHeaders,
  routes,
  appointmentDays,
} = require("./config");

const { resetDb, postRequest, getRequest, deleteRequest } = require("./utils");

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
    const appointment = await postRequest({
      url: routes.appointment,
      token: token,
      data: { appointmentDayId: appointmentDay.id },
    });

    expect(appointment.status).to.eql(statusCodes.CREATED);
    expect(appointment.body.id).to.eql(1);
  });

  it("fails when appointment has already been created", async () => {
    //  insert the same userId and AppointmentDayId
    const response = await postRequest({
      url: routes.appointment,
      token: token,
      data: { appointmentDayId: appointmentDay.id },
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
      data: { appointmentDayId: 100 },
    });

    expect(response.status).to.eql(statusCodes.FORBIDDEN);
    expect(response.body.error).to.eql("Something went wrong");
  });

  it("fails with empty userId or appontmentDayId", async () => {
    const response = await postRequest({
      url: routes.appointment,
      token: token,
      data: { appointmentDayId: "" },
    });

    expect(response.status).to.eql(statusCodes.FORBIDDEN);
  });

  it("add appointment details ", async () => {
    const details = {
      firstName: faker.internet.userName(),
      lastName: faker.internet.userName(),
    };

    // create appointment
    const appointment = await Appointment.create({
      userId: user.id,
      appointmentDayId: appointmentDay.id,
    });
    const appointmentDetails = await postRequest({
      url: routes.appointment + `/${1}` + "/appointmentDetails",
      token: token,
      data: { firstName: details.firstName, lastName: details.lastName },
    });

    expect(appointmentDetails.status).to.eql(statusCodes.CREATED);
    expect(appointmentDetails.body.firstName).to.eql(details.firstName);
  });

  it("fails with a non existing appointment", async () => {
    const details = {
      firstName: faker.internet.userName(),
      lastName: faker.internet.userName(),
    };

    const appointmentDetails = await postRequest({
      url: routes.appointment + `/${7999}` + "/appointmentDetails",
      token: token,
      data: { firstName: details.firstName, lastName: details.lastName },
    });
    expect(appointmentDetails.status).to.eql(statusCodes.UNAUTHOURIZED);
    expect(appointmentDetails.body.error).to.eql(
      "Appointment not found for user"
    );
  });

  it("fails with an empty first name or last name", async () => {
    const details = {
      firstName: faker.internet.userName(),
      lastName: faker.internet.userName(),
    };

    const appointmentDetailsWithoutFirstName = await postRequest({
      url: routes.appointment + `/${1}` + "/appointmentDetails",
      token: token,
      data: { firstName: "", lastName: details.lastName },
    });
    expect(appointmentDetailsWithoutFirstName.status).to.eql(
      statusCodes.FORBIDDEN
    );

    const appointmentDetailsWithoutLastName = await await postRequest({
      url: routes.appointment + `/${1}` + "/appointmentDetails",
      token: token,
      data: { firstName: details.firstName, lastName: "" },
    });

    expect(appointmentDetailsWithoutFirstName.status).to.eql(
      statusCodes.FORBIDDEN
    );
    expect(appointmentDetailsWithoutLastName.status).to.eql(
      statusCodes.FORBIDDEN
    );
  });

  it("Deletes an appointment detail", async () => {
    const details = {
      firstName: faker.internet.userName(),
      lastName: faker.internet.userName(),
    };

    // create appointment
    const appointment = await Appointment.create({
      userId: user.id,
      appointmentDayId: appointmentDay.id,
    });

    // create appointment detail
    const detail = await AppointmentDetail.create({
      appointmentId: appointment.id,
      firstName: details.firstName,
      lastName: details.lastName,
    });

    const deleteDetails = await deleteRequest({
      url: routes.appointment + `/${detail.id}` + "/appointmentDetails",
      token: token,
    });

    expect(deleteDetails.status).to.eql(204);
  });
});
