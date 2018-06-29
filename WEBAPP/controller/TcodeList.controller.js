sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter"
], function (Controller, Filter, FilterOperator, Sorter) {
	"use strict";

	return Controller.extend("WEBAPP.controller.TcodeList", {

		onInit : function () {
		    // hide table
            var oTable = this.getView().byId('tcodeList');
            oTable.setVisible(false);
            
            // global flags to track sorting order
            window.decendingCode = true;
            window.decendingDescription = true;
            window.decendingProgram = true;
		},
		
		onFilterTcodes : function (oEvent) {
		    // get table
		    var oTable = this.getView().byId('tcodeList');
		    
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			
			if (sQuery && sQuery !== "") {
			    // show table
                oTable.setVisible(true);
                
                // add filters
				aFilter = [new sap.ui.model.Filter([
				    new sap.ui.model.Filter("TCode", FilterOperator.Contains, sQuery),
                    new sap.ui.model.Filter("Description", FilterOperator.Contains, sQuery),
                    new sap.ui.model.Filter("Program", FilterOperator.Contains, sQuery)
                ], false)];
			} 
			else {
			    // hide table
			    oTable.setVisible(false);
			}

			// filter binding
			var oList = this.byId("tcodeList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
			
			
		},
		
		onPress: function (oEvent) {
		    var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail_name", {
				tcodePath: oItem.getBindingContext("tcode").getPath().substr(11)
			});
		},
		
// 		// acending or decending
// 		compare: function (columnNum) {

// 		    // get 2nd row 1st column from table
// 		    var oTable = this.getView().byId("tcodeList");
// 		    var oFirstItem = oTable.getItems()[1];
//             var oCell = oFirstItem.getCells()[0];
//             alert(oCell.getText());
// 		},
		
		onSortCode: function () {
            // set to oposite choice
		    window.decendingCode = !window.decendingCode;
		    
		    // sort
		    var oTable = this.getView().byId("tcodeList");
		    var oBinding = oTable.getBinding("items");
		    var oSorter = new Sorter("TCode", window.decendingCode);
		    oBinding.sort(oSorter);
		},
		
		onSortDescription: function () {
		    // set to oposite choice
		    window.decendingDescription = !window.decendingDescription;
		    
		    // sort
		    var oTable = this.getView().byId("tcodeList");
		    var oBinding = oTable.getBinding("items");
		    var oSorter = new Sorter("Description", window.decendingDescription);
		    oBinding.sort(oSorter);
		},
		
		onSortProgram: function () {
            // set to oposite choice
		    window.decendingProgram = !window.decendingProgram;
		    
		    // sort
		    var oTable = this.getView().byId("tcodeList");
		    var oBinding = oTable.getBinding("items");
		    var oSorter = new Sorter("Program", window.decendingProgram);
		    oBinding.sort(oSorter);
		}
	});
});