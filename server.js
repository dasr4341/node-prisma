import express from "express";
import config from "./config/config.js";
import router from "./routes/index.js";
import { responseLib } from "./lib/response.lib.js";
import { StatusCodes } from "http-status-codes";

const app = express();

// middleware -------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// routes -------------------
app.use(router);
app.get("/", (req, res) => {
  res.send("Hello welcome to out app !!");
});

// page not found
app.use((req, res) => {
    responseLib.error(res, StatusCodes.NOT_FOUND, null, null)
})
/* error handling  */
app.use((error, req, res, next) => {
  responseLib.error(res, error?.code, error?.message, error, error?.data);
});




app.listen(config.port, () =>
  console.log(`Server is listening to port http://localhost:${config.port}`)
);
