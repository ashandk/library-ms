// Dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js,', 'models/**/*.js,', 'controllers/**/*.js,'];

// Restart server
gulp.task('default', function(){
    var options = {
        script: 'app.js',
        ext:'js',
        env: {
            PORT: '8080'
        },
        watch: jsFiles,
        ignore: [
            './node_modules/**'
            ]
    };
    return nodemon(options) 
    .on('restart', function(){
        console.log("Server restarted");
    });
});

