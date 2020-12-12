var
    debug = require('gulp-debug'),
    program = require('commander'),
    entorno,
    util = require('gulp-util');
const { src, dest, series, parallel } = require("gulp");


gulp.task('set-prod-env', function () {
    entorno  = process.env.NODE_ENV = 'prod';
});

async function prodEnv() {
    return entorno= process.env.NODE_ENV = 'prod';
}
async function taskProd() {
    "scripts"
}

exports.taskProd = taskProd;
