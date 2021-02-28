import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import cors from "cors";
import bodyParser from "body-parser";
import attackRouter from "./router/Attack";
import townRouter from "./router/Town";
import axios from "axios";
import userRouter from "./router/User";
import * as admin from "firebase-admin";
var serviceAccount = require("./grepolis-alarm-firebase-adminsdk-5h0nt-9c77c3c986.json");

const app = express();
const port = 8888;

app.use(cors());
app.use(bodyParser.json());

createConnection()
  .then(async () => {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    app.use("/attack", attackRouter);
    app.use("/town", townRouter);
    app.use("/user", userRouter);
    app.get("/", (request, response) => response.json("Hello world!"));
    app.listen(port, () =>
      console.log(`[server]: Server is running on port ${port}.`)
    );

    console.log(`[database]: Database is connected.`);
  })
  .catch((error) => console.log(error));
