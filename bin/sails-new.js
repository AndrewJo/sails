#!/usr/bin/env node


/**
 * Module dependencies
 */

var package = require('../package.json')
	, reportback = require('reportback')()
	, rc = require('rc')
	, _ = require('lodash')
	, gettext = require('../locales/gettext')
	, sailsgen = require('sails-generate');





/**
 * `sails new`
 *
 * Create all the files/folders for a new app at the specified path.
 * Relative and/or absolute paths are ok!
 *
 * Asset auto-"linker" is enabled by default.
 */

module.exports = function () {

	// Get CLI configuration
	var config = rc('sails');

	// Build initial scope
	var scope = {
		rootPath: process.cwd(),
		sailsPackageJSON: package
	};

	// Mix-in rc config
	_.merge(scope, config.generators);


	var cliArguments = Array.prototype.slice.call(arguments);

	// Remove commander's extra argument
	cliArguments.pop();
	
	// Peel off the rest of the args
	scope.args = cliArguments;

	return sailsgen( scope, reportback.extend({
		error: reportback.log.error,
		success: function() {
			reportback.log.info( gettext(cli.new.success, [scope.appName, scope.appPath]) );
		},
		missingAppName: function () {
			reportback.log.error( gettext(cli.new.missingAppName) );
		}
	}));
};

