# Difference Calculator

* * *

[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/Stonek79/frontend-project-lvl2)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/Stonek79/frontend-project-lvl2)
[![WF](https://github.com/Stonek79/frontend-project-lvl2/workflows/SecondWF/badge.svg)](https://github.com/Stonek79/frontend-project-lvl2/actions)

* * *

### **Difference Calculator** - a simple program that compares two configuration files and shows a difference.

[**Difference calculator**](https://ru.hexlet.io/professions/frontend/projects/46) is the second project of the profession [*front-end programmer*](https://ru.hexlet.io/professions/frontend) on educational project [**Hexlet**](https://ru.hexlet.io/).

* * * 

## Description

The program determines the difference between the two data structures.
Identifying the differences and obtaining the difference between the two data blocks is one of the most popular and used actions in programming, so knowledge and understanding of this process is a necessary part of learning programming.

This repository contains a small program for working in the console, which allows to detect differences between three data formats (*json*, *yml*, *ini*) and output them in three different styles (*'stylish'*, *'plain text'* and *'json'*).
You can use different file formats for comparison (for example, **json** and **ini**)

* * *

## Installation

You must have [**node.js**](https://nodejs.org/en/) installed on your machine (version 13.0 or higher).

Open your console and enter this commands:

 $ user@name: git clone https://github.com/Stonek79/frontend-project-lvl2.git

Then go to the folder ../frontend-project-lvl2/ on your machine and launch installation:

 $ user@name: make install


* * *


## Usage

The command use this syntax:

    gendiff [format] path1 path2

If you need help, use the `help` command:

    gendiff --help
    
Here is the exemples of usage:

<a href="https://asciinema.org/a/DrkMNoBpDqT69M24ai3XmJzqA" target="_blank"><img src="https://asciinema.org/a/DrkMNoBpDqT69M24ai3XmJzqA.svg" /></a>
    
    - *stylish* format (default)
    $ user@name: gendiff ../diffs/deepFile1.json ../diffs/deepFile2.json
    
        common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      + setting3: {
            key: value
        }
      - setting3: true
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              + wow: so much
              - wow: too much
            }
            key: value
          + ops: vops
        }
    }
    
    - *plain* format
    $ user@name: gendiff --format plain ../diffs/deepFile1.json ../diffs/deepFile2.json
    
    Property 'common.follow' was added with value: false
    Property 'common.setting2' was removed
    Property 'common.setting3' was updated. From true to [complex value]
    Property 'common.setting4' was added with value: 'blah blah'
    Property 'common.setting5' was added with value: [complex value]
    Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
    Property 'common.setting6.ops' was added with value: 'vops'
    
    - *json* format
    $ user@name: gendiff --f json ../diffs/deepFile1.yml ../diffs/deepFile2.yml
    [{"type":"nested","key":"common","children":[{"type":"added","key":"follow","value":false},{"type":"unchanged","key":"setting1","value":"Value 1"},{"type":"deleted","key":"setting2","value":200},{"type":"updated","key":"setting3","newValue":{"key":"value"},"oldValue":true},{"type":"added","key":"setting4","value":"blah blah"},{"type":"added","key":"setting5","value":{"key5":"value5"}},{"type":"nested","key":"setting6","children":[{"type":"nested","key":"doge","children":[{"type":"updated","key":"wow","newValue":"so much","oldValue":"too much"}]},{"type":"unchanged","key":"key","value":"value"},{"type":"added","key":"ops","value":"vops"}]}]}]

    
    
 * * *

**Visualization of the results of the program creation process steps:**

Asciinema of 3 step:
<a href="https://asciinema.org/a/SeX0WGoLYBgeEhNqfcrIgLGX2" target="_blank"><img src="https://asciinema.org/a/SeX0WGoLYBgeEhNqfcrIgLGX2.svg" /></a>

Asciinema of 5 step:
<a href="https://asciinema.org/a/mj1NTqkGRHf9K88iJDre1efbC" target="_blank"><img src="https://asciinema.org/a/mj1NTqkGRHf9K88iJDre1efbC.svg" /></a>

Asciinema of 6 step:
<a href="https://asciinema.org/a/uptUOUAWgb6xaS5T1SEE2VkHl" target="_blank"><img src="https://asciinema.org/a/uptUOUAWgb6xaS5T1SEE2VkHl.svg" /></a>

Asciinema of 7 step:
<a href="https://asciinema.org/a/DWkXqSJyIZjP7Erhvrx4RWm0b" target="_blank"><img src="https://asciinema.org/a/DWkXqSJyIZjP7Erhvrx4RWm0b.svg" /></a>

Asciinema of 8 step:
<a href="https://asciinema.org/a/tOui9ncIIejpOywCOoY40jQob" target="_blank"><img src="https://asciinema.org/a/tOui9ncIIejpOywCOoY40jQob.svg" /></a>

Asciinema of 9 step:
<a href="https://asciinema.org/a/DrkMNoBpDqT69M24ai3XmJzqA" target="_blank"><img src="https://asciinema.org/a/DrkMNoBpDqT69M24ai3XmJzqA.svg" /></a>
