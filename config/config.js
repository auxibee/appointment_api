module.exports = {
  development : {
    dialect : "sqlite",
    storage: "appointment.db"
  },

  test: {
    dialect: "sqlite",
    storage: ":memory"
  },
  production: {
    dialect: "sqlite",
    storage: ":memory"
  }
}