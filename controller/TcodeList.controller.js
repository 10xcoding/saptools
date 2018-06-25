sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("saptools.controller.TcodeList", {

		onInit : function () {
		
		},
		onFilterTcodes : function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter = [new sap.ui.model.Filter([
				    new sap.ui.model.Filter("TCode", FilterOperator.Contains, sQuery),
                    new sap.ui.model.Filter("Description", FilterOperator.Contains, sQuery),
                    new sap.ui.model.Filter("Program", FilterOperator.Contains, sQuery)
                ], false)];
			}

			// filter binding
			var oList = this.byId("tcodeList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onPress: function (oEvent) {
		    var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				tcodePath: oItem.getBindingContext("tcode").getPath().substr(11)
			});
		}
	});
});