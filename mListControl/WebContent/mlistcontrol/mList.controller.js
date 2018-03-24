sap.ui.controller("mlistcontrol.mList", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf mlistcontrol.mList
	 */
	onInit : function() {
		var oModel = new sap.ui.model.json.JSONModel("model/Products.json");
		this.getView().setModel(oModel);
	},

	handleDelete : function(oEvt) {
		// remove list Item from the List
		oEvt.getSource().removeItem(oEvt.getParameter("listItem"));
	},
	getGroupHeader : function(oGroup) {
		return new sap.m.GroupHeaderListItem({
			title : oGroup.key,
			upperCase : false
		});
	},
	handlePress : function(oEvt) {
		alert("Handle Press triggered");
	},
	refreshDataFromBackend : function(oEvt) {
		alert("Refresh triggered");
	},
	handleSelectChange : function(oEvent) {
		var mode = oEvent.getParameter("selectedItem").getKey();
		this.getView().byId("ProductList").setMode(mode);
	},
	onSearch : function(oEvt) {

		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("Name",
					sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}

		// update list binding
		var list = this.getView().byId("ProductList");
		var binding = list.getBinding("items");
		binding.filter(aFilters);
	},
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf mlistcontrol.mList
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf mlistcontrol.mList
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf mlistcontrol.mList
 */
// onExit: function() {
//
// }
});