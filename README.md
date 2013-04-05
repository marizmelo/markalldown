Markalldown
============
Combine multiple markdown files

INTALLATION
-----------
Use **npm** to install Markalldown:

    npm install markalldown -g

    
Use Markalldown like this:

1) Current directory

    markalldown

2) Select other directory

    markalldown dir_name

3) Output README.md file

    markalldown dir_name -o


OPTIONS
-------

  Usage: index.js [directory]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -o, --output   Create README.md on current directory


VERSION LOG
-----------

* 0.0.1
First version released. You can set a target directory where to find .md files.
You can also set '-o' (--output) option and create README.md using .md files from the target directory.


TODO
----

     1	- Allow output of combined .md files to README.md
     2	- Allow change of target directory
     3	- Current directory as default target
     4	- Display combined .md files on console
     5	- Combine .md files

LICENSE
-------
(The MIT License)

Copyright (c) 2013 Mariz Melo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.