#!/usr/bin/env node

'use strict';

var
    babel = require('gulp-babel'),
    beautify = require('gulp-beautify'),
    debug = require('gulp-debug'),
    minify = require('gulp-minify'),
    named = require('vinyl-named'),
    plumber = require('gulp-plumber'),
    program = require('commander'),
    util = require('gulp-util'),
    path = require('path'),
    webpack = require('webpack-stream'),
    { src, dest, series, parallel } = require("gulp");



/* ####################### OPTIONS ######################## */
var options = {};


/* ######################## VERSION ######################## */
program

    .version(
        'commander-gulp-scripts version: ' + require('../package.json').version + '\n'
    )

/* ######################## COMMANDER SCRIPTS ######################## */
/*  node ./bin/scripts.js scripts 'test/*.js' --scr 'build/scripts'*/


program
    .command('scripts <input>')
    .option("--scr [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var ouput = options.ouput || options.scr;

        input = input.filter(function (index, value) {
            if(path.extname(index) == ".js" && index !== "/home/jugaz/Developer/.Github/commander-gulp-scripts/bin/scripts.js"){
                return index;
            }
        });
        if(input.length === 0 || input === "undefine") {
            return util.log("ERROR: No existe el archivo con el siguiente formato: '.js'")
        }
        
        else {
            return src(input, { allowEmpty: true })
                .pipe(debug({
                    title: 'commader-gulp-scripts:'
                }))
                .pipe(named())
                .pipe(plumber())
                .pipe(webpack({
                    watch: false
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
                .pipe(beautify({ indent_size: 2 }))
                .pipe(dest(ouput))
                .on('end', function () {
                    util.log('Done!');
                });
        }
        
       

    })

program
    .command('prod:scripts <input>')
    .option("--scr [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var ouput = options.ouput || options.scr;
   
        input = input.filter(function (index, value) {
            if(path.extname(index) == ".js" && index !== "/home/jugaz/Developer/.Github/commander-gulp-scripts/bin/scripts.js"){
                return index;
            }
        });

        if(input.length === 0 || input === "undefine") {
            return util.log("ERROR: No existe el archivo con el siguiente formato: '.js'")
        }

        else {
            return src(input, { allowEmpty: true })
                .pipe(debug({
                    title: 'commader-gulp-scripts production:'
                }))
                .pipe(named())
                .pipe(plumber())
                .pipe(webpack({
                    watch: false
                }))
                .pipe(babel({
                    presets: [['@babel/preset-env']]
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
                .pipe(minify({
                    ext:{
                        min:'.js'
                    },
                    noSource: true
                }))
                .pipe(dest(ouput))
                .on('end', function () {
                    util.log('Done!');
                });
        }
       
    })

program.parse(process.argv);