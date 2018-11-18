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

	var DOMReflector = b$.bdom.util.DOMReflector;
	var RFL_DOM2Control = b$.bdom.util.RFL_DOM2Control;

	/**
	 * This reflection is a controller for all preferences, except those with the type <code>select-one</code>.
	 * It links the model element to a view element.
	 * You need to register each reflection in a reflector of type <code>b$.bdom.util.DOMReflector</code>.
	 * For registering a reflection, you can use a short-hand in the <code>config</code> parameter.
	 * @class
	 * @param {Function} config Key-value pairs that are parsed as properties of the new reflection.
	 * For example, setting config to the following value will generate values for <code>match</code>, <code>type</code>, <code>render</code> and <code>getValue</code> properties:
	 * <pre>
	 * {'match':'text','type':'text', 'render':true, 'getValue':function(view){return view.getDisplay('input').value}}
	 * </pre>
	 * @extends b$.bdom.util.RFL_DOM2Control
	 * @ignore
	 */
	var RFL_Preference2Control = RFL_DOM2Control.extend(null,{
		xns:'http://www.w3.org/1999/xhtml',
		/**
		 * The namespace of the view element, default is <code>http://backbase.com/2012/view</code>.
		 * @type {String}
		 */
		ns:'http://backbase.com/2012/view',
		/**
		 * The name of the view element, default is <code>input</code>.
		 * @type {String}
		 */
		localName:'input',
		/**
		 * Returns whether this reflection belongs to the specified <code>model</code> based first on the <code>viewHint</code> and second on the <code>inuptType.name</code> of the <code>model</code>.
		 * Returns <code>true</code> if one of the items in the <code>viewHint</code>s matches with the <code>match</code> property of this reflection.
		 * If the <code>viewHint</code> did not produce a match, the method returns whether <code>model.inputType.name</code> matches the <code>match</code> property.
		 * @param {backbase.com.2012.portalModel.Item} model
		 * @return {Boolean} Whether this reflection belongs to the <code>model</code>.
		 */
		doMatch:function(model) {
			if(!this.match){
				// console.log('Fallback rule triggered. ',model);
				return true;	// Always match..(fallback rule)
			}
			var sInputType = model.inputType.name;

			if (model.viewHint) { // view hint
				var aViewHints = model.viewHint.split(/,/);
				for (var j = 0; j < aViewHints.length; j++) {

					// console.log('check ' + model.name + '[' + this.match + ']: ' + aViewHints[j])

					if(aViewHints[j] == this.match){
						// console.log('Viewhint :'+ aViewHints[j]);
						return true;
					}

//					if (fields[aViewHints[j]]) {
//						sInputType = aViewHints[j];
//						if(sInputType == this.match)return true;
//						break;
//					}
				}
			}
			if(sInputType == this.match)return true;
			return false;
		},
//		getInstance:function(model, ownerDocument, id) {
//			ownerDocument._newIDhack = this.idGen(model);
//			var vclass = b$.bdom.namespaces[this.getNS()].getClass(this.getLocalName(model));
//			var bdom = new vclass(ownerDocument, this.getNS(), this.getLocalName(model));	// OLD CONSTRUCTOR API
//			return bdom;
//		},
		initInstance:function(bdom, model) {

			bdom.model = model;	// Set as model

			bdom.ctrl = this;	// Set Controller		//	hmmmmm
//			this.view = bdom;	// Set view			//	hmmmmm
//			this.model = model;	// Set model			//	hmmmmm


			bdom.setAttribute('type',this.type);
			bdom.setAttribute('name',model.name);
			bdom.setAttribute('value',model.value);

			if(this.type == 'checkbox' || this.type == 'radio') {
				if(model.value == 'true')
					bdom.setAttribute('checked', model.value);
			}

			model.addEventListener('change', function(evt){
				// console.log('change from model ', this, bdom, evt)
//					console.dir(evt);
//            		bdom.getDisplay('input').value = model.getValue();
			});

			bdom.addEventListener('change', function(evt){
				// console.log('change from view ', this, model, evt)
				model.setValue(evt.target.getDisplay('input').value);
			});

			model.addEventListener('DOMNodeRemovedFromDocument', function(evt){
//					bdom.destroy();
			});
		},
		defaultRead: function(bdom){
			return This.getDisplay('input').value;
		},
		defaultUpdate: function(bdom){
			bdom.setAttribute('value', value);
		},
		defaultDelete: function(bdom){
//				bdom.destroy();
		}
	});

	/**
	 * This reflection is a controller for <code>select-one</code> preferences.
	 * It links the model element to a view element.
	 * You need to register each reflection in a reflector of type <code>b$.bdom.util.DOMReflector</code>.
	 * For registering a reflection, you can use a short-hand in the <code>config</code> parameter.
	 * @class
	 * @param {Function} config Key-value pairs that are parsed as properties of the new reflection.
	 * For example, setting config to the following value will generate values for <code>match</code>, <code>localName</code>, <code>render</code> and <code>getValue</code> properties:
	 * <pre>
	 * {'match':'select-one','localName':'select', 'render':true, 'getValue':function(view){return  view.getDisplay('select').value}}
	 * </pre>
	 * @extends b$.bdom.util.RFL_Preference2Control
	 * @ignore
	 */
	var RFL_Preference2ControlEnumeration = RFL_Preference2Control.extend(null,{
		
		getInstance: function(model, ownerDocument, id) {
			ownerDocument._newIDhack = id;

			var vclass = b$.bdom.namespaces[this.getNS()].getClass(this.getLocalName(model));
			var bdom = new vclass(ownerDocument, this.getNS(), this.getLocalName(model));	// OLD CONSTRUCTOR API

			var isRadio = this.localName == 'radio';
			var voption = b$.bdom.namespaces[this.getNS()].getClass(isRadio ? 'input' : 'option');

			// console.log(model.inputType);
			for (var i = 0, l = model.inputType.options.length; i < l; i++) {
				var bdomOption = new voption(ownerDocument);
				var v = model.inputType.options[i].value;
				bdomOption.setAttribute('value', v);
				if (isRadio) {
					bdomOption.setAttribute('type', 'radio');
					bdomOption.setAttribute('label', model.inputType.options[i].label);
				}
				if(v == model.value){
					if (isRadio) {
						bdomOption.setAttribute('checked', 'checked');
					} else {
						bdomOption.setAttribute('selected', 'true');
					}
				}

				// label not added for now, is available on the model
				// bdomOption.setAttribute('label', model.inputType.options[i].label);
				if (!isRadio) {
					var textNode = ownerDocument.createTextNode(model.inputType.options[i].label);
					bdomOption.appendChild(textNode);
				}
				bdom.appendChild(bdomOption);
			};

			return bdom;
		}

		// getInstance: function(model, ownerDocument, id) {
		// 	ownerDocument._newIDhack = id;

		// 	var vclass = b$.bdom.namespaces[this.getNS()].getClass(this.getLocalName(model));
		// 	var bdom = new vclass(ownerDocument, this.getNS(), this.getLocalName(model));	// OLD CONSTRUCTOR API

		// 	var voption = b$.bdom.namespaces[this.getNS()].getClass('option');


		// 	for (var i = 0, l = model.inputType.options.length; i < l; i++) {
		// 		var bdomOption = new voption(ownerDocument);
		// 		var v = model.inputType.options[i].value;
		// 		bdomOption.setAttribute('value', v);
		// 		if(v == model.value){
		// 			bdomOption.setAttribute('selected', 'true');
		// 		}

		// 		// label not added for now, is available on the model
		// 		// bdomOption.setAttribute('label', model.inputType.options[i].label);
		// 		var textNode = ownerDocument.createTextNode(model.inputType.options[i].label);
		// 		bdomOption.appendChild(textNode);
		// 		bdom.appendChild(bdomOption);
		// 	};

		// 	return bdom;
		// }
	});

	var domReflector = new DOMReflector();
	domReflector.addToSet('default',[
		new RFL_Preference2Control({match:'text',type:'text', render:true, getValue:function(view){return view.getDisplay('input').value}}),
		new RFL_Preference2Control({match:'textarea',localName:'textarea', render:true, getValue:function(view){return view.htmlNode.value}}),
		new RFL_Preference2Control({match:'password',type:'password', render:true, getValue:function(view){return view.getDisplay('input').value}}),
		//new RFL_Preference2Control({match:'radio',type:'radio', render:true, getValue:function(view){return view.getDisplay('input').checked}}),
		new RFL_Preference2ControlEnumeration({match:'radio',localName:'radio', render:true, getValue:function(view){
				var radios = view.getDisplay('radio-group').getElementsByTagName('input');
				for (var idx = radios.length; idx--; ) {
					if (radios[idx].checked) return radios[idx].value;
				}
				// return view.getDisplay('checked').getElementsByTagName('input')[0].value;
			}}),
		new RFL_Preference2Control({match:'checkbox', localName:'switch', render:true, getValue:function(view){return view.getDisplay('input').checked}}),
		// new RFL_Preference2Control({match:'checkbox',type:'checkbox', render:true, getValue:function(view){return view.getDisplay('input').checked}}),
		new RFL_Preference2Control({match:'checkbox-multiple',type:'checkbox', render:true, getValue:function(view){return view.getDisplay('input').checked}}),
		new RFL_Preference2ControlEnumeration({match:'select-one',localName:'select', render:true, getValue:function(view){return view.getDisplay('select').value}}),
		new RFL_Preference2Control({match:'select-multiple',type:'select', render:true, getValue:function(view){return view.htmlNode.value}}),
		new RFL_Preference2Control({match:'',type:'text', render:true, getValue:function(view){return ''}})
	]);


	b$.portal.setController('preferences', domReflector);


}