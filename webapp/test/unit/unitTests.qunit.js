/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sn/covid19fnt/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});