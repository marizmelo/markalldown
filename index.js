#!/usr/bin/env node

/*
  Markalldown
  author: Mariz Melo (c) MIT 2013
  github: marizmelo/markalldown
  desc:   Combine multiple markdown files
*/

// DEPENDENCIES
var program = require('commander') // command line options
  , fs = require('fs')  // node fileSystem lib
  , markalldown = require('./lib/markalldown') // markalldown lib


// commander options
program
  .version('0.0.1')
  .option('-o, --output', 'Create README.md on current directory')
  .usage('[directory]')
  .parse(process.argv);

// check if directory was specified
if (program.args.length) {}//if


// check if user specified directory
if (program.args[0]) {
  markalldown.mark.model.dir = program.args[0];
}

// check if should create output file
if (program.output) {
  markalldown.mark.model.output = true;
}

// execute program
markalldown.mark.init();