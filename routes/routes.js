var fs = require("fs")
var path = require("path");

var appRouter = function(app) {
  app.get("/", function(req, res) {
    res.send('Mock API');
  });

  app.get("/transporter/:nid", function(req, res) {
    var nidRequested = req.params.nid || 0;
    var pathFile = path.resolve(__dirname, '../mock-data/mock-transported-content.html');

    fs.readFile(pathFile, function(error, data) {
      var stringData = data.toString();
      var finalData = stringData.replace('{{NID}}', nidRequested);

      res.send(finalData);
    });
  });
};

module.exports = appRouter;
