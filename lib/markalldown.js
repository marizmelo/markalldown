  /*
  Markalldown
  author: Mariz Melo (c) MIT 2013
  github: marizmelo/markalldown
  desc:   Combine multiple markdown files
*/

"use strict";

var fs = require('fs');

// MARKALLDOWN
var Markalldown = function() {}; // constructor
var mdall = Markalldown.prototype; // cache prototype

// HOLDS DATA VARIABLES
mdall.model = {
  output: false, // if should generate output file
  filename: 'README.md', // Output filename -o --output option
  files: [],  // list of markdown files
  footer: '', // if user sets footer file hold it here
  buffer: '', // hold file contents
  dir: "." // define directory to look for files
};

// RETURN FILE EXTENSION
var getExtension = function(filename) {
  var i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i);
};

// CHECK FOR HEADER FILE "header.md" AND INCLUDE AT THE BEGINNING OF .md FILES
var checkHeader = function(files) {
  var header = files.indexOf('header.md');
  if (header !== -1) {
    files.splice(header, 1); // remove from array
    files.unshift('header.md'); // include at the beginning of array
  }
};

// CHECK FOR FOOTER FILES "footer.md" AND INCLUDE AT THE END OF .md FILES
var checkFooter = function(files) {
  var footer = files.indexOf('footer.md');
  if (footer !== -1) {
    files.splice(footer, 1); // remove from array
    files.push('footer.md'); // include at the end of array
  }
};

// READ AND RETURN FILE CONTENT
var read = function(file) {
  return fs.readFileSync(file, 'utf-8');
};

// SAVE OUTPUT FILE
var saveOutputFile = function(content) {
  var filename = mdall.model.filename;
  // create output file
  fs.writeFile(filename, content, function (err) {
    if (err) console.log('\nCould not save output file!\n');
    console.log( '\n' + filename + ' it\'s saved!\n');
  });
};

// BUFFER CONTENTS FROM ALL .md FILES
var buffer = function() {
  var cache = mdall.model.buffer,
      files = mdall.model.files,
      dir = mdall.model.dir,
      size = files.length;
  // cache all files
  for ( var i =0; i < size; i++ ) {
    cache += read(dir + "/" + files[i]) + '\n';
  }
  cache = cache.substring(0, cache.length - 1);
  // output only if system output variable is false
  if(!mdall.model.output) {
    console.log('\n' + cache + '\n');
  } else {
    saveOutputFile(cache);
  }
}

// READ DIRECTORY LOOKING FOR .md FILES
mdall.init = function() {
  // check if directory exists

  fs.readdir(mdall.model.dir, function(err, files){
    var mdfiles = mdall.model.files; // shortcut
    if (err) return console.log("\nDirectory not found!\n");
    // save all markdown files to model.files array
    for( var i in files) {
      if( getExtension(files[i]) === ".md") {      
          mdall.model.files.push(files[i]);
      }
    }
    // check if found at least one file
    if (mdfiles.length) {
      // checking for header/ footer files
      checkHeader(mdfiles);
      checkFooter(mdfiles);
      // put files content on buffer
      buffer();
    } else {
      console.log("\nMarkdown files not found!\n"); 
    }
  });
};

// export module to be used by NodeJS
module.exports = {
  markalldown: mdall
};