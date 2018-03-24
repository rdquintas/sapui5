sap.ui.controller("sap.m.sample.StandardListItemTitle.List", {

	onInit : function (evt) {

		// set explored app's demo model on this sample
		var oModel = new sap.ui.model.json.JSONModel("test-resources/sap/ui/demokit/explored/products.json");
		this.getView().setModel(oModel);

		this.getView().byId("ShortProductList").bindElement("/ProductCollection");
	}
});