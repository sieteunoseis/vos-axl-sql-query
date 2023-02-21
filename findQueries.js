var glob = require('glob')
var _  = require('lodash')
var fs = require('fs')

// directory containing all queries (in nested folders)
var queriesDirectory = 'queries'

// get all sql files in dir and sub dirs
var files = glob.sync(queriesDirectory + '/**/*.sql', {})

// create object to store all queries
var queries = {}

_.each(files, function(file){
    // 1. read file text
    var queryText = fs.readFileSync(__dirname + '/' + file, 'utf8')

    // 2. store into object
    // create regex for directory name
    var directoryNameReg = new RegExp("^" + queriesDirectory + "/")

    // get the property path to set in the final object, eg: model.queryName
    var queryPath = file
        // remove directory name
        .replace(directoryNameReg,'')
        // remove extension
        .replace(/\.sql/,'')
        // replace '/' with '.'
        .replace(/\//g, '.')

    //  use lodash to set the nested properties
    _.set(queries, queryPath, queryText)
})

// final object with all queries according to nested folder structure
console.log(queries.SQLite)