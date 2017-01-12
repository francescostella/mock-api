var fs = require("fs")
var path = require("path");
var _ = require("lodash");

var DURATION_LATENCY = 3000;
var LIST_FAKE_TITLES = [
  "9/11: Before and After",
  "A Deeper Dive Into Causes of Terrorism",
  "Threat of Terrorist Activity"
];

var hasLatency = true;

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

      var titleRandom = _.sample(LIST_FAKE_TITLES);
      finalData = finalData.replace('{{TITLE}}', titleRandom);

      if (hasLatency) {
        setTimeout(function() {
          res.send(finalData);
        }, DURATION_LATENCY);
        return;
      }

      res.send(finalData);
    });
  });
};

module.exports = appRouter;
