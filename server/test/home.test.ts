import app from "../src/app";
var request = require('supertest')(app);

describe("GET /", () => {
    it("should return 'Hello world by Prello!'", (done) => {
        request
            .get("/")
            .expect("Hello world by Prello!", done)
    });
});
