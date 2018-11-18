/*
 *	----------------------------------------------------------------
 *	Copyright Backbase b.v. 2003/2013
 *	All rights reserved.
 *	----------------------------------------------------------------
 *	Version 5.5
 *	Author : Backbase R&D - Amsterdam - New York
 *	----------------------------------------------------------------
 */
//  ----------------------------------------------------------------
b$.module('b$.view.bdom', function() {

	var DesignElement = b$.bdom.getNamespace('http://backbase.com/2012/view').getClass('DesignElement');
	
	/**
	 * @extends backbase.com.2012.view.DesignElement
	 * @class backbase.com.2013.view.ViewElement
	 */
	var ViewElement = DesignElement.extend(null, {
			namespaceURI: 'http://backbase.com/2013/view',
			localName: 'ViewElement',
			getHTMLNode: function() {
				return this.getDisplay();
			}
		});

});/*
 *	----------------------------------------------------------------
 *	Copyright Backbase b.v. 2003/2012
 *	All rights reserved.
 *	----------------------------------------------------------------
 *	Version 5.5
 *	Author : Backbase R&D - Amsterdam - New York
 *	----------------------------------------------------------------
 */

b$.module("b$.portal.view.bdom.default", function() {

	var scope = function(){return this}();

	var BDOMNamespace = b$.bdom.Namespace;

	var Component = b$.view.bdom.Component;
	var ViewElement = b$.bdom.getNamespace('http://backbase.com/2013/view').getClass('ViewElement');

	var Perspective = b$.view.perspective.Perspective;
	var PerspectiveType = b$.view.perspective.PerspectiveType;
	var PerspectiveParameters = b$.view.perspective.PerspectiveParameters;
	var SimpleURITemplate = b$._private.template.SimpleURITemplate;

    var htmlAPI = b$._private.htmlAPI;

	var XMLHelper 	= b$._private.xml;

	var NSPortalDefault = BDOMNamespace.extend(function (namespaceURI) {
		BDOMNamespace.call(this, namespaceURI);
	},{

	});

	var NS = new NSPortalDefault('http://backbase.com/2013/portalView');


	this.NS = NS;


	var refreshHTML = function (bdomModel, elm, callback, errCallback) {

		var This = this;
		b$.portal.portalServer.loadItemHTML(bdomModel.originalItem, function(text, res) {

			var head = text.substring(0,text.indexOf('<body>'))+'</html>';
			var body = text.substring(text.indexOf('<body>')+6,text.indexOf('<script type="text/backbase-xml'));
			// var xmp = text.substring(text.indexOf('<xmp>')+5,text.indexOf('</xmp>'));
			var xmp = '';
			if (text.indexOf('<script type="text/backbase-xml">') !== -1){
				xmp = text.substring(text.indexOf('<script type="text/backbase-xml">')+33, text.indexOf('</script>', text.indexOf('<script type="text/backbase-xml">')+33));
			}

			var xml = XMLHelper.parse(head);

			b$.portal._private.definition.getResourcesFromDefinition(xml, '', function(){

				// Insert new HTML
				var htmlNode = htmlAPI.createElementFromString(body);

				var ownerDocument = bdomModel.ownerDocument;

				bdomModel.destroy();

				var xml = XMLHelper.parse(xmp);

				var bres = b$.portal.importPortalModel(xml, ownerDocument, null, htmlNode);

				if(callback)callback(bres, res);

				// Designmode trigger
				var bdom = htmlNode.viewController;
				if(bdom.ownerDocument.documentElement.designMode)
					bdom.enableDesignMode();


			}, function(){
				var htmlNode = htmlAPI.createElementFromString('<span>This part of the page can\'t be rendered </span>');
				htmlNode.viewController = elm.viewController;
				elm.appendChild(htmlNode);

				var xml = XMLHelper.parse(xmp);
				var item = b$.portal.portalServer.itemXMLDOC2JSON(xml);
				bdomModel.setItem(item);
				if(callback)callback();
			});


		}, errCallback, true);
	};

	var sProfile = {
		'ADMIN' : 0,
		'CREATOR' : -1,
		'COLLABORATOR' : -2,
		'CONTRIBUTOR': -3,
		'CONSUMER' : -4
	};



	/**
	 * @extends backbase.com.2013.view.ViewElement
	 * @class backbase.com.2013.portalView.portalViewElement
	 */
	var PortalViewElement = ViewElement.extend(function() {
			ViewElement.apply(this, arguments);
			if (this.ownerDocument.defaultDragHandlers) {
				this.addHandlers(this.ownerDocument.defaultDragHandlers);
			};
			/**
			 * @event preferences-form
			 * Fired before initialization of the preferences form
			 * - event.detail.context {Object} the context in what the preferences form was called, the item of wich the preferences are shown
			 */
 			/**
			 * @event preferenceFormReady
			 * Fired when preferences form is ready and appended to the BDOM, htmlNode is available
			 */
			/**
			 * @event savePreferenceForm
			 * Fired before preferences are saved. Custom preferences can be saved by adding the name:value in the event.detail.
			 * - event.detail[preferenceName] {String} name value pairs of the preferences on the detail of the event.
			 */
 			/**
			 * @event preferencesSaved
			 * Fired after preferences are saved
			 */
		}, {


			localName: 'portalViewElement',
			/**
			 * @property namespaceURI
			 * The namespace URI of the node.
			 */
			namespaceURI: 'http://backbase.com/2013/portalView',

			insertDisplayChild: function(bdom, bdomBefore) {
				if(!(bdom.model && bdom.model._ssr) && bdom.injectDisplaySelf(bdom, bdomBefore) && bdom.htmlNode) {
					// This is probably only true for preference forms
					if (!bdom.getPreference) {
						var oArea = this.getDisplay('area') || this.getDisplay();
						oArea.appendChild(bdom.htmlNode);
						return;
					};

					var aAreas = this.getDisplay('area', true) || this.getDisplay();
					var iChildAreaPref = parseInt(bdom.getPreference('area'),10) || 0;
					var iChildArea = aAreas[iChildAreaPref] ? iChildAreaPref : aAreas.length - 1;
					var iChildOrder = parseInt(bdom.getPreference('order'),10) || 0;
					var oAreaBefore;

					// Check if there is anything in the area and if so does it need to render before or after
					if (aAreas[iChildArea].childNodes.length) {
						for (var i = aAreas[iChildArea].childNodes.length - 1; i >= 0; i--) {
							if (aAreas[iChildArea].childNodes[i] !== bdom.htmlNode && aAreas[iChildArea].childNodes[i].viewController) {
								var iOrder = parseInt(aAreas[iChildArea].childNodes[i].viewController.getPreference('order'), 10);
								if (iOrder > iChildOrder) {
									oAreaBefore = aAreas[iChildArea].childNodes[i].viewController;
								};
							};
						};
					};

					if (bdomBefore && bdomBefore.htmlNode) {
						bdomBefore.htmlNode.parentNode.insertBefore(bdom.htmlNode, bdomBefore.htmlNode);
					} else {
						if (oAreaBefore) {
							aAreas[iChildArea].insertBefore(bdom.htmlNode, oAreaBefore.htmlNode);
						} else {
							aAreas[iChildArea].appendChild(bdom.htmlNode);
						};
					};
				};
			},

			/**
			 * Returns whether this element is a possible drag target.
			 * @return {Boolean} Whether this element is a possible drag target.
			 */
			dragIsTarget: function () {
				return this.isPossibleDragTarget;
			},

			/**
			 * Makes AJAX request to Portalserver to retrieve the fresh item and replaces old view with new.
			 * @param {Function} callback called on success. Arguments: 1:Refreshed bdom element, 2:{responseHeaders, status, statusText}
			 * @param {Function} errCallback called on error
			 */
			refreshHTML: function (callback, errCallback) {

				var targetParentModel = this.model.parentNode;
				var ownerDocument = this.ownerDocument;

				refreshHTML(this.model, null, function(bres, res){
					var parentView, bresView;
					targetParentModel.appendChild(bres);

					parentView = ownerDocument.all[b$.portal.portalReflector.getID(targetParentModel)];
					bresView = ownerDocument.all[b$.portal.portalReflector.getID(bres)];
					parentView.insertDisplayChild(bresView);
					if(callback) {
						callback(bresView, res);
					}
				});

				return;


				var This = this;
				b$.portal.portalServer.loadItemHTML(this.model.getJSON(), function(text) {

					var head = text.substring(0,text.indexOf('<body>'))+'</html>';
					var body = text.substring(text.indexOf('<body>')+6,text.indexOf('<script type="text/backbase-xml"'));
					// var xmp = text.substring(text.indexOf('<xmp>')+5,text.indexOf('</xmp>'));
					var xmp = '';
					if (text.indexOf('<script type="text/backbase-xml">') !== -1){
						xmp = text.substring(text.indexOf('<script type="text/backbase-xml">')+33,text.indexOf('</script>', text.indexOf('<script type="text/backbase-xml">')+33));
					}

					var xml = XMLHelper.parse(head);
					b$.portal._private.definition.getResourcesFromDefinition(xml, '', function(){
						// hmmm, can be done more subtle?
						if(This.htmlNode != null)
						   This.htmlNode.innerHTML = '';

						var htmlNode = htmlAPI.createElementFromString(body);
						if (!htmlNode){
							htmlNode = htmlAPI.createElementFromString('<span>'+body+'</span>');
						}
						htmlNode.viewController = This.htmlNode.parentNode.viewController;
						This.htmlNode.parentNode.insertBefore(htmlNode, This.htmlNode);


						var parent = This.model.parentNode;
						This.model.destroy();

						var xml = XMLHelper.parse(xmp);
						var item = b$.portal.portalServer.itemXMLDOC2JSON(xml);


						b$.portal._buildModelFromJSON(parent.ownerDocument, item, parent);
						if(callback)callback();
					});


				}, errCallback, true);
			},

			/**
			 * When the loadChildren property is set to false this method can be called to add the children to the model and reflect into the view.
			 * @param {Object} [child] the child object to load. Other children will not be loaded.
			 * @param {Function} [callback] called when the children have been appended to the DOM and model is initialized.
			 */
			loadChildren: function(child, callback) {
				var aChildren = [];
				if (!this.model._children) {return};

				if (child) {
					aChildren.push(child);
				} else {
					aChildren = this.model._children;
				};

				var that = this;

				for (var i = aChildren.length - 1; i >= 0; i--) {
					// break if the child already has been appended
					if (b$.portal.portalModel.getElementById(aChildren[i].name)) {break;};

					var loadItemHTMLCallback = function(response, xhr) {
						// retrieve html head body and xml
						var head = response.substring(0,response.indexOf('<body>'))+'</html>';
						var body = response.substring(response.indexOf('<body>')+6,response.indexOf('<script type="text/backbase-xml'));
						var xmp = '';

						if (response.indexOf('<script type="text/backbase-xml">') !== -1){
							xmp = response.substring(response.indexOf('<script type="text/backbase-xml">')+33, response.indexOf('</script>', response.indexOf('<script type="text/backbase-xml">')+33));
						};

						var resourceCallback = function() {
							var htmlNode = b$._private.htmlAPI.createElementFromString(body);
							var modelXml = b$._private.xml.parse(xmp);

							// set to 0 when IE 8 or lower
							var htmlArea = 0;
							var order = 0;
							var Nav = navigator.userAgent.toLowerCase();
							if (!(Nav.indexOf('msie') != -1) && parseInt(Nav.split('msie')[1]) > 9) {
								htmlArea = b$._private.xml.textContent(b$.ua.querySelector(modelXml, 'property[name=area] value')) || 0;
								order = b$._private.xml.textContent(b$.ua.querySelector(modelXml, 'property[name=order] value')) || 0;
							};

							var targetArea = that.htmlAreas[htmlArea];
							var bAppend = true;
							var before = null;

							for (var j = 0; j < targetArea.childNodes.length; j++) {
								// check if html already has been appended
								if (targetArea.childNodes[j].getAttribute('data-pid') == htmlNode.getAttribute('data-pid')) {
									bAppend = false;
									break;
								} else {
									if (targetArea.childNodes[j].viewController) {
										// check if there already is an item with a higher order pref
										if (order < targetArea.childNodes[j].viewController.getPreference('order')) {
											before = targetArea.childNodes[j];
										}
									}
									else {
										before = targetArea.childNodes[j];
									}
								};
							};

							if (bAppend) {
								if (before) {
									targetArea.insertBefore(htmlNode, before);
								} else {
									targetArea.appendChild(htmlNode);
								};
							};

							// import model into model bdom
							var bres = b$.portal.importPortalModel(modelXml, b$.portal.portalModel, that.model, htmlNode);
							if (callback) callback(htmlNode.viewController);
						};

						// get resources from html
						var headXML = b$._private.xml.parse(head);
						b$.portal._private.definition.getResourcesFromDefinition(headXML, '', resourceCallback);

					};

					// load item and its children
					b$.portal.portalServer.loadItemHTML(aChildren[i], loadItemHTMLCallback, null, true, -1, null);

				};
			},

			/**
			 * Returns value of the specified preference from the model.
			 * @param {String} name name of the preference node
			 * @return {String} value of the preference node
			 */
			getPreference: function (name) {
				if(this.model)			// XP1001 ... oh oh what am I doing here?!
				return this.model.getPreference(name);
				return this.getAttribute(name);
			},

			/**
			 * Sets a preference on the model with the specified name and value.
			 * @param {String} name name of the preference node
			 * @param {String} value of the preference node
			 */
			setPreference: function (name, value) {
				return this.model.setPreference(name, value);
			},
			//add this method for backwards compatibility
			isPreference: function(name) {
				var p = this.getPreference(name);
				return p != null && p != '';
			},


			getAreaPreference: function () {
				if(this.area === undefined) {
					if(this.model) {
						var v = parseInt(this.model.getPreference('area'),10);
						if(isNaN(v))v=0;
					}
					else {
						var v = parseInt(this.getAttribute('area'),10);
						if(isNaN(v))v=0;
					}
					return v;
				}
				else return this.area;
			},
			getOrderPreference: function () {
				if(this.order === undefined) {
					if(this.model) {
						var v = parseInt(this.model.getPreference('order'),10);
						if(isNaN(v))v=0;
					}
					else {
						var v = parseInt(this.getAttribute('order'),10);
						if(isNaN(v))v=0;
					}
					return v;
				}
				else return this.order;
			},


			m_dragEnter: function (event, dm) {
				var secProfile = sProfile[this.model.securityProfile];
				if (secProfile < sProfile['CONTRIBUTOR']){
					return false;
				}
				var x = event.clientX;
				var y = event.clientY;

				this.appendChild(this.ownerDocument.dragIndicator);

			},
			m_dragOut: function (event, dm) {
				var secProfile = sProfile[this.model.securityProfile];
				if (secProfile < sProfile['CONTRIBUTOR']){
					return false;
				}
				var x = event.clientX;
				var y = event.clientY;

				var html = this.ownerDocument.dragIndicator.getDisplay();

				if (html) {
					html.parentNode.removeChild(html);
					this.removeChild(this.ownerDocument.dragIndicator);
				};

				delete this.tmp_lastTargetAreaId;
				var aChildren = this.childNodes;
				for(var i=0;i<aChildren.length;i++) {
					aChildren[i].tmp_order = aChildren[i].order;	// Remmber it so we can use it on drop.s..
					delete aChildren[i].area;
					delete aChildren[i].order;
				}
				this.reflow();
			},



			m_dragMove: function (event, dm) {
				var secProfile = sProfile[this.model.securityProfile];
				if (secProfile < sProfile['CONTRIBUTOR']){
					return false;
				}
				var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.body.parentNode.scrollTop ? document.body.parentNode.scrollTop : 0;
				var scrollLeft = document.body.scrollLeft ? document.body.scrollLeft : document.body.parentNode.scrollLeft ? document.body.parentNode.scrollLeft : 0;
				var x = event.clientX + scrollLeft;
				var y = event.clientY + scrollTop;

				var htmlAreas = this.getDisplay('area', true);
				if(!htmlAreas.length)
					htmlAreas = htmlAPI.findCaptureClass('bp-area', this.htmlNode);


				var targetAreaId = null;

				var closestTargetAreaId = null;
				var dt = Infinity;

				var s = '';
				for(var i=0;i<htmlAreas.length;i++) {
					var oCoord = htmlAPI.getBoxObject(htmlAreas[i], 'border');
					if(isInside(x, y, oCoord.x, oCoord.y, oCoord.w, oCoord.h)) {
						targetAreaId = i;
						break;
					}
					var d = Math.abs((oCoord.x + oCoord.w/2) - x) + Math.abs((oCoord.y + oCoord.h/2) - y);
 					if (d < dt){
						dt = d;
						closestTargetAreaId = i;
					}

				}
				if(targetAreaId == null) {
					if(this.tmp_lastTargetAreaId) targetAreaId = this.tmp_lastTargetAreaId;
					else if(closestTargetAreaId == null) targetAreaId = 0;
					else targetAreaId = closestTargetAreaId;
				}
				this.tmp_lastTargetAreaId = targetAreaId;

				var dragComponent = null;
				var aBEList = dm.dataTransfer.getData('x-bb-nodelist');
				if(aBEList && aBEList[0]) dragComponent = aBEList[0];


				var target = htmlAreas[targetAreaId];

				dm.__tmpArea = targetAreaId;
				dm.__tmpOrder = 0;
				this.ownerDocument.dragIndicator.area = targetAreaId;


				var areas = this.getAreaOrderedChildren();
				var aChildren = areas[targetAreaId];
				var bFound = false;

				if (aChildren) {
					for(var i=0;i<aChildren.length;i++) {
						if(aChildren[i] != this.ownerDocument.dragIndicator) {
							if(!bFound) {
								var oCoord = htmlAPI.getBoxObject(aChildren[i].htmlNode, 'border');
								if(
									(this.layout.dir.direction == 'horizontal' && x<oCoord.x + (oCoord.w/2)) ||
									(this.layout.dir.direction == 'vertical' && y<oCoord.y + (oCoord.h/2))){
									bFound = true;
									this.ownerDocument.dragIndicator.order = dm.__tmpOrder;

									var htmlDrag = this.ownerDocument.dragIndicator.getDisplay();
									var kid = aChildren[i].getDisplay();
									kid.parentNode.insertBefore(htmlDrag,kid);
									dm.__tmpOrder++;
									if(dragComponent == aChildren[i].model){
										htmlDrag.display = 'none';
									}
									else
										htmlDrag.display = 'block';
								}
							}
							aChildren[i].order = dm.__tmpOrder;
							dm.__tmpOrder++;
						}
					}
				}

				if(!bFound) {
					this.ownerDocument.dragIndicator.order = dm.__tmpOrder;
					if(!htmlAreas[targetAreaId]){
						console.log('____________________________________________',this)
					}
					htmlAreas[targetAreaId].appendChild(this.ownerDocument.dragIndicator.getDisplay());
				}


				var dragIndicator = this.ownerDocument.dragIndicator;
				var dragComponent;
				var nodeList = dm.dataTransfer.getData('x-bb-nodelist');
				if(nodeList)dragComponent = nodeList[0];
				dragIndicator.getDisplay().style.display = 'block';


                if (!dm.dragOptions.htmlNode.catalogItemJson) {
                    if(dragComponent.parentNode == dragIndicator.parentNode) {

                        if (dragComponent.getAreaPreference() == dragIndicator.area) {

                            if(dragComponent.order+1 == dragIndicator.order || dragComponent.order-1 == dragIndicator.order ) {
                                dragIndicator.getDisplay().style.display = 'none';
                            }
                        }
                    }
                }

				this.reflow();
				return;
			},


			m_dragDrop: function (event, dm, origin) {
				var target = this;
				if (securityProfileIsLessThan('CONTRIBUTOR')) { return false; }

				if (!origin.isCatalog && target !== origin.parentNode) {
					origin.parentNode.childNodes.forEach(function (child) {
						if (child !== origin) {
							child.model.setPreference('order', child.tmp_order);
							child.model.save();
						}
					});
				}

				target.childNodes.forEach(function (child) {
					// potential problem when origin.isCatalog
					if (child !== origin && child.tmp_order) {
						var preference = createPreference('order', parseFloat(child.tmp_order), 'double');
						child.model.setPreferenceNode(preference);
						child.model.save();
					}
				});

				if (origin.isCatalog && dm.dragOptions.htmlNode && dm.dragOptions.htmlNode.catalogItemJson) {
					var catalogItemJson = dm.dragOptions.htmlNode.catalogItemJson;
					var enterpriseCatalogItemName = catalogItemJson.extendedItemName;
					var currentPage = b$.portal.portalView.getElementsByTagName('page').pop();
					var saveAllPreferences = false;
					var bdom = clone(catalogItemJson);
					bdom.parentItemName = target.model.name;
					setPreference(bdom, 'area', target.ownerDocument.dragIndicator.area + '', 'string');
					setPreference(bdom, 'order', target.ownerDocument.dragIndicator.order + '', 'double');

					// We need to do this to avoid horizontal inheritance links, meaning that
					// something in the portal catalog should not inherit from something
					// else in its same catalog but from something in the parent enterprise catalog
					// Master pages are in the portal catalog therefore this is needed
					if (currentPage.pageType === 'master') {
						bdom.extendedItemName = enterpriseCatalogItemName;
						saveAllPreferences = true;
					}

					bdom.save(function () {
						// html is just appended... the view mashup will re-add it to the dom in correct location.
						if(!bdom.contextItemName) {
							// Virtual Node
							target.model.appendChild(bdom);
						} else {
							refreshHTML(bdom, target.htmlNode, function (bres) {
								var parentView, bresView;
								target.model.appendChild(bres);
								parentView = target.ownerDocument.all[b$.portal.portalReflector.getID(target.model)];
								bresView = target.ownerDocument.all[b$.portal.portalReflector.getID(bres)];
								parentView.insertDisplayChild(bresView);
							});
						}
					}, function () {}, saveAllPreferences);
				} else {
					origin.model.setPreference('area', target.ownerDocument.dragIndicator.area.toString());
					setPreference(origin.model, 'order', target.ownerDocument.dragIndicator.order + '', 'double');
					origin.model.parentItemName = target.model.name;
					target.model.appendChild(origin.model);
					origin.model.save();
				}

				if (origin.parentNode) { origin.parentNode.reflow(); }
				target.reflow();

				function createPreference(name, value, type) {
					var preference = target.model.ownerDocument.createPreference(name, type);
					preference.value = value;
					return preference;
				}

				function setPreference(bdom, name, value, type) {
					if (bdom.getPreferenceNode(name)) {
						bdom.setPreference(name, value);
					} else {
						var preference = createPreference(name, value, type);
						bdom.setPreferenceNode(preference);
					}
				}

				function securityProfileIsLessThan(profile) {
					return sProfile[target.model.securityProfile] < sProfile[profile];
				}

				function clone(jsonData) {
					var newElement = target.model.createExtendedElementFromJSON(jsonData);
					if (jsonData.children) {
						jsonData.children.forEach(function (child) {
							newElement.appendChild(extend(child), true);
						});
					}
					return newElement;
				}
			},

			/*
			 * Filters preferences based on viewHint
			 * If viewHint contains a userRole name, it means that it should be hidden for this userRole and all roles below it
			 * By default preference is hidden
			 *
			 * @param {Array} preferences
			 * @return {Array} filteredPreferences filtered list of preferences
			 * @private

			filterPreferences: function(aPreferences){
				var i, l, oField, aFilteredPreferences = [],
					userRole = b$.portal.loggedInUserRole || 'user',
					designMode = window.bd && bd.designMode === 'true', // TODO get rid of bd dependency ?
					roleScale = [
						'admin',
						'manager',
						'user',
						'none'
					],
					hidePreference = function(sViewHint){
						var aViewHints = sViewHint ? sViewHint.split(/,/) : [], i,
							designModeOnly = false,
							hideForRole = true;
						for (i = aViewHints.length - 1; i >= 0; i--){
							designModeOnly = designModeOnly || aViewHints[i] === 'designModeOnly';
							if (roleScale.indexOf(aViewHints[i]) !== -1){
								hideForRole = roleScale.indexOf(aViewHints[i]) < roleScale.indexOf(userRole);
							}
						}
						if (designModeOnly && !designMode){
							return true;
						}
						return hideForRole; //TODO show all preferences to admin?
					};
				for (i = 0, l = aPreferences.length; i < l; i++) {
					if (hidePreference(aPreferences[i].viewHint)) {
						continue;
					}
					oField = aPreferences[i];
					aFilteredPreferences.push(oField);
				}
				return aFilteredPreferences;
			},

			 */




			/**
			 * @param {b$.view.perspective.PerspectiveType} perspectiveType
			 *     The type of the perspective to create.
			 * @param {b$.view.perspective.PerspectiveParameters} parameters
			 *     The perspective parameters.
			 * @return {b$.view.perspective.Perspective}
			 *     The perspective instance.
			 */
			createPerspective: function(oPerspectiveType, oParameters) {
				return new Perspective(new SimpleURITemplate("/", "page"), oPerspectiveType, oParameters);
			},

			/*
			 * Finds a URITemplate for a specific perspective type.
			 * @param {b$.view.perspective.PerspectiveType} perspectiveType
			 *     The type of the prespective to create.
			 * @param {b$.view.perspective.PerspectiveParameters} parameters
			 *     The perspective parameters.
			 * @return {b$.view.perspective.Perspective}
			 *     The perspective instance.
			 * @private
			 */


			/**
			 * Returns the current perspective.
			 * @return {b$.view.perspective.Perspective} The current perspective.
			 */
			getCurrentPerspective: function() {
				return this.perspective;
			},
			/**
			 * Sets the current perspective.
			 * @param {Object} perspective The perspective to set of type b$.view.perspective.Perspective
			 */
			setCurrentPerspective: function(oPerspective) {
				this.perspective = oPerspective;
			},

			addHandlers: function(oHandlers) {
				for (var h in oHandlers){
					if (oHandlers.hasOwnProperty(h)) {
						this.addEventListener(h, oHandlers[h]);
					}
				}
			},
			removeHandlers: function(oHandlers) {
				for (var h in oHandlers){
					if (oHandlers.hasOwnProperty(h)) {
						this.removeEventListener(h, oHandlers[h]);
					}
				}
			},

			/**
			 * Retrieves config and mix it into layout
			 * @private
			 */
			processConfig: function() {
				try {
					var sConfig = this.getPreference('config');
					if (sConfig) {
						var config = JSON.parse(sConfig);
						b$.mixin(this, config);
					}
				} catch (e) {
					console.log('Error parsing config: ' + e);
				}
			},

			/**
			 * Stores changed values of configuration back to preferences
			 * @private
			 */
			persistConfig: function(){
				try {
					var sConfig = this.getPreference('config');
					var config = JSON.parse(sConfig);

					for (var i in config){
						if (config[i] !== this[i]){
							config[i] = this[i];
						}
					}

					sConfig = JSON.stringify(config);
					this.setPreference('config', sConfig);
					this.model.save();
				} catch (e){
					console.log('Error persisting config: ' + e);
				}
			},

			/**
			 * Adds new property to configuration, so it will be persisted during saving
			 * @param {String} property name
			 * @param {String|Object|Array} value
			 * @private
			 */
			addToConfig: function(attr, val){
				try {
					var sConfig = this.getPreference('config');
					var config = JSON.parse(sConfig);
					config[attr] = val;
					sConfig = JSON.stringify(config);
					this.setPreference('config', sConfig);
					this.model.save();
				} catch (e){
					console.log('Error adding preference to config: ' + e);
				}
			},

			/**
			 * Removes property from config
			 * @param {String} property name
			 * @private
			 */
			removeFromConfig: function(attr){
				try {
					var sConfig = this.getPreference('config');
					var config = JSON.parse(sConfig);
					delete config[attr];
					sConfig = JSON.stringify(config);
					this.setPreference('config', sConfig);
					this.model.save();
				} catch (e){
					console.log('Error removing preference from config: ' + e);
				}
			}
		});
	this.portalViewElement = PortalViewElement;



	//  ----------------------------------------------------------------
	//  Backcompat
	//  ----------------------------------------------------------------

	function OrderSort(a, b) {
		a = parseInt(a.getOrderPreference()) || 0;
		b = parseInt(b.getOrderPreference()) || 0;
		return a - b;
	};

	function isInside (tx,ty,x,y,w,h) {
//		console.log(x>=x2 , x<=x2+w , y>=y2 , y<=y2+h)
		if(tx>=x && tx<=x+w && ty>=y && ty<=y+h )
			return true;
		return false;
	}



	var layouts = b$.view.bdom.layout;

//  ----------------------------------------------------------------

	/**
	 * @extends backbase.com.2013.portalView.portalViewElement
	 * @class backbase.com.2013.portalView.application
	 */
	var Application = PortalViewElement.extend(function (bdomDocument, node) {
//  ----------------------------------------------------------------
			PortalViewElement.apply(this, arguments);
			this.layout = new layouts.NoLayout(this);
		}, {
			localName: 'application',
			renderDisplay: function () {
				return this.htmlNode;
			}
		});

//  ----------------------------------------------------------------
	/**
	 * @extends backbase.com.2013.portalView.portalViewElement
	 * @class backbase.com.2013.portalView.application
	 */
	var Portal = PortalViewElement.extend(function (bdomDocument, node) {
//  ----------------------------------------------------------------
			PortalViewElement.apply(this, arguments);
			// Where should this be?
			this.perspective = this.createPerspective(new PerspectiveType("Dashboard"), new PerspectiveParameters());
			this.addEventListener('PerspectiveModified', function(oEvent){
				this.setCurrentPerspective(this.createPerspective(new PerspectiveType(oEvent.newValue), new PerspectiveParameters()));
			}, false, this);
		}, {
			localName: 'portal',
			injectDisplaySelf: function(){

			},
			insertDisplayChild: function (bdom) {
                if(!(bdom.model && bdom.model._ssr)){
					// htmlNode is set by renderer.. no time to change flow right now... use hack.
                	b$._private.ssrRootElement.appendChild(bdom.htmlNode);
                }
			},
            attachHTMLChildren: function () {
                // fix for catalog attachment
                var kids = this.childNodes;
                for(var i=0;i<kids.length;i++) {
                    var elm = kids[i].getHTMLNode();
                    if(!elm.parentNode || elm.parentNode.nodeType != 1)
                        document.body.appendChild(elm);

                }
            },
            showDesignTools: function () {
            },
			hideDesignTools: function () {
			}

		},{
			template:function(json){
				return '<div class="'+this.cls+' '+this.cls+'--area"></div>';
			}
		});


//  ----------------------------------------------------------------
	/**
	 * @extends backbase.com.2013.portalView.portalViewElement
	 * @class backbase.com.2013.portalView.page
	 */
	var Page = PortalViewElement.extend(function (bdomDocument, node) {
//  ----------------------------------------------------------------
			PortalViewElement.apply(this, arguments);

			this.layout = new layouts.NoLayout(this);
			this.isPossibleDragTarget = true;
		}, {
			localName: 'page',
			pageType: undefined,
			createDisplay: function () {
				if (!this.htmlNode) {
					this.htmlNode = this.renderDisplay(this.getDisplayModel());
				};
				if (!this.htmlAreas) {
					this.htmlAreas = this.getDisplay('area', true);
				};
				this.htmlNode.viewController = this;

				// old templates not useing the --area
				if(!this.htmlAreas || this.htmlAreas.length <= 0) {
					this.htmlAreas = [];
					var area = htmlAPI.findCaptureClass('bp-area', this.htmlNode);	// bad...
					if(area[0]) {
						htmlAPI.addClass(area[0], '--area');
						this.htmlAreas.push(area[0]);
					}
				}

				// if manageable == true this is the masterpage.
				if (this.model.manageable) {
					this.pageType = 'master';
				} else if (this.model.extendedItemName == '') {
					this.pageType = 'normal';
				} else {
					this.pageType = 'inherited';
				};
			},
			readyHTML : function () {
				PortalViewElement.prototype.readyHTML.call(this);
			},
			showDesignTools: function () {
			},
			hideDesignTools: function () {
			}
		},{
			template: function(json){
				return '<div class="'+this.cls+'"><div class="'+this.cls+'--area"></div></div>';
			}
		});


	/**
	 * @extends backbase.com.2013.portalView.portalViewElement
	 * @class backbase.com.2013.portalView.dragIndicator
	 */
	var dragIndicator = PortalViewElement.extend(function (bdomDocument, node) {
			PortalViewElement.apply(this, arguments);
			this.layout = new layouts.AutoLayout(this);
			this.isPossibleDragTarget = false;
			this.flex = 1;
			this.area = 0;
			this.order = 0;
		}, {
			localName: 'dragIndicator',
			setHTMLWidthHeight: function(width, height) {
				var elm = this.htmlNode;
				htmlAPI.setWidthHeightPB(elm, width, height);
				htmlAPI.setWidthHeightPB(elm.firstChild, width-htmlAPI.getPadding(elm)-htmlAPI.getBorder(elm), height-htmlAPI.getPadding(elm,'tb')-htmlAPI.getBorder(elm,'tb'));

			},
			renderDisplay: function (elm) {
				if (!elm) {
					elm = document.createElement('div');
					elm.className = 'bp-drag-indicator';
					elm.innerHTML = '<div class="bp-drag-indicator-in"><span class="bp-drag-text"></span></div>';
				}
				return elm;
			},
			getAreaPreference: function () {
				return this.area;
			},
			getOrderPreference: function () {
				return this.order;
			},
			setAreaPreference: function (v) {
				this.area = v;
			},
			setOrderPreference: function (v) {
				this.order = v;
			}
		});

});

/*
 *	----------------------------------------------------------------
 *	Copyright Backbase b.v. 2003/2013
 *	All rights reserved.
 *	----------------------------------------------------------------
 *	Version 5.5
 *	Author : Backbase R&D - Amsterdam - New York
 *	----------------------------------------------------------------
 */

b$.module("b$.portal.view.bdom.container", function() {
	var PortalViewElement = b$.bdom.getNamespace('http://backbase.com/2013/portalView').getClass('portalViewElement');
	var layouts = b$.view.bdom.layout;

	/**
	 * @extends backbase.com.2013.portalView.portalViewElement
	 * @class backbase.com.2013.portalView.container
	 */
	var Container = PortalViewElement.extend(function (bdomDocument, node) {
			PortalViewElement.apply(this, arguments);

			this.layout = new layouts.NoLayout(this);
			/**
			 * @event dragStart
			 * Fired when user starts dragging the container.
			 */
			/**
			 * @event dragEnter
			 * Fired when dragged object enters the container.
			 */
			/**
			 * @event drag
			 * Fired when user is dragging object over container.
			 */
			/**
			 * @event dragLeave
			 * Fired when dragged object leaves the container.
			 */
			/**
			 * @event dragDrop
			 * Fired when user drops object on the container.
			 */
		}, {
			localName: 'container',
			createDisplay: function() {
				if (!this.htmlNode) {
					this.htmlNode = this.renderDisplay(this.getDisplayModel());
				};
				if (!this.htmlAreas) {
					this.htmlAreas = this.getDisplay('area', true);
				};
				this.htmlNode.viewController = this;
			},
			constrainProportions: function(props, segments){
				var total = 0, factor, i, newProps;
				newProps = props.concat(new Array(segments)).splice(0, segments); // align array length
				for (i = 0; i < segments; i++){
					newProps[i] = Math.round((newProps[i] || 0) * 100) / 100;
					total += newProps[i];
				}
				if (total === 0){
					for (i = 0; i < segments; i++){
						newProps[i] = Math.round(100 / segments * 100) / 100;
					}
				} else if (total !== 100){
					factor = total / 100;
					for (i = 0; i < segments; i++){
						newProps[i] = newProps[i] / factor;
					}
				}
				return newProps;
			}
		},{
			template: function() {
				return '<div class="bp-container"><div class="bp-area"></div></div>';
			}
		});
});
/*
 *	----------------------------------------------------------------
 *	Copyright Backbase b.v. 2003/2012
 *	All rights reserved.
 *	----------------------------------------------------------------
 *	Version 5.5
 *	Author : Backbase R&D - Amsterdam - New York
 *	----------------------------------------------------------------
 */



b$.module("b$.portal.view.bdom.widget", function() {

	var scope = function(){return this}();

	var PerspectiveType = b$.view.perspective.PerspectiveType;
	var PerspectiveParameters = b$.view.perspective.PerspectiveParameters;
	var Perspective = b$.view.perspective.Perspective;
	var SimpleURITemplate = b$._private.template.SimpleURITemplate;
	var htmlAPI = b$._private.htmlAPI;
	var simpleResponseCache_getData = b$._private.simpleResponseCache_getData;

	var NS = b$.bdom.getNamespace('http://backbase.com/2013/portalView');
	var PortalViewElement = NS.getClass('portalViewElement');

//	var PreferencesView = b$.view.preferences;

	/**
	 * @extends backbase.com.2013.portalView.portalViewElement
	 * @class backbase.com.2013.portalView.widget
	 */
	var Widget = PortalViewElement.extend(function (bdomDocument, node) {
		PortalViewElement.apply(this, arguments);
		this.id = "none";
		this.flex = 1;
		/**
		 * @event dragStart
		 * Fired when user starts dragging the widget.
		 */
		}, {
			/**
			 * @property localName
			 * Returns the local part of the qualified name of this node.
			 */
			localName: 'widget',
			createDisplay: function() {
				this.htmlNode = this.renderDisplay();
				if(this.htmlNode)this.htmlNode.viewController = this;

				return this.htmlNode;
			},
			renderDisplay: function () {
				var oDocument = document;

				if (!this.htmlNode) {
					this.htmlNode = b$.portal.view.loadChrome(this, oDocument);
				}
				this.bindChromeHandlers();

				this.htmlAreas = [];
				this.htmlAreas[0] = htmlAPI.cssSelector('.bp-widget-body', this.htmlNode)[0];

				return this.htmlNode;
			},
			setHTMLWidthHeight: function(width, height) {
				var elm = this.htmlNode;
//				if (width !== undefined && height !== undefined) {
//					htmlAPI.setWidthHeight(elm, width, height);
//				}
//				else
				if (width !== undefined) {
					htmlAPI.setWidth(elm, width);
				}
				if (height !== undefined) {
					htmlAPI.setHeight(elm, height);
					htmlAPI.setHeightPB(this.htmlAreas[0], height-this.htmlHead.offsetHeight-this.htmlFoot.offsetHeight);
				}
			},
			DOMReady: function () {
				var This = this;
				//add id property for backwards compatibility with older portal client

				if(this.ownerDocument.defaultDragHandlers)
					this.addHandlers(this.ownerDocument.defaultDragHandlers);



				// Highly illegal!!! should be removed!!!
				this.id = this.model.name;		// 20120926 DO WE STILL REQUIRE THIS??



				//jQuery(this.htmlNode).addClass('bp-borderLayout-border');
				//htmlAPI.addClass(this.htmlNode, 'bp-borderLayout-border');


//              This.model.addEventListener('PrefDeleted', function (ev) {
//                    console.log('PrefDeleted');
//					This.model.save();
//				}, false, This);

				if(This.model) { // XP1001  SNAFU!

					This.model.addEventListener('PrefModified', function (ev) {

						if (ev.target === This.model) {
	//						if (ev.attrName === 'test') {
	//							console.log('Set Preference from ' + This.model.getPreference('src') + ' captured at gadget');
	//						} else
							// Removing this because I think refreshHTML is to obtrusive EL:20130404
							// else if(ev.attrName === 'widgetChrome') {
							// 	This.model.save(function() {
							// 		This.refreshHTML();
							// 	});
							// }

							var pref = ev.relatedNode;
							if (pref) {
	//							console.log('dispatchCustomEvent change WHAT TO DO HERE???????????'+pref)
	//							console.dir(pref)
	//							pref.dispatchCustomEvent('change', false, false, {'prevValue':ev.prevValue, 'newValue':ev.newValue});

	//							var oEvent = this.ownerDocument.createEvent('MutationEvent');
	//							oEvent.initMutationEvent('change', true, false, pref, ev.prevValue, ev.newValue, pref.name, MutationEvent.MODIFICATION);
	//							pref.dispatchEvent(oEvent, false);

								var oEvent = this.ownerDocument.createEvent('UIEvent');
								oEvent.initUIEvent('change', true, false, window, null);
								pref.dispatchEvent(oEvent, false);

							}
						}
					}, false, This);

					This.model.addEventListener('PrefFallback', function (ev) {
						if (ev.target === This.model) {
							This.refreshHTML();
						}
					}, false, This);


					this.addEventListener('PerspectiveModified', function (ev) {
						if(ev.target.model === this.model && (ev.newValue === 'Maximized' || ev.newValue === 'Widget')) {
							var oEvent = this.ownerDocument.createEvent('MutationEvent');
							oEvent.initMutationEvent(ev.newValue === 'Maximized' ? 'maximize' : 'restore', true, false, this, null, null, null, null);
							this.model.dispatchEvent(oEvent, true);
						}
	//					this.fireEvent('askPerspective', true, true, {context: this, perspective: ev.newValue});
					}, false, this);

				}

			},
			bindChromeHandlers: function() {
				var This = this;
				htmlAPI.bindEvent(this.htmlNode, 'click', function (ev){
					var target = ev.target;
					var action;
					var oPreferenceContainer = htmlAPI.cssSelector('.bp-widget-pref', this)[0];

					while(true) {
						action = target.getAttribute('data-action');

						if(action) {
							switch (action) {
								case 'widget-preferences':
//									if (This.local_listeners && This.local_listeners['preferences-form']){



										This.dispatchCustomEvent('preferences-form', true, true, {context: This});
//									} else {
//
//										if (This.bPrefContainer) {	// toggle
//											This.bPrefContainer = false;
////										oPreferenceContainer.style.display = 'none';
//											jQuery(oPreferenceContainer).animate({
//												opacity: 0
//											}, 200, 'swing', function() {
//												oPreferenceContainer.style.display = 'none';
//											})
//
//										} else {
//											This.bPrefContainer = true;
//											oPreferenceContainer.style.display = 'block';
//											jQuery(oPreferenceContainer).css({opacity: 0});
//											jQuery(oPreferenceContainer).animate({
//												opacity: 1
//											}, 200, 'swing', function() {
////											oPreferenceContainer.style.display = 'none';
//											})
//											oPreferenceContainer.innerHTML = '';
////										htmlAPI.setTopLeft(oPreferenceContainer, htmlAPI.getBoxObject(This.htmlNode).top + 23, htmlAPI.getBoxObject(This.htmlNode).left + 5);
//
//											var preferencesField = target.getAttribute('data-fields') || 'b$.view.preferences.UserPreferenceField';
//											var PreferencesFieldClass = b$.require(preferencesField);
//
//											var preferencesForm = target.getAttribute('data-form') || 'b$.view.preferences.UserPreferencesForm';
//											var PreferencesFormClass = b$.require(preferencesForm);
//
//											var aFields = [], aPreferences = This.model.getJSON().preferences;
//											for (var i = 0, l = aPreferences.length; i < l; i++) {
//												var oField = new PreferencesFieldClass(aPreferences[i]);
//												aFields.push(oField);
//											}
//
//											var widgetPreferences = new PreferencesFormClass(This.model, aFields, document);
//
//											var preferencesAnim = target.getAttribute('data-anim');
//											if (preferencesAnim) {
//												var animator = b$.require(preferencesAnim);
//												animator.show(This.htmlNode, widgetPreferences);
//											} else {
//												oPreferenceContainer.appendChild(widgetPreferences.getHTML());
//												widgetPreferences.addObserver('close', function() {
//													oPreferenceContainer.style.display = 'none';
//												});
//											}
//										}
//									}

									break;
								case 'widget-maximize':
									This.setPerspective('Maximized');
									break;
/*
									console.log('Definition');
									console.dir(This.myDefinition);
									console.log('View');
									console.dir(This);
									console.log('Model');
									console.dir(This.model);
*/

//									var oEvent = This.ownerDocument.createEvent('CustomEvent');
//									oEvent.initCustomEvent('', false, false, {});
//									this.dispatchEvent(oEvent);

									break;
								case 'widget-restore':
									This.setPerspective('Widget');
									target.setAttribute('data-action', 'widget-minimize');
									break;
								case 'widget-minimize':
									This.setPerspective('Minimized');
									target.setAttribute('data-action', 'widget-restore');
									break;
								case 'widget-refresh':
									This.refreshHTML();
									break;
								case 'widget-close':
									This.model.destroyAndSave();
									break;
								case 'pref-ok':
									var form = htmlAPI.cssSelector('form', oPreferenceContainer)[0];
									for (var i=0;i<form.elements.length;i++){
										var elm = form.elements[i];
										if(elm.type === 'text') {
											if(elm.value !== This.model.getPreference(elm.name)){
												console.log(elm.name, elm.value);
												This.model.setPreference(elm.name, elm.value);
											}
										}
										else if (elm.type === 'checkbox'){
											if(elm.checked !== This.model.getPreference(elm.name)){
												console.log(elm.name, elm.checked);
												This.model.setPreference(elm.name, elm.checked);
											}
										}
									}
									This.model.save();
									oPreferenceContainer.style.display = 'none';
									break;
								case 'pref-cancel':

									oPreferenceContainer.style.display = 'none';
									break;
							}
							// removing the return false to let the normal event delegation take effect EL 20130704
							// return false;
						}

						if (target==ev.currentTarget )
                            break;
						target = target.parentNode;
                        if (!target)
                            break;
					}
				});
			},
			setTitle: function(sTitle){
				this.model.setPreference('title', sTitle);
				this.model.save();
			},
			getDefinition: function(){
				return {};
			},
			setPerspective: function(sPerspectiveType){
				if (sPerspectiveType !== this.perspective.getType().getName()) {
					this.perspective = new Perspective(new SimpleURITemplate(this.getDefinition().sUrl || this.sSrc, "page"), new PerspectiveType(sPerspectiveType), new PerspectiveParameters());
					var oEvent = this.ownerDocument.createEvent('MutationEvent');
					oEvent.initMutationEvent('PerspectiveModified', true, false, this, this.perspective, sPerspectiveType, null, null);
					this.dispatchEvent(oEvent);
				}
			},
			getContextVariableValue: function(sName) {
				var oParameter = this.perspective.getParameters().getByName(sName);
				return oParameter && oParameter.getValue() || "";
			}
// G:20120924
//			getContextPreferenceValue: function(sName) {
//				return this.getPreference(sName);
//			},
// G:20120924
//			getContextDocument: function(){
//				return this.htmlNode.ownerDocument;
//			}


		});

	this.Widget = Widget;



//	if (!b$.portal.templates) b$.portal.templates = {};
//	if (!b$.portal.templates.chrome) b$.portal.templates.chrome = {};
//	if (!b$.portal.templates.prefpane) b$.portal.templates.prefpane = {};
//	var chrome = b$.portal.templates.chrome;
//	var prefpane = b$.portal.templates.prefpane;
//  chrome['none'] = '<div class="bp-widget Xbp-ui-dragRoot Xbp-ui-dragGrip">' +
	defaultChrome = '<div class="bp-widget Xbp-ui-dragRoot Xbp-ui-dragGrip">' +
							'<div class="bp-widget-head">' +
							'</div>' +
							'<div class="bp-widget-pref"></div>' +
							'<div class="bp-widget-body"></div>' +
							'<div class="bp-widget-foot"></div>' +
						'</div>';


//	prefpane['default2'] = '<div class="bp-widget-pref-body"><form><table class="bp-pref-table"><tbody>{{#preferences}}<tr><td class="bp-pref-td">{{name}}</td><td class="bp-pref-td"><input class="bp-pref-text" type="text" name="{{name}}" value="{{value}}"/></td></tr>{{/preferences}}</tbody></table><button data-action="pref-ok">apply</button><button data-action="pref-save">save</button></form></div>';


var htmlAPI = b$._private.htmlAPI;


b$.portal.view.loadChrome = function(bdom,oDocument) {
	var sProfile = {
		'ADMIN' : 0,
		'CREATOR' : -1,
		'COLLABORATOR' : -2,
		'CONTRIBUTOR': -3,
		'CONSUMER' : -4
		};

	var model = bdom.model;

//	var oData = model.getJSON();
	var oData = {};
	if(model)
		oData = model.getJSON();


//	var widgetChrome = model.getPreference("widgetChrome");
	var widgetChrome = bdom.getAttribute("widgetChrome");

	if(widgetChrome) {
//		widgetChrome = widgetChrome.replace('$(contextRoot)',window.b$.portal.config.serverRoot);
//		widgetChrome = widgetChrome.replace('$(contextRoot)',model.ownerDocument.serverURL);
		widgetChrome = widgetChrome.replace('$(contextRoot)',b$.portal.portalModel.serverURL);

//		oData.widgetTitle = model.getPreference("title");
		oData.widgetTitle =  bdom.getAttribute("title");
		var chromeTmpl = simpleResponseCache_getData(widgetChrome);
	}
	else {
//		var chromeTmpl = b$.portal.templates.chrome['none'];
		var chromeTmpl = defaultChrome;

	}
	//server side rendering : /foundation/presentation/src/main/java/com/backbase/portal/foundation/presentation/renderer/BaseWidgetTag.java
	if(model) {
		var secProfile = sProfile[model.securityProfile];
		oData.showEdit = secProfile >= sProfile['CONTRIBUTOR'];
		oData.showDelete = secProfile >= sProfile['CREATOR'];
		oData.enableDND = secProfile >= sProfile['CONTRIBUTOR'];
		oData.showMaximize = true;//secProfile >= sProfile['CONTRIBUTOR'];
	}

	var chromeHTML = htmlAPI.createElementFromString(Mustache.to_html(chromeTmpl, oData), oDocument);
	return chromeHTML;
};

});/*
 *	----------------------------------------------------------------
 *	Copyright Backbase b.v. 2003/2012
 *	All rights reserved.
 *	----------------------------------------------------------------
 *	Version 5.5
 *	Author : Backbase R&D - Amsterdam - New York
 *	----------------------------------------------------------------
 */

b$.module("b$.portal.view.bdom.widget.backbase", function() {

	var NS = b$.bdom.getNamespace('http://backbase.com/2013/portalView');
	var Widget = NS.getClass('widget');

	var PerspectiveType = b$.view.perspective.PerspectiveType;
	var PerspectiveParameters = b$.view.perspective.PerspectiveParameters;

	var Perspective = b$.view.perspective.Perspective;

	var SimpleURITemplate = b$._private.template.SimpleURITemplate;
    var htmlAPI = b$._private.htmlAPI;

	var asyncComponentBuilder = new b$._private.AsyncComponentBuilder();

	/**
	 * This class represents the Backbase Widget instances.
	 * @extends backbase.com.2013.portalView.widget
	 * @class backbase.com.2013.portalView.backbaseWidget
	 */
	var BackbaseWidget = Widget.extend(null, {
		/**
		 * @property {Object} htmlHead
		 * The header of the widget chrome.
		 */
		/**
		 * @property {Object} htmlFoot
		 * The footer of the widget chrome.
		 */
		/**
		 * @property {Object} body
		 * The body of the widget chrome that contains the widget definition.
		 */
		/**
		 * @property {Array} includes
		 * The list of <code>g:includes</code> that belongs to the widget definition.
		 */

		/**
		 * @property localName
		 * Returns the local part of the qualified name of this node.
		 */
		localName: 'backbaseWidget',

		createDisplay: function() {
			this.htmlNode = this.renderDisplay();
			if(this.htmlNode)this.htmlNode.viewController = this;

			return this.htmlNode;
		},
		renderDisplay: function () {
			var oDocument = document;
			if (!this.htmlNode) {
				this.htmlNode = b$.portal.view.loadChrome(this, oDocument);
			}
			this.bindChromeHandlers();

			this.htmlHead = htmlAPI.cssSelector('.bp-widget-head', this.htmlNode)[0];
			this.htmlFoot = htmlAPI.cssSelector('.bp-widget-foot', this.htmlNode)[0];
			this.htmlAreas = [];
			this.htmlAreas[0] = htmlAPI.cssSelector('.bp-widget-body', this.htmlNode)[0];
			this.body = this.htmlAreas[0];
			this.buildWidget();

			return this.htmlNode;
		},
		readyHTML: function () {
			Widget.prototype.readyHTML.call(this);
		},
		buildWidget : function () {

			var sUrl = this.getAttribute('src');
			sUrl = sUrl.replace('$(contextRoot)', b$.portal.portalModel.serverURL);

			var This = this;

			asyncComponentBuilder.buildWidget(sUrl, function (def) {

				This.myDefinition = def;

				This.includes = def.getIncludesFromDefinition(This);

				def.getPreferencesFromDefinition(This);

				// Check For SSR
				var bSSR = (This.body && This.body.firstChild)?true:false;
				if(!bSSR) {
					This.body.appendChild(def.getHTMLBodyFromDefinition());
				}

				var oHtml = This.body;

				var oIncludeElements = htmlAPI.cssSelector(".bp-g-include", oHtml);
				if (oIncludeElements.length) {
					for (var i = 0; i < This.includes.length; i++) {
						var include = This.includes[i];
						include.htmlNode = oIncludeElements[i];

						include.addEventListener('content', function () {
							this.htmlNode.innerHTML = '';
							for (var j = 0; j < this.content.length; j++) {
								this.htmlNode.appendChild(this.content[j]);
							}
						});
					}
				}

				// Add missing class names from body definition
				/*TODO: comment out this, because the SSR will auto add the class
				for (var i = 0, l = def.XClasses.length; i < l; i++){
					if (!htmlAPI.hasClass(This.body, def.XClasses[i])){
						htmlAPI.addClass(This.body, def.XClasses[i]);
					}
				}*/

				// Register event listeners
				if(This.model) {	// XP1001
					for (var sEventName in def.XListeners) {
						if (def.XListeners.hasOwnProperty(sEventName)) {
							This.model.addEventListener(sEventName, def.XListeners[sEventName], false, This);
						}
					}
				}

//					new WidgetIncludeContextProvider(this.model, this.perspectiveProvider.getCurrentPerspective())
				var myPortal = This.ownerDocument.documentElement;

//					This.perspective = myPortal.createPerspective(new PerspectiveType("Dashboard"), new PerspectiveParameters());
				This.perspective = new Perspective(new SimpleURITemplate(This.myDefinition.sUrl, "page"), new PerspectiveType("Dashboard"), new PerspectiveParameters());

				if(!bSSR) {
					This.refreshIncludes();
//						This.refreshIncludes(new WidgetIncludeContextProvider(This, myPortal.getCurrentPerspective()));
				}

//					var oContextProvider = new WidgetIncludeContextProvider(This, This.perspective);
//					for (var i = 0, l = This.includes.length; i < l; i++){
//						var oInclude = This.includes[i];
//						oInclude.refreshOld = oInclude.refresh;
//						oInclude.refresh = function(){
//							this.refreshOld(oContextProvider);
//						};
//					}

				/**
				 * @event load
				 * Fired when the widget is fully loaded and all resources have been resolved
				 *
				 * Part of the <code>http://www.backbase.com/2008/gadget</code> namespace
				 *
				 *      <body g:onload="initWidget(__WIDGET__)">
				 */
				if(def.XListeners.load)
					def.XListeners.load.call(This);		// FIXME: Pass load event object;

			});
		},
/*
				this.includes.updateViews(this.model.getIncludes().getIterator());
				var oIncludesIterator = this.includes.getViews();
				var oIncludeElements = jQuery(oHtml).find(".portal-include");
				var iIncludeIndex = 0;

				while (oIncludesIterator.hasNext()) {
					var oInclude = oIncludesIterator.next();
					var oFragment = oInclude.buildHTML(oDocument);
					oIncludeElements.eq(iIncludeIndex++).replaceWith(oFragment);
					// bind on '*' so you go _after_ the includeView
					oInclude.model.addObserver('*', this.update, this);
				}
*/



		/**
		 * Refreshes all the g:includes on the widget
		 */
		refreshIncludes : function() {
			for (var i = 0, l = this.includes.length; i < l; i++){
				this.includes[i].refresh();
			}
		},
		getOriginURI : function () {
			return this.getDefinition().sUrl;
		},
		getDefinition: function(){
			return this.myDefinition;
		},
		// For Dashboard
		getBody : function() {
			return this;
		},
		// For Dashboard
		getIncludes : function() {
			return this.includes;
		}
	});
});


