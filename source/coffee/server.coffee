express = require "express"
http    = require "http"
i18n    = require "i18n"
app     = do express
routes  = require "./js/routes.js"

i18n.configure
    locales       : ["eu", "es", "en"]
    cookie        : "locale"
    defaultLocale : "eu"
    directory     : __dirname + "/locales"

app.configure ->
    app.set "port", process.env.PORT || 8080
    app.set "views", __dirname + "/templates"
    app.set "view engine", "jade"
    app.use express.static(__dirname + "/")
    app.use express.static(__dirname + "/resources/images/")
    app.use express.static(__dirname + "/resources/")
    app.use express.cookieParser()
    app.use i18n.init
    routes app

http.createServer(app).listen app.get("port"), ->
    console.log "Express server listening on port " + app.get "port"