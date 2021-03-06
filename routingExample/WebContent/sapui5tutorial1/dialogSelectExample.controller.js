sap.ui.controller("sapui5tutorial1.dialogSelectExample", {

	onInit : function() {
		// set explored app's demo model on this sample
		var oModel = new sap.ui.model.json.JSONModel(
				"model/Products.json");
		this.getView().setModel(oModel);
	},

	onExit : function() {
		if (this._oDialog) {
			this._oDialog.destroy();
		}
	},

	handleSelectDialogPress : function(oEvent) {
		if (!this._oDialog) {
			this._oDialog = sap.ui.xmlfragment(
					"com.tutorial.fragments.Dialog", this);
		}

		// Multi-select if required
		var bMultiSelect = !!oEvent.getSource().data("multi");
		this._oDialog.setMultiSelect(bMultiSelect);

		// Remember selections if required
		var bRemember = !!oEvent.getSource().data("remember");
		this._oDialog.setRememberSelections(bRemember);

		this._oDialog.setModel(this.getView().getModel());
		// toggle compact style
		/*jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(),
				this._oDialog);*/
		this._oDialog.open();
	},

	handleSearch : function(oEvent) {
		var sValue = oEvent.getParameter("value");
		var oFilter = new sap.ui.model.Filter("Name",
				sap.ui.model.FilterOperator.Contains, sValue);
		var oBinding = oEvent.getSource().getBinding("items");
		oBinding.filter([ oFilter ]);
	},

	handleClose : function(oEvent) {
		jQuery.sap.require("sap.m.MessageToast");
		var aContexts = oEvent.getParameter("selectedContexts");
		if (aContexts.length) {
			sap.m.MessageToast.show("You have chosen "
					+ aContexts.map(function(oContext) {
						return oContext.getObject().Name;
					}).join(", "));
		}
		oEvent.getSource().getBinding("items").filter([]);
	}

});