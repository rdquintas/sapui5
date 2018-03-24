sap.ui.jsview("customControls.extendTextField", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf customControls.extendTextField
	 */
	getControllerName : function() {
		return "customControls.extendTextField";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf customControls.extendTextField
	 */
	createContent : function(oController) {
 
		sap.ui.commons.TextField.extend("HighlightField2", { // call the new
															// Control type
															// "HighlightField"
			// and let it inherit from sap.ui.commons.TextField

			renderer : {
				// note that NO render() function is given here! The TextField's
				// render() function is used.
				// But one function is overwritten:

				renderInnerAttributes : function(oRm, oTextField) {
					oRm.addStyle('background-color', 'blue'); // this
																	// change
																	// could
																	// also be
																	// done with
																	// plain
																	// CSS!!
					// But you get the idea...
				}
			}
		});
		var myControl = new HighlightField2({
			value : "Highlighted editing"
		});
//		var myControl = new sap.ui.commons.TextField();
		return myControl;
	}

});