/*
 *	----------------------------------------------------------------
 *	Copyright Backbase b.v. 2003/2012
 *	All rights reserved.
 *	----------------------------------------------------------------
 *	Version 5.5
 *	Author : Backbase R&D - Amsterdam - New York
 *	----------------------------------------------------------------
 */
new function(){

	//  ----
	// 	Reflector based control space
	//  ----

	var DOMReflector = b$.bdom.util.DOMReflector;
	var RFL_DOM2Control = b$.bdom.util.RFL_DOM2Control;

	/**
	 * This reflection is a controller for catalogs, portals and applications. It links the model element to a view element.
	 * You need to register each reflection in a reflector of type <code>b$.bdom.util.DOMReflector</code>.
	 * For registering a reflection, you can use a short-hand in the <code>config</code> parameter.
	 * @param {Function} config Key-value pairs that are parsed as properties of the new reflection.
	 * For example, setting config to the following value:
	 * <pre>
	 * {'match':'Catalog','localName':'catalog'}
	 * </pre>
	 * Will generate a new reflection with property <code>match</code> set to <code>Catalog</code> and property <code>localName</code> set to <code>catalog</code>.
	 * @extends b$.bdom.util.RFL_DOM2Control
	 * @ignore
	 */
	var RFL_PortalModel2Control = RFL_DOM2Control.extend(null,{
		ns: 'http://backbase.com/2012/portalView',
		localName: 'baseElement',
		getNS: function(model) {
			var sLocalName = this.getLocalName(model);

			if (b$.bdom.namespaces['http://backbase.com/2013/portalView'] && b$.bdom.namespaces['http://backbase.com/2013/portalView'].classes[sLocalName]) {
				return 'http://backbase.com/2013/portalView';
			} else if (b$.bdom.namespaces['http://backbase.com/2012/portalView'] && b$.bdom.namespaces['http://backbase.com/2012/portalView'].classes[sLocalName])	{
				return 'http://backbase.com/2012/portalView';
			};

			return this.ns;
		},

		initInstance: function(bdom, model) {
			bdom.model = model;
//			attachBehaviors(model, bdom);
//			copyPrefs(model, bdom);
		}
	});


//	var XXXXXRFL_PM2Catalog = RFL_PortalModel2Control.extend(null,{
//		localName:'catalog',
//		initInstance:function(bdom, model) {
//			bdom.model = model;
//			attachBehaviors(model, bdom);
//			copyPrefs(model, bdom);
//		}
//	});


	/**
	 * This reflection is a controller for containers, links and pages. It links the model element to a view element.
	 * You need to register each reflection in a reflector of type <code>b$.bdom.util.DOMReflector</code>.
	 * For registering a reflection, you can use a short-hand in the <code>config</code> parameter.
	 * @class
	 * @param {Function} config Key-value pairs that are parsed as properties of the new reflection.
	 * For example, setting config to the following value:
	 * <pre>
	 * {'match':'Container','localName':'container'}
	 * </pre>
	 * Will generate a new reflection with property <code>match</code> set to <code>Container</code> and property <code>localName</code> set to <code>container</code>.
	 * Please note that the <code>getLocalName</code> method overrides the default <code>localName</code> value, based on the <code>TemplateName</code> property.
	 * @extends b$.bdom.util.RFL_PortalModel2Control
	 * @ignore
	 */
	var RFL_PM2CtrlwithTemplateName = RFL_PortalModel2Control.extend(null,{
		getNS: function(model) {
			if (this.localName.toLowerCase() == 'container') {
				var sLocalName = model.originalItem.preferences['TemplateName'].value;
			};
			if (this.localName.toLowerCase() == 'page') {
				var sLocalName = this.getLocalName(model);
				// return 'http://backbase.com/2012/portalView';
			};
			// TODO check if 2013 namspace exists
			if (model.getAttribute('viewNamespace')) {
				return model.getAttribute('viewNamespace');
			} else if (b$.bdom.namespaces['http://backbase.com/2013/portalView'] && b$.bdom.namespaces['http://backbase.com/2013/portalView'].classes[sLocalName]) {
				return 'http://backbase.com/2013/portalView';
			} else if (b$.bdom.namespaces['http://backbase.com/2012/portalView'] && b$.bdom.namespaces['http://backbase.com/2012/portalView'].classes[sLocalName])	{
				return 'http://backbase.com/2012/portalView';
			};

			return this.ns;
		},

		/**
		 * Returns a portal view class based on the <code>TemplateName</code> property of <code>model</code>.
		 * @param {backbase.com.2012.portalModel.Item} model
		 * @return {backbase.com.2012.portalView.[TemplateName]} A portal view class that corresponds to the <code>TemplateName</code> property of <code>model</code>.
		 * If none exists, falls back to <code>backbase.com.2012.portalView.baseElement</code>.
		 * @ignore
		 */
		getLocalName: function(model) {
			var sViewClass = this.localName;
			var p = model.originalItem.preferences['TemplateName'];
			// TODO check if 2013 namspace exists
			if (model.getAttribute('viewNamespace')) {
				sViewClass = p.value;
			} else if (p && b$.bdom.namespaces['http://backbase.com/2013/portalView'] && b$.bdom.namespaces['http://backbase.com/2013/portalView'].classes[p.value]) {
				sViewClass = p.value;
			} else if (p && b$.bdom.namespaces['http://backbase.com/2012/portalView'] && b$.bdom.namespaces['http://backbase.com/2012/portalView'].classes[p.value])	{
				sViewClass = p.value;
			}
			// check here?
				
//			if (p)	// check here?
//			console.log(p.value)
//			console.log('sViewClass '+sViewClass)
			return sViewClass;
		},
		initInstance:function(bdom, model) {
			bdom.model = model;
			attachBehaviors(model, bdom);
			copyPrefs(model, bdom);
		}
	});


	/**
	 * This reflection is a controller for widgets. It links the model element to a view element.
	 * You need to register each reflection in a reflector of type <code>b$.bdom.util.DOMReflector</code>.
	 * For registering a reflection, you can use a short-hand in the <code>config</code> parameter.
	 * @class
	 * @param {Function} config Key-value pairs that are parsed as properties of the new reflection.
	 * For example, setting config to the following value:
	 * <pre>
	 * {'match':'Widget','localName':'widget'}
	 * </pre>
	 * Will generate a new reflection with property <code>match</code> set to <code>Widget</code> and property <code>localName</code> set to <code>widget</code>.
	 * Please note that the <code>getLocalName</code> method overrides the default <code>localName</code> value, based on the <code>TemplateName</code> property.
	 * @extends b$.bdom.util.RFL_PortalModel2Control
 	 * @ignore
	 */
	var RFL_PM2Widget = RFL_PortalModel2Control.extend(null,{
		localName:'widget',
		/**
		 * Returns a portal view class for a Backbase widget or a W3C widget based on the <code>TemplateName</code> property of <code>model</code>,
		 * which should be either <code>Standard_Widget</code> or <code>W3C_Widget</code>.
		 * @param {backbase.com.2012.portalModel.Item} model
		 * @return {backbase.com.2012.portalView.backbaseWidget / backbase.com.2012.portalView.w3cWidget} Returns the <code>backbaseWidget</code> class when the <code>TemplateName</code> property of <code>model</code> is
		 * <code>Standard_Widget</code>, or the <code>w3cWidget</code> class when the <code>TemplateName</code> property is <code>W3C_Widget</code>.
		 * If the <code>TemplateName</code> property has a different value, falls back to <code>backbase.com.2012.portalView.widget</code>.
		 * @ignore
		 */
		getLocalName: function(model) {
			var sViewClass = 'widget';
			var p = model.originalItem.preferences['TemplateName'];
			if (p) {
				if (p.value == 'Standard_Widget') {
				   sViewClass = 'backbaseWidget';
				}
				else if (p.value == 'W3C_Widget') {
				   sViewClass = 'w3cWidget';
				}
			}
/*
			// OLD CODE... Deprecated....Removed....
			var p = bnode.originalItem.preferences['template'];
			if (p) {
				if (p.value == 'backbase')
					sViewClass = 'backbaseWidget';
				else if (p.value == 'w3c')
					sViewClass = 'w3cWidget';
				else if (p.value == 'dashboard')
					sViewClass = 'DashboardWidget';
			}
2*/
			return sViewClass;
		},
		initInstance:function(bdom, model) {
			bdom.model = model;
			attachBehaviors(model, bdom);
			copyPrefs(model, bdom);
		}
	});

	function copyPrefs(model, bdom) {
		for (var i = 0, l = model.preferences.array.length; i < l; i++){
			var p = model.preferences.array[i];
			bdom.setAttribute(p.name, p.value);
		}
	}







	/**
	 * Registers JS functions stored in the <code>behaviors</code> property of the specified object as event listeners to the specified node.
	 * @param {backbase.com.2012.portalModel.Item} object
	 * @param {b$.bdom.Node} node
	 * @ignore
	 */
	var attachBehaviors = function(model, node){
		var behaviorsPref = model.getPreference('behaviors') || '';
		var behaviorProviders = behaviorsPref.split(' ');
		for (var i = 0, l = behaviorProviders.length; i < l; i++) {
			try {
//				var behaviorProvider = b$.require(behaviorProviders[i]);
				var behaviorProvider = require(behaviorProviders[i]);
				if (behaviorProvider && behaviorProvider.behaviors) {
					for (var h in behaviorProvider.behaviors){
						if (behaviorProvider.behaviors.hasOwnProperty(h)) {
							node.addEventListener(h, behaviorProvider.behaviors[h]);
						}
					}
				}
			} catch (err) {
				if (top.bd && top.bd.devMode) {
					console.log('Unable to attach behavior ' + behaviorProviders[i] + ': ' + err.message);
				}
			}
		}
	};

	// Copied from foundation...
	function require(sName) {
		var oContext = window;
		var aNameParts = sName.split('.');
		if (aNameParts.length == 1 && aNameParts[0] == '')
			return oContext;
		for (var i = 0; i < aNameParts.length; i++) {
			if (aNameParts[i] in oContext) {
				oContext = oContext[aNameParts[i]];
			} else {
				var oError = new Error('Cannot find object "' + sName + '".');
				// Be nice to Firefox
				if (oError.stack) {
					var sLastCall = oError.stack && oError.stack.split('\n')[2];
					var aResults = sLastCall && sLastCall.match(/^[^@]*@(.*):(\d+)$/);
					if (aResults && aResults[1] && aResults[2]) {
						oError = new Error(oError.message, aResults[1], Number(aResults[2]));
					}
				}
				throw oError;
			}
		}
		return oContext;
	};








	var domReflector = new DOMReflector();

	domReflector.getID = function(model) {
		return 'VIEW-'+model._jxid;
	}
	domReflector.addToSet('default',[
		new RFL_PM2Widget({'match':'Widget','localName':'widget'}),
		new RFL_PM2CtrlwithTemplateName({'match':'Container','localName':'container'}),
		new RFL_PM2CtrlwithTemplateName({'match':'Link','localName':'link'}),
		new RFL_PM2CtrlwithTemplateName({'match':'Page','localName':'page'}),
		new RFL_PortalModel2Control({'match':'Catalog','localName':'catalog'}),
		new RFL_PortalModel2Control({'match':'Portal','localName':'portal'}),
		new RFL_PortalModel2Control({'match':'Application','localName':'application'})
	]);

/*
	domReflector.addToSet('catalog',[
		new RFL_PortalModel2Control({'match':'Widget','localName':'icon'}),
		new RFL_PortalModel2Control({'match':'Container','localName':'icon'}),
		new RFL_PortalModel2Control({'match':'Link','localName':'icon'}),
		new RFL_PortalModel2Control({'match':'Page','localName':'icon'}),
		new RFL_PortalModel2Control({'match':'Catalog','localName':'icon'}),
		new RFL_PortalModel2Control({'match':'Portal','localName':'icon'}),
		new RFL_PortalModel2Control({'match':'Application','localName':'icon'})
	]);
*/

	// TODO::: Shall we store this on the ownerDocument?????????
	b$.portal.portalReflector = domReflector;

	b$.portal.setController('portal', domReflector);


}