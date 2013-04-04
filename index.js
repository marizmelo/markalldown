#!/usr/bin/env node

/*
  Markalldown
  author: Mariz Melo (c) MIT 2013
  github: marizmelo/markalldown
  desc:   Combine multiple markdown files (or any other files)
*/

// DEPENDENCIES
var program = require('commander') // command line options
  , fs = require('fs')  // node fileSystem lib
  , markalldown = require('./lib/markalldown') // markalldown lib

