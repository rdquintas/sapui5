jQuery.sap.declare("odata.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

odata.util.Formatter = {
	
	date : function (value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"}); 
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	}
};