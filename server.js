// a bug in ghost 10.0.1 requires that we run this before calling ghost as an npm module:
require("ghost/core/server/overrides");

var express = require('express'),
	path = require("path"),
    app = express(),
	ghost = require("ghost");

app.get("/", function(req, res, next){
    console.log(req.headers);
	if(req.subdomains){
		switch(req.subdomains[0]){
			case "mail":
			case "email":
				res.redirect(301, "https://mail.google.com/a/breadboard.ai");
				return;
			case "calendar":
				res.redirect(301, "https://www.google.com/calendar/hosted/breadboard.ai");
				return;
			case "drive":
				res.redirect(301, "https://drive.google.com/a/breadboard.ai");
				return;
			case "sites":
				res.redirect(301, "https://sites.google.com/a/breadboard.ai");
				return;
		}
	}
	next();
});

console.log("init ghost");

ghost({
	"config": path.join(__dirname, "config.js")
}).then(function (ghostServer) {
    app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);

    app.use(express.static("client"));

    ghostServer.start(app);
});