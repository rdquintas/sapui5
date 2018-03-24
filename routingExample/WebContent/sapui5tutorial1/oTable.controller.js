jQuery.sap.require("sapui5tutorial1.util.Formatter");
jQuery.sap.require("sap.ui.core.util.Export");
jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
sap.ui.controller("sapui5tutorial1.oTable", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf sapui5tutorial1.oTable
	 */
	onInit : function() {
		var oModel = new sap.ui.model.json.JSONModel("model/Products.json");
		this.getView().setModel(oModel);
	},
	onDataExport : sap.m.Table.prototype.exportData
			|| function(oEvent) {

				var oExport = new sap.ui.core.util.Export({

					// Type that will be used to generate the content. Own
					// ExportType's can be created to support other formats
					exportType : new sap.ui.core.util.ExportTypeCSV({
						separatorChar : ";"
					}),

					// Pass in the model created above
					models : this.getView().getModel(),

					// binding information for the rows aggregation
					rows : {
						path : "/ProductCollection"
					},

					// column definitions with column name and binding info for
					// the content

					columns : [
							{
								name : "Product",
								template : {
									content : "{Name}"
								}
							},
							{
								name : "Product ID",
								template : {
									content : "{ProductId}"
								}
							},
							{
								name : "Supplier",
								template : {
									content : "{SupplierName}"
								}
							},
							{
								name : "Dimensions",
								template : {
									content : {
										parts : [ "Width", "Depth", "Height",
												"DimUnit" ],
										formatter : function(width, depth,
												height, dimUnit) {
											return width + " x " + depth
													+ " x " + height + " "
													+ dimUnit;
										},
										state : "Warning"
									}
								// "{Width} x {Depth} x {Height} {DimUnit}"
								}
							}, {
								name : "Weight",
								template : {
									content : "{WeightMeasure} {WeightUnit}"
								}
							}, {
								name : "Price",
								template : {
									content : "{Price} {CurrencyCode}"
								}
							} ]
				});

				// download exported file
				oExport.saveFile().always(function() {
					this.destroy();
				});
			}
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf sapui5tutorial1.oTable
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf sapui5tutorial1.oTable
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf sapui5tutorial1.oTable
 */
// onExit: function() {
//
// }
});