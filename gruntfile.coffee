module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON "package.json"

        meta:
            file: "benatespina.com"
            banner:
                '/* <%= pkg.name %> v<%= pkg.version %> - '                  +
                '<%= grunt.template.today("yyyy/m/d") %>\n'                  +
                '<%= pkg.homepage %> - <%= pkg.author%>\n'                   +
                '<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
                '- Licensed <%= _.pluck(pkg.license, "type").join(", ") %> */\n'


        copy:
            app:
                files: [{
                    expand: true
                    cwd   : "source/jade/"
                    src   : "**"
                    dest  : "app/templates/"},
                    {src  : ["resources/**", "locales/**"], dest  : "app/"}]

        clean: ["app/resources", "app/locales", "app/templates"]

        compass:
            compile:
                options:
                    sassDir: "source/scss"
                    cssDir : "app/dev/css"

        cssmin:
            minify:
                files: [
                    expand: true
                    cwd   : "app/dev/css/"
                    src   : "*.css"
                    dest  : "app/"
                    ext   : ".min.css"]
                options: banner: "<%= meta.banner %>"

        coffee:
            compile:
                files: [
                    "app/dev/js/server.js": "source/coffee/server.coffee"
                    "app/dev/js/routes.js": "source/coffee/routes.coffee"]

        uglify:
            options: mangle: false, compress: true, banner: "<%= meta.banner %>"
            coffee :
                files: [
                    "app/server.js": "app/dev/js/server.js"
                    "app/js/routes.js": "app/dev/js/routes.js"]

        watch:
            stylesheets: files: "source/scss/**"  , tasks: "stylesheets"
            scripts    : files: "source/coffee/**", tasks: "scripts"
            copy       :
                files: ["source/jade/**", "resources/**", "locales/**"]
                tasks: "copy"


    grunt.loadNpmTasks "grunt-contrib-clean"
    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-compass"
    grunt.loadNpmTasks "grunt-contrib-copy"
    grunt.loadNpmTasks "grunt-contrib-cssmin"
    grunt.loadNpmTasks "grunt-contrib-uglify"
    grunt.loadNpmTasks "grunt-contrib-watch"

    grunt.registerTask "stylesheets", "Compiles the stylesheets."  , [
        "compass", "cssmin"]

    grunt.registerTask "scripts", "Compiles the JavaScript files." , [
        "coffee", "uglify"]

    grunt.registerTask "default", "Main Grunt. Executes all tasks.", [
        "clean", "copy", "stylesheets", "scripts", "watch"]