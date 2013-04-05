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
var mark = Markalldown.prototype; // cache prototype

// HOLDS DATA VARIABLES
mark.model = {
  output: false,
  filename: 'README.md', // Output filename -o --output option
  files: [],  // list of markdown files
  footer: '', // if user sets footer file hold it here
  buffer: '', // hold file contents
  dir: "." // define directory to look for files
};

// RETURN FILE EXTENSION
function getExtension(filename) {
  var i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i);
}

// CHECK FOR HEADER FILE "header.md" AND INCLUDE AT THE BEGINNING OF .md FILES
function checkHeader(files) {
  var header = files.indexOf('header.md');
  if (header !== -1) {
    files.splice(header, 1); // remove from array
    files.unshift('header.md'); // include at the beginning of array
  }
}

// CHECK FOR FOOTER FILES "footer.md" AND INCLUDE AT THE END OF .md FILES
function checkFooter(files) {
  var footer = files.indexOf('footer.md');
  if (footer !== -1) {
    files.splice(footer, 1); // remove from array
    files.push('footer.md'); // include at the end of array
  }
}

// READ FILE AND CACHE CONTENT
function read(id, file) {
  return fs.readFileSync(file, 'utf-8');
}

// SAVE OUTPUT FILE
function saveOutputFile(content) {
  fs.writeFile(mark.model.filename, content, function (err) {
    if (err) {
      console.log('\nCould not save output file!\n');
    }
    console.log( '\n' + mark.model.filename + ' it\'s saved!\n');
  });
}

// BUFFER CONTENTS FROM ALL .md FILES
function buffer() {
  // console.log(mark.model.files);
  var cache = mark.model.buffer,
      files = mark.model.files,
      dir = mark.model.dir,
      size = files.length;
  // cache all files
  for ( var i =0; i < size; i++ ) {
    cache += read( i, dir + "/" + files[i]) + '\n';
  }
  cache = cache.substring(0, cache.length - 1);
  // output only if model.output is false
  if(!mark.model.output) {
    console.log('\n' + cache + '\n');
  } else {
    saveOutputFile(cache);
  }
}

// READ DIRECTORY LOOKING FOR .md FILES
mark.init = function() {
  // check if directory exists
  fs.readdir(mark.model.dir, function(err, files){
    var mdfiles = mark.model.files; // shortcut
    if (err) {
      return console.log("\nDirectory not found!\n");
    }//if
    // save all markdown files to model.files array
    for( var i in files) {
      if( getExtension(files[i]) === ".md") {      
          mark.model.files.push(files[i]);
      }//if
    }//for
    // check if found at least one file
    if (mdfiles.length) {
      // checking for header/ footer files
      checkHeader(mdfiles);
      checkFooter(mdfiles);
      // buffer file content
      buffer();
    } else {
      console.log("\nMarkdown files not found!\n"); 
    }
  });
};

// export module to be used by NodeJS
module.exports = {
  mark: mark
};