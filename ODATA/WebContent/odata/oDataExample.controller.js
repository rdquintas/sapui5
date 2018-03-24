jQuery.sap.require("odata.util.Formatter");
sap.ui.controller("odata.oDataExample", {

/**
 * Called when a controller is instantiated and its View controls (if available)
 * are already created. Can be used to modify the View before it is displayed,
 * to bind event handlers and do other one-time initialization.
 * 
 * @memberOf odata.oDataExample
 */
	onInit: function() {
 var url="http://services.odata.org/V2/(S(z4sclgcgdqaxmgn0efad1egf))/OData/OData.svc";
// var url = "http://services.odata.org/V2/Northwind/Northwind.svc";
// var oModel = new sap.ui.model.odata.ODataModel(url);
		oModel = new sap.ui.model.odata.ODataModel(url,true); 
		var that = this;
		that.getView().setModel(oModel);
// this.getView().byId("idProductsTable").setModel(oModel);
		  /*oModel .read( "/Products", null, null, true, function(response) {
		  console.log(response); var jsonModel = new
		  sap.ui.model.json.JSONModel();
		  jsonModel.setData({Products:response.results});
		  that.getView().byId("idProductsTable").setModel(jsonModel); },
		  function(oError){ console.log(oError); });*/
	},
	onCreate : function(oEvent){
		// onCreate code
		 var oModel=this.getView().getModel();
		var data =  {"ID": 106,
				"Name": "Bread106",
				"Description": "Whole grain bread106",
				"Rating": 400,
				"Price": "2.53"};
		oModel
		.create(
				"/Products",
				data,
				null,
				function(response) {
					console.log(response);
				},
				function(oError){
					console.log(oError);
				});
	},
	onChange : function(oEvent){
		// onchange code
		var oModel=this.getView().getModel();
		var data =  {
				"Name": "Bread106 modified",
				"Description": "Whole grain bread106 modified",
				"Rating": 4000,
				"Price": "2.535"};
		oModel
		.update(
				"/Products(106)",
				data,
				null,
				function(response) {
					console.log(response);
			
				},
				function(oError){
					console.log(oError);
				});
	},
	onDelete : function(oEvent){
		// Delete an entry
		var oModel=this.getView().getModel();
		oModel.remove(
				"/Products(106)",null,
				null,
				function(response) {
					console.log(response);
				
				},
				function(oError){
					console.log(oError);
				});
	},
	onBatchOperation : function(oEvent){
		var oModel = this.getView().getModel();
		var path = "EntitySet";
		var data = "dataobject that has to send to back end";
		var batch = oModel.createBatchOperation(path,"POST/PUT/GET/DELETE",data,null);
		batchArray.push(batch);
		oModel.addBacthChangeOperations(batchArray);
		oModel.submitBatch(function(response){
			
		}, function(oError){
			
		});
	}

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf odata.oDataExample
 */
// onBeforeRendering: function() {
//
// },

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf odata.oDataExample
 */
// onAfterRendering: function() {
//
// },

/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf odata.oDataExample
 */
// onExit: function() {
//
// }

});