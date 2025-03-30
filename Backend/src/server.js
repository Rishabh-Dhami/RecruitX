const http = require("http");
const { app } = require("./app.js");
const { connectDB } = require("./database/db.js");

const server = http.createServer(app);

connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log("server is running");
  });
});

module.exports = { server };
