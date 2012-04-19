define(["dojo/dom", "dojo/_base/connect", "dijit/registry", "dojox/mvc/at"],
function(dom, connect, registry, at){
	window.at = at; // set global namespace for dojox.mvc.at
	dojox.debugDataBinding = false;	//disable dojox.mvc data binding debug

	var _connectResults = []; // events connect results
	var currentModel = null;

	var setRef = function (id, attr){
		var widget = registry.byId(id);
		widget.set("target", at("rel:", attr));
		console.log("setRef done.");
	};
	return {
		// simple view init
		init: function(){
			currentModel = this.loadedModels.names;
			var connectResult;

			connectResult = connect.connect(dom.byId('shipto'), "click", function(){
				setRef('addrGroup', 'ShipTo');
			});
			_connectResults.push(connectResult);

			connectResult = connect.connect(dom.byId('billto'), "click", function(){
				setRef('addrGroup', 'BillTo');
			});
			_connectResults.push(connectResult);

			connectResult = connect.connect(dom.byId('reset1'), "click", function(){
				currentModel.reset();
				console.log("reset done. ");
			});
			_connectResults.push(connectResult);
		},

		// simple view destroy
		destroy: function(){
			for(var i = 0; i < _connectResults.length; i++){
				if(_connectResults[i]){
					connect.disconnect(_connectResults[i]);
				}
			}
		}
	}
});
