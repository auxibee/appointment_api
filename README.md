# Appointment_api
A simple appointment system built in nodejs, expressjs, postgres
Goals: Build an api for an appointment system. This project uses expressjs, postgres

| Endpoint  |Query Params/Request body   | Description   | Access   |
|---|---|---|---|
|POST /auth/login   | email, password   | Sign in a User   | User   |
|POST /auth/register   | email, password   | Register a User   | User   |
|GET /users   | offset? limit? status? month?   | Get all users, paginated, filtered by status & month   | Admin   |
|GET /users/id   |   | Get appointment detail of a single user   | Admin or User  |
|POST /appointmentdays  | month, year   | Create appointment days   | Admin   |
|PUT /appointmentday/id  | slots   | Update slots avialable on an appointment day   | Admin   |
|POST /appointment   | appointmentDayId   | Create an appointment  | User   |
|GET /appointment/id   | appointmentId   | View appointment Details   | User   |
|POST /appointmentdetail/id   | first Name, Last Name  | Add appointment details   | User   |
|PUT /appointment/id   | appointmentDayId   | Reschedule appointment day  | User   |
|PUT /appointmentdetail/id   | first Name, Last Name   | Update Appointment details   | User   |
