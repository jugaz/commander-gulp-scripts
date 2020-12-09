#!/usr/bin/env node

'use strict';

var
    babel = require('gulp-babel'),
    debug = require('gulp-debug'),
    entorno,
    minifyJS = require('gulp-minify'),
    program = require('commander'),
    uglify = require('gulp-uglify-es').default,
    util = require('gulp-util'),
    { src, dest, series, parallel } = require("gulp");



/* ####################### OPTIONS ######################## */
var options = {};


/* ######################## VERSION ######################## */
program

    .version(
        'commander-gulp-images version: ' + require('../package.json').version + '\n'
    )

/* ######################## COMMANDER IMAGES ######################## */
/*  node ./bin/images.js images 'test/scripts/*.js' 'test/scripts/*.jpg' --im 'build/scripts'*/
program
    .command('scripts <input>')
    .option("--scr [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var ouput = options.ouput || options.scr;
    
        input = input.filter(function (index, value) {
            if(index.slice((index.lastIndexOf(".") - 1 >>> 0) + 2) == "js" && index !== "/home/jugaz/Escritorio/Developer/.Github/commander-gulp-scripts/bin/scripts.js"){
                return index;
            }

        });
 
        return src(input, { allowEmpty: true })
        
            .pipe(debug({
                title: 'commader-gulp-scripts:'
            }))
            
            
            .on('error', function (error) {
                // tenemos un error 
                util.log("Error Name:", error.name);
                util.log("Error Code:", error.code);
                util.log("Error Filename:", error.filename);
                util.log("Error Line:", error.line);
                util.log("Error Column:", error.column);
                util.log("Error Msg", error.Msg);


            })
            .pipe( entorno ? uglify({compress:{drop_console: true}}) : util.noop() )
            
            .pipe(dest(ouput))
            .on('end', function () {
                util.log('Done!');
            });

    })

program.parse(process.argv);