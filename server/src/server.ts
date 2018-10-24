import errorHandler from "errorhandler";

import app from "./app";
import express from "express";

/**
 * Error Handler. Provides full stack - remove for production
 */

/**
 * Start Express server.
 */

class Server {
  public app: express.Application;
  constructor() {
    this.app = app;
    this.config();
  }
  public run() {
    this.app.listen(app.get("port"), () => {
      console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
      );
      console.log("  Press CTRL-C to stop\n");
    });
  }

  private config() {
    // remove for production
    this.app.use(errorHandler());
  }
}

new Server().run();