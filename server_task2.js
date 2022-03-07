var http = require("http");
var path = require("path");
var fs = require("fs");

var hostname = "localhost";
var port = "5000"; //can be 4000 port number to use the server

var server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} by method ${req.method}`);

  if (req.method === "GET") {
    var fileUrl = req.url;
    if (fileUrl === "/") {
      fileUrl = "/home.html";
    }

    var filePath = path.resolve("./public" + fileUrl);
    var fileExt = path.extname(filePath);

    if (fileExt === ".html") {
      //if there is an error
      fs.access(filePath, function (err) {
        if (err) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            `<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`
          );
          return;
        }
        res.statusCode = 200; // otherwise do this
        res.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<html><body><h1>Error 404: ${fileUrl} is not a html file</h1></body></html>`
      );
    }
  } else {
    res.statusCode = 404; //200 means sucess, 300 warning, 400 error
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`
    );
  }
});

// telling the http model to tell the server to request and respond

server.listen(port, () => {
  console.log(`The NodeJS server on port ${port} is now running....`);
});
