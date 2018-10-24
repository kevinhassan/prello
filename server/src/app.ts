import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import { MONGODB_URI } from "./util/secrets";
import Router from "./routes";


class App {

  public app: express.Application;
  public router: Router;

  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this.mongoConnection();
    this.router = new Router(this.app);
  }
  private config() {
    // Load environment variables from .env file, where API keys and passwords are configured
    dotenv.config({ path: "./env" });
    // Express configuration
    this.app.set("port", process.env.PORT || 9090);
  }
  private middlewares() {
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(expressValidator());
  }
  private mongoConnection() {
    const mongoUrl = MONGODB_URI;
    // Connect to MongoDB
    (<any>mongoose).Promise = bluebird;
    mongoose.connect(mongoUrl, {useMongoClient: true}).then(
      () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
      console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
      // process.exit();
    });
  }
}
export default new App().app;
