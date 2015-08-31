#My personal website
>All about my education, skills and experience.

##Prerequisites
If you want to test the project you need the following requirements:

1. [Ruby][1]
  * [Sass][2]: `gem install sass`
  * [Scss-lint][3]: `gem install scss-lint`
2. [Node.js][4]
  * [Bower][5]: `npm install -g bower`
  * [Gulp.js][6]: `npm install -g gulp`

##Getting Started
After installing all the prerequisites, in order to **install all the dependencies** run the following command:
```
$ npm install && bower install
```

**Generate all the required assets** using Gulp. You can also **watch** the changes or **compile in production mode**:
```
$ gulp
$ gulp watch
$ gulp prod
```

Finally, you only have to start the Node's server and voilà!
```
$ node server.js
```

Now, you can open the following url and that's all!
```
http://localhost:8081/
```

##Licensing Options
[![License](https://img.shields.io/badge/license-MIT-408576.svg)](https://github.com/benatespina/personal/blob/master/LICENSE)

[1]: https://www.ruby-lang.org/en/downloads/
[2]: http://sass-lang.com/
[3]: https://github.com/brigade/scss-lint
[4]: https://nodejs.org/download/
[5]: http://bower.io/
[6]: http://gulpjs.com/
