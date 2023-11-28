const expresss = require("express");
const {
  createAppointmentHandler,
  deleteAppointmentHandler,
  updateAppointmentHandler,
  addAppointmentDetailHandler,
  deleteAppointmentDetailHandler,
  getUserAppointmentHandler,
} = require("./appointment.controller");
const { appointmentAuth } = require("../shared/middlewares/appointmentAuth");
const {
  isValidAppointment,
} = require("../shared/middlewares/isValidAppointment");
const {
  appointmentValidation,
  appointmentDetailsValidation,
} = require("../shared/validation/appointment");

const router = expresss.Router();

router.get("/", getUserAppointmentHandler);
router.post(
  "/",
  appointmentValidation,
  isValidAppointment,
  createAppointmentHandler
);
router.put("/:id", appointmentAuth, updateAppointmentHandler);
router.delete("/:id", appointmentAuth, deleteAppointmentHandler);
router.post(
  "/:id/appointmentDetails",
  appointmentDetailsValidation,
  appointmentAuth,
  addAppointmentDetailHandler
);
router.delete(
  "/:id/appointmentDetails",
  appointmentAuth,
  deleteAppointmentDetailHandler
);

module.exports = router;
