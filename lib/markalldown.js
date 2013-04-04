/*
  Markalldown
  author: Mariz Melo (c) MIT 2013
  github: marizmelo/markalldown
  desc:   Combine multiple markdown files
*/
var fs = require('fs');

//Markalldown
var Markalldown = function() {}; // constructor
var mark = Markalldown.prototype; // cache prototype

mark.model = {
  files: [],  // list of markdown files
  footer: '', // if user sets footer file hold it here
  buffer: '', // hold file contents
  dir: "../test" // define directory to look for files
}

function getExtension(filename) {
  var i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i);
}

function checkHeader(files) {
  var header = files.indexOf('header.md');
  if (header !== -1) {
    files.splice(header, 1); // remove from array
    files.unshift('header.md'); // include at the beginning of array
  }
}

function checkFooter(files) {
  var footer = files.indexOf('footer.md');
  if (footer !== -1) {
    files.splice(footer, 1); // remove from array
    files.push('footer.md'); // include at the end of array
  }
}

function buffer() {
  console.log(mark.model.files);
}

// read directory looking for md files
fs.readdir(mark.model.dir, function(err, files){
  var mdfiles = mark.model.files; // shortcut

  if (err) {
    return console.log("Directory not found!");
  }

  for( i in files) {
    if( getExtension(files[i]) === ".md") {      
        mark.model.files.push(files[i]);
    }//if
  }//for

  checkHeader(mdfiles);
  checkFooter(mdfiles);

  buffer();

});

// export module to be used by NodeJS
module.exports = {
  markalldown: mark
};