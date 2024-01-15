const express = require("express");
const next = require("next");
const path = require("path");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./certificates/localhost-key.pem"),
  cert: fs.readFileSync("./certificates/localhost.pem"),
};

app.prepare().then(() => {
  const server = express();

  server.use("/_next", express.static(path.join(__dirname, ".next")));

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const httpsServer = require("https").createServer(httpsOptions, server);

  const PORT = process.env.PORT || 3001;
  httpsServer.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${PORT}/`);
  });
});


// const fs = require('fs');
// const path = require('path');
 
// const certPaths = [
//   process.env.SSL_CERT_PATH_1 || path.join(__dirname, 'path', 'to', 'default', 'certificate1.crt'),
//   process.env.SSL_CERT_PATH_2 || path.join(__dirname, 'path', 'to', 'default', 'certificate2.crt'),
// ];
 
// const keyPaths = [
//   process.env.SSL_KEY_PATH_1 || path.join(__dirname, 'path', 'to', 'default', 'private1.key'),
//   process.env.SSL_KEY_PATH_2 || path.join(__dirname, 'path', 'to', 'default', 'private2.key'),
// ];
 

// const sslOptions = certPaths.map((certPath, index) => {
//   return {
//     cert: fs.readFileSync(certPath),
//     key: fs.readFileSync(keyPaths[index]),
//   };
// });
 
// Use sslOptions when configuring your server