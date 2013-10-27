module.exports = (app) ->
    app.get "/", (req, res) ->
        res.render "index.jade"

    app.get "/:locale", (req, res) ->
        res.cookie 'locale', req.params.locale
        res.redirect "/"