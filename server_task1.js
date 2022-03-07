var path = require("path");
var fs = require("fs");
var http = require("http");
// const app = express();
var hostname = "localhost";
var port = 5000;
var server = http.createServer((req, res) => {
  // console.log(`Reguest for ${req.url} by method ${req.method}`);
  console.log("request was made");

  var fileUrl = req.url;
  if (fileUrl.includes("/")) {
    if (fileUrl === "/") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end("<html><body><h1>Home Page.</h1></body></html>");
      return;
    } else if (fileUrl === "/about") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end("<html><body><h1>About Page.</h1></body></html>");
      return;
    } else if (fileUrl === "/contact") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end("<html><body><h1>Contact Page.</h1></body></html>");
      return;
    } else {
      fs.access(fileUrl, function (err) {
        if (err) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end("<html><body><h1>Invalid Request!</h1></body></html>");
          return;
        }
      });
    }
  }
});

server.listen(port, () => {
  console.log(`The NodeJS server on port ${port} is now running....`);
});
