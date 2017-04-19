// # Ghost Configuration

var path = require('path'),
	parseDbUrl = require("parse-database-url"),
	dbUrl = process.env["DATABASE_URL"] || "postgres://qfdgfpmqvpnrye:JVMC0iAa8zSiP_Ub70iT35LiEn@ec2-50-19-219-148.compute-1.amazonaws.com:5432/db27tcstm9p9i3",
	dbConfig = parseDbUrl(dbUrl),
    config;

dbConfig.ssl = true;

var blogUrl = process.env.BLOG_URL || "breadboardai-davidmurdoch.c9users.io/blog";

var configOptions = {
    // The url to use when providing links to the site, E.g. in RSS and email.
    "url": "http://" + blogUrl,
	"mail": {
		"from": "\"Breadboard\" <admin@breadboard.ai>",
		"transport": "SMTP",
		"options": {
			"service": "Mailgun",
			"auth": {
				"user": process.env.MAILGUN_SMTP_LOGIN,
				"pass": process.env.MAILGUN_SMTP_PASSWORD
			}
		}
	},
	// forcing admin SSL breaks on Cloudflare because ghost doesn't know to
	// check the way cloudflare proxies HTTPS (infact, it isn't actually HTTPs
	// unless we end up implementing real FULL HTTPS on cloudflare)
	"forceAdminSSL": false,
	"fileStorage": false,
    "database": {
        "client": 'postgres',
        "connection": dbConfig,
        "debug": false
    },

    // #### Server
    // Can be host & port (default), or socket
    "server": {
        // Host to be passed to node's `net.Server#listen()`
        "host": process.env.IP || "0.0.0.0",
        // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
        "port": process.env.PORT
    },

    // #### Paths
    // Specify where your content directory lives
    "paths": {
        "contentPath": path.join(__dirname, '/content/')
    }
};

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    "production": configOptions,
	"development": configOptions
};

module.exports = config;