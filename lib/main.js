var http = require('http');
var pbfParser = require('./pbfParser.js');
var pbfParserAsync = require('./pbfParserAsync.js');
var xmlParser = require('./xmlParser.js');

function getFileType(filePath){
    return /^.*[.](xml|pbf)$/.exec(filePath)[1];
}

var CALLBACK_PARSER_BY_FILE_TYPE = {
    xml: xmlParser.parse,
    pbf: pbfParser.parse
};

function parse(opts){
    var format;

    if(opts.format){
        format = opts.format;
    }
    else{
        format = getFileType(opts.filePath);
    }

	if (format === "pbf" && opts.mode === "async") {
		return pbfParserAsync.parse(opts);
	} else {
		return CALLBACK_PARSER_BY_FILE_TYPE[format](opts);
	}
}

module.exports = {

    /**
     * Detects the file type from the file name. Possible return values
     * are:
     * - xml: openStreetMap XML format
     * - pbf: openStreetMap PBF format
     */
    getFileType: getFileType,

    parse: parse,

    parseXml: xmlParser.parse,

    parsePbf: pbfParser.parse,
	parsePbfAsync: pbfParserAsync.parse,

    createPbfParser: pbfParser.createParser

};
