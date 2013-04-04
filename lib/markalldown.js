  /*
  Markalldown
  author: Mariz Melo (c) MIT 2013
  github: marizmelo/markalldown
  desc:   Combine multiple markdown files
*/
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
}

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
function read(id, file, callback) {
  var content;
  fs.readFile(file, 'utf-8', function (err, data) {
    content = data;
    callback(content);
  });
}

// BUFFER CONTENTS FROM ALL .md FILES
function buffer() {
  // console.log(mark.model.files);
  var files = mark.model.files,
      dir = mark.model.dir;
  // cache all files
  for (i in files) {
    read( i, dir + "/" + files[i], function(content) {
      console.log(content);
      // append to output file if set to true
      if (mark.model.output) {
        fs.appendFile(mark.model.filename, content, function(err) {
          if (err) {
            return console.log("Could not append to file " + mark.model.filename);
          }
        });
      }
    });
  }
}

// READ DIRECTORY LOOKING FOR .md FILES
mark.init = function() {
  fs.readdir(mark.model.dir, function(err, files){
    var mdfiles = mark.model.files; // shortcut
    if (err) {
      return console.log("Directory not found!");
    }//if
    for( i in files) {
      if( getExtension(files[i]) === ".md") {      
          mark.model.files.push(files[i]);
      }//if
    }//for
    // checking for header/ footer files
    checkHeader(mdfiles);
    checkFooter(mdfiles);
    // buffer file content
    buffer();
  });
};

// export module to be used by NodeJS
module.exports = {
  mark: mark
};