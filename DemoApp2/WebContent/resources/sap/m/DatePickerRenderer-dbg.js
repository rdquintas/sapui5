/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.m.InputBaseRenderer");
jQuery.sap.declare("sap.m.DatePickerRenderer");

/**
 * @class DatePicker renderer. 
 * @static
 */
sap.m.DatePickerRenderer = sap.ui.core.Renderer.extend(sap.m.InputBaseRenderer);

/**
 * Adds control specific class
 *
 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.m.DatePicker} oDP an object representation of the control that should be rendered
 */
sap.m.DatePickerRenderer.addOuterClasses = function(oRm, oDP) {

	oRm.addClass("sapMDP");

	if (sap.ui.Device.browser.internet_explorer && sap.ui.Device.browser.version < 10) {
		oRm.addClass("sapMInputIE9");
	}

};

/**
 * add extra content to Input
 *
 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.m.DatePicker} oDP an object representation of the control that should be rendered
 */
sap.m.DatePickerRenderer.writeInnerContent = function(oRm, oDP) {

	if (oDP.getEnabled() && oDP.getEditable()) {
		var aClasses = [];
		var mAttributes = {};

		mAttributes["id"] = oDP.getId() + "-icon";
		mAttributes["tabindex"] = "-1"; // to get focus events on it, needed for popup autoclose handling
		oRm.writeIcon("sap-icon://appointment-2", aClasses, mAttributes);
	}

	// invisible span with description for keyboard navigation
	var rb = sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");
		// ResourceBundle always returns the key if the text is not found
	var sText = rb.getText("DATEPICKER_KEYBOARD");
	var sDateType = rb.getText("DATEPICKER_DATE_TYPE");

	var sTooltip = sap.ui.core.ValueStateSupport.enrichTooltip(oDP, oDP.getTooltip_AsString());
	if (sTooltip) {
		// add tooltip to description because it is not read by JAWS from title-attribute if a label is assigned
		sText = sTooltip + ". " + sText;
	}
	sText = sDateType + ". " + sText;
	oRm.write('<SPAN id="' + oDP.getId() + '-Descr" style="visibility: hidden; display: none;">');
	oRm.writeEscaped(sText);
	oRm.write('</SPAN>');

};

/**
 * Write the value of the input.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.m.DatePicker} oDP An object representation of the control that should be rendered.
 */
sap.m.DatePickerRenderer.writeInnerValue = function(oRm, oDP) {

	oRm.writeAttributeEscaped("value", oDP._formatValue(oDP.getDateValue()));

};

/**
 * This method is reserved for derived classes to add extra attributes for the input element.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.m.DatePicker} oDP An object representation of the control that should be rendered.
 */
sap.m.DatePickerRenderer.writeInnerAttributes = function(oRm, oDP) {

	if (sap.ui.Device.browser.mobile) {
		// prevent keyboard in mobile devices
		oRm.writeAttribute("readonly", "readonly");
	}

	var mProps = {
		multiline: false,
		autocomplete: "none",
		haspopup: true,
		describedby: {value: oDP.getId() + "-Descr", append: true}};

	if (oDP.getValueState() == sap.ui.core.ValueState.Error) {
		mProps["invalid"] = true;
	}

	oRm.writeAccessibilityState(oDP, mProps);

};
