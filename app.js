require("dotenv").config();
const express = require("express");
const cabinsRouter = require("./router/cabinsRouter");
const userRouter = require("./router/userRouter");
const authenticationRouter = require("./router/authenticationRouter");
const accountRouter = require("./router/accountRouter");
const settingRouter = require("./router/settingRouter");
const bookingRouter = require("./router/bookingRouter");
const selfBookingRouter = require("./router/selfBookingRouter");
const dashboardRouter = require("./router/dashboardRouter");
const errorMiddleware = require("./middleware/errorMiddleware");
const NodeError = require("./utils/nodeError");
const home = require("./View/home");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*", // allow ALL frontends to consume your API
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//Routers
app.get("/", (req, res) => {
  res.send(home());
});

app.use("/cabins", cabinsRouter);
app.use("/users", userRouter);
app.use("/auth", authenticationRouter);
app.use("/account", accountRouter);
app.use("/settings", settingRouter);
app.use("/bookings", bookingRouter);
app.use("/my-bookings", selfBookingRouter);
app.use("/dashboard", dashboardRouter);

//gloabal - router
app.all("/{*all}", (req, res, next) => {
  throw new NodeError(true, `Cannot ${req.method} ${req.originalUrl} `, 404);
});

app.use(errorMiddleware);

module.exports = app;
