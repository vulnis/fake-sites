/*
 *	----------------------------------------------------------------
 *	Copyright Backbase b.v. 2003/2012
 *	All rights reserved.
 *	----------------------------------------------------------------
 *	Version 5.5
 *	Author : Backbase R&D - Amsterdam - New York
 *	----------------------------------------------------------------
 */


new function () {
//  ----------------------------------------------------------------
	var FormControl = b$.bdom.getNamespace('http://backbase.com/2012/view').getClass('FormControl');

	/*
	 *
	 */

//  ----------------------------------------------------------------
	var xxx = FormControl.extend(null,{
		localName:'test',
		getDisplayModel: function() {
			return {};
		}
	},{
		template: function (json) {
			return '<b>hello</b>';
		}
	});


/*
//  ----------------------------------------------------------------
	var XHTML_formelement = XHTML_xhtml.extend(function() {
		XHTML_xhtml.apply(this,arguments);
	},{
		localName:'#formelement',

		getBoolAttribute:function(name){
			var v = this.getAttribute(name);
			if(v && v != 'false')return true;
			return false;
		},
		setBoolAttribute:function(name, bool){
			if(bool)this.setAttribute(name, name);
			else this.removeAttribute(name);
		},
		domActivate: function() {
			var oEvent	= new this.ownerDocument.createEvent('UIEvent');
			oEvent.initUIEvent("DOMActivate", true, true, window, null);
			this.dispatchEvent(oEvent);
		},
		getForm: function () {
			var elm = this.htmlNode;
			while(elm) {
				if(elm.localName == 'form')return elm;
				elm = elm.parentNode;
			}
		}
	});




			'mousedown': function(oEvent) {
				if (oEvent.target == this) {
					if(this.bOpen) {
//						if(!b$.ua.dom_isDescendant(this.getDisplay('popup'), oEvent.htmlTarget)){
						if(!b$.ua.dom_isDescendant(oEvent.htmlTarget, this.getDisplay('popup'))){
							console.log('CLOSE')
							XHTML_select.toggle(this);
						}
					}
//					var html = this.getDisplayEventTarget(oEvent.htmlTarget);
//					if (html == this.getDisplay("button")){
//					}
				}
				return;
				if (oEvent.target instanceof cXHTMLElement_option) {
					if (this.options[this.selectedIndex] != oEvent.target) {
						if (this.selectedIndex >-1)
							this.options[this.selectedIndex].removeAttribute("selected");
						this.options[this.selectedIndex = this.options.indexOf(oEvent.target)].setAttribute("selected", "true");
						XHTML_option.ensureRowIsVisible(this.options[this.selectedIndex]);
					}
				}



//  ----------------------------------------------------------------

			'DOMAttrModified': function(event) {
				if (event.target == this) {
					var sName = event.attrName, sValue = event.newValue;
	//				console.log('DOMAttrModified',sName, sValue,event)
					if(this.htmlNode) {
						if (sName == "selected"){
//							this.addClass("selected");
							var cls = this.prefix + 'option';
							if(sValue != null && sValue != "false")
								jQuery(this.htmlNode).addClass(cls+'_selected')
							else
								jQuery(this.htmlNode).removeClass(cls+'_selected')
						}
						else
						if (sName == 'label')
							this.getDisplay('gateway').innerHTML	= sValue || '';
//						else
//							this.mapAttribute(sName, sValue);
					}
				}
			}
		}
	});


*/

};


/*
 *	----------------------------------------------------------------
 *	Copyright Backbase b.v. 2003/2012
 *	All rights reserved.
 *	----------------------------------------------------------------
 *	Version 5.5
 *	Author : Backbase R&D - Amsterdam - New York
 *	----------------------------------------------------------------
 */


new function () {
//  ----------------------------------------------------------------
	var FormControl = b$.bdom.getNamespace('http://backbase.com/2012/view').getClass('FormControl');


/*
	case "tabIndex":
	case "accessKey":
*/



//  ----------------------------------------------------------------
	var Input = FormControl.extend(null,{
		localName:'input',
		isValid: function() {},
		setModel: function() {
		},
		getDisplayModel: function() {
			var sType = this.getAttribute('type') || 'text';
			// var cls = this.prefix + 'input';
			var cnBase = this.cnBase;
			var cnType = this.cnBase + '-' + sType;
			var inputType = sType;
			switch(sType){
				case 'hidden' :
				case 'password' :
				case 'checkbox' :
				case 'radio' :
				case 'file' :
				case 'submit' :
				case 'image' :
				case 'reset' :
				case 'button' :
					break;
				default :
					inputType = 'text';
			}
			return {
				name: this.getAttribute('name') || '',
				type: sType,
				inputType: inputType,
				value: this.getAttribute('value') || '',
				label: this.getAttribute('label') || '',
				cnBase: cnBase,
				cnType: cnType,
				parentNodeName: this.parentNode ? this.parentNode.nodeName : '',
				style: this.getAttribute('style') || '',
				checked: this.getAttribute('checked') || '',
				required: this.getBoolAttribute('required') || '',
				disabled: this.getBoolAttribute('disabled') || '',
				readonly: this.getBoolAttribute('readonly') || '',
				valid: this.isValid(),
				rangeOffset:Input.getRangeOffset(this, this.getAttribute('value')),
				spinner:false,
				maxlength:false
			}
		},
		setMyValue: function (value) {
			// var elm = this.getDisplay('value');
			// elm.innerText = elm.textContent = value;
			var elm = this.getDisplay('input');
			var prevValue = elm.value;
			elm.value = value;


			var oEvent = this.ownerDocument.createEvent('UIEvent');
			oEvent.initUIEvent('change', true, false, window, null);
			this.dispatchEvent(oEvent, false);

		}
	},{
		template: function (json) {
			var a = [];

			a.push('<span class="'+ (json.parentNodeName == 'radio' ? json.cnBase + '-' + json.parentNodeName : json.cnBase) + ' '+json.cnType)
			if(json.checked)a.push(' ' +json.cnBase+'--checked');
			if(json.required)a.push(' '+json.cnBase+'_required');
			if(json.disabled)a.push(' '+json.cnBase+'_disabled');
			if(json.readonly)a.push(' '+json.cnBase+'_readonly');
			if(json.valid)a.push(' '+json.cnBase+'_valid');
			a.push('"');
			if(json.style)a.push(' style="'+json.style+'"');
			a.push('>');

			if (json.label) a.push('<label class="'+json.cnBase+'--label '+json.cnType+'--label">');
//				'<div style="position:absolute;white-space:nowrap;">{{suggest}}</div>'+
			// a.push('<span class="'+json.cnBase+'--before '+json.cnType+'--before" style="float:left"></span>');
			// a.push('<span class="'+json.cnBase+'--after '+json.cnType+'--after" style="float:right"></span>');
			a.push('<div class="'+json.cnBase+'--field '+json.cnType+'--field">' +
						'<div class="'+json.cnBase+'--button '+json.cnType+'--button" style="'+
							(json.type == "range" ? "left:" + json.rangeOffset: "right:0") +
						'">');
//						'{{#spinner}}{{/spinner}}' +
			a.push('</div><input class="'+json.cnBase+'--input '+json.cnType+'--input');
			if (json.inputType == 'text' || json.inputType == 'password') {
				a.push(' bc-roundcorner-3');
			};
			a.push('" type="'+json.inputType+'"');
			// a.push(' name="'+json.name+'"');
			// a.push(' onchange="var elm=b$.getVC(this).getDisplay(\'label\'); elm.innerText = elm.textContent = this.value"');
			a.push(' onchange="var elm=b$.getVC(this).setMyValue(this.value);"');

			if(json.inputType == 'checkbox' || json.inputType == 'radio') a.push(' style="display:none"');
			if(json.checked)a.push(' checked="checked"');
			if(json.disabled)a.push(' disabled="true"');
			if(json.readonly)a.push(' readonly="true"');
			if(json.maxlength)a.push(' maxlength="'+json.maxlength+'"');

			a.push(' name="'+json.name+'" value="'+json.value+'" />');
			// a.push('<div class="'+json.cnBase+'--value '+json.cnType+'--value" style="display:none">'+json.value+'</div>');
			a.push('<div class="'+json.cnBase+'--popup" style="position:absolute;display:none"></div>');
			a.push('</div>');
			if (json.label) a.push(json.label + '</label>');
			a.push('</span>');

			return a.join('');
		},
		handlers: {
			'DOMAttrModified': function(event) {
				var sName = event.attrName, sValue = event.newValue;

//				console.log('DOMAttrModified',sName, sValue,event)
				if(this.htmlNode) {
	//				console.log(sName,sValue,this)

					var sType = this.getAttribute('type') || 'text';
					var cnBase = this.cnBase;
					var cnType = cnBase + '-' + sType;

					if (sName == "type") {	// Re-render
					}
					else if (sName == "checked") {
						if(sValue != null && sValue != '') {
							this.getDisplay("input").setAttribute('checked','checked');
							this.getDisplay("input").checked = true;
							// this.getDisplay("input").value = 'true';
							b$(this.htmlNode).addClass(cnBase+'--checked');
						}
						else {
							this.getDisplay("input").removeAttribute('checked');
							this.getDisplay("input").checked = false;
							// this.getDisplay("input").value = 'false';
							b$(this.htmlNode).removeClass(cnBase+'--checked');
						}
//						this.$setPseudoClass("checked", sValue != null && sValue != "false");
					}
/*
					else if (sName == "disabled") {
						this.$setPseudoClass("disabled", sValue != null, "value");	// Why on value pseudo-element?
						this.$getContainer("value").disabled	= sValue != null;
					}
*/
					// else if (sName == "value") {

//						if (this.attributes["type"] == "range") {
//							this.$getContainer("button").style.left	= cXHTMLElement_input.getRangeOffset(this, sValue || '');
//						}
//						else {
							// this.getDisplay('value').value	= sValue || '';
							// var elm = this.getDisplay('label');
							// elm.innerText = elm.textContent = sValue;
//						}
					// }

				}
/*
				if (sName == "type") {
					// Re-render content
					var oElementDOM	= this.$getContainer(),
						oFactory	= document.createElement("div");
					oFactory.innerHTML	= this.$getTag();
					oElementDOM.parentNode.replaceChild(oFactory.firstChild, oElementDOM);
				}
				else
				if (sName == "placeholder") {
					this.$getContainer("placeholder").innerHTML	= sValue || '';
				}
				else
				if (sName == "checked") {
					this.$setPseudoClass("checked", sValue != null && sValue != "false");
				}
				else
				if (sName == "disabled") {
					this.$setPseudoClass("disabled", sValue != null, "value");	// Why on value pseudo-element?
					this.$getContainer("value").disabled	= sValue != null;
				}
				else
				if (sName == "value") {
					if (this.attributes["type"] == "range") {
						this.$getContainer("button").style.left	= cXHTMLElement_input.getRangeOffset(this, sValue || '');
					}
					else {
						this.$getContainer("value").value	= sValue || '';
					}
				}
				else
					cXHTMLElement.prototype.$mapAttribute.call(this, sName, sValue);
*/
			},


			'DOMActivate' : function(event) {
//				console.log('DOMActivate',event.target)
				if (event.target == this) {
					switch (this.getAttribute('type')) {
						case 'file':
							// this.getDisplay('value').click();
							// break;
						case 'color':
						case 'date':
						case 'datetime':
						case 'datetime-local':
						case 'month':
						case 'week':
//							cXHTMLElement_input.toggle(This);
							break;

						case 'checkbox':
							if (this.getAttribute('checked')) {
								this.removeAttribute('checked');
							} else {
								this.setAttribute('checked', 'checked');
							}
							// this.setAttribute('checked', this.getAttribute('checked') == 'checked' ? '' : 'checked');
							break;

						case 'radio':
							var sName	= this.getAttribute('name');
							// var form = this.getForm();
							var form = this.parentNode;
							// if (sName && form)
							// console.log(form.length);
							for (var nIndex = 0, oElement; nIndex < form.childNodes.length; nIndex++) {
								if ((oElement = form.childNodes[nIndex]) && oElement.getAttribute('type') == 'radio' && oElement.getAttribute('name') == sName) {
									if (oElement.getAttribute('checked') && oElement !== this) {
										oElement.removeAttribute('checked');
									}
								}
							}
							/*
							for (var nIndex = 0, oElement; nIndex < form.elements.length; nIndex++) {
								if ((oElement = form.elements[nIndex]) && oElement.getAttribute('type') == 'radio' && oElement.getAttribute('name') == sName) {
//										console.log('checked',oElement.getAttribute("checked"))
									if (oElement.checked) {
//											form.elements[nIndex].removeAttribute("checked");
										// b$.getVC(form.elements[nIndex]).removeAttribute('checked');
										form.elements[nIndex]
									}
								}
							}
							*/
							this.setAttribute('checked', 'checked');
							break;
					}
				}
			},
			'click': function(oEvent) {
				if (oEvent.target == this) {
					var html = this.getDisplayEventTarget(oEvent.htmlTarget);
					if (html == this.getDisplay('button')) {
						switch (this.getAttribute('type')) {
							case 'file':
							case 'date':
							case 'color':
							case 'datetime':
							case 'datetime-local':
							case 'month':
							case 'week':
								this.domActivate();
								break;
						}
					}
					else {
						switch (this.getAttribute('type')) {
							case 'radio':
							case 'checkbox':
								this.domActivate();
								break;
						}
					}
				}
			},
			'mousedown': function(oEvent) {
				if (oEvent.target == this) {
					switch (this.getAttribute('type')) {
						case 'range':
							if (this.getDisplayEventTarget(oEvent.htmlTarget) != this.getDisplay('button'))
								break;
							oEvent.preventDefault();// prevent selection
						case 'reset':
						case 'submit':
						case 'button':
							this.$captured	= true;
//							this.setMouseTrap(true);
							b$.ua.setMouseTrap(this)
//							this.$setPseudoClass('active', true);
							var cnBase = this.cnBase;
							b$(this.htmlNode).addClass(cnBase+'_active')
							break;

					}
				}
			},
			'mouseup': function(oEvent) {
				if (oEvent.target == this) {
					switch (this.getAttribute('type')) {
						case 'reset':
						case 'submit':
						case 'button':
						case 'range':
							console.log('YESHJ')
							if (this.$captured) {
								this.$captured	= false;
//								this.releaseMouseTrap();
								b$.ua.releaseMouseTrap(this);
//								this.$setPseudoClass('active', false);
								var cnBase = this.cnBase;
								b$(this.htmlNode).removeClass(cnBase+'_active')
								//
								if (this.getAttribute('type') == 'range')
									this.setAttribute('value', this.valueAsNumber);
							}
							break;
					}
				}
			},
			'DOMNodeInsertedIntoDocument': function(oEvent) {
				if (oEvent.target == this) {
				}
			},
			'mousemove': function(oEvent) {
				if (oEvent.target == this) {
					switch (this.getAttribute('type')) {
						case 'range':
							if (this.$captured) {
								var oRect	= b$.ua.getBoundingClientRect(this.getDisplay('field')),
									nLeft	= Math.max(oRect.left, Math.min(oEvent.clientX, oRect.right)),
									nRatio	= (nLeft - oRect.left) / (oRect.right - oRect.left);

								var nStep	= parseFloat(this.getAttribute('step')) || 1,
									nMin	= parseFloat(this.getAttribute('min')),
									nMax	= parseFloat(this.getAttribute('max'));

								if (isNaN(nMin))
									nMin	= 0;
								if (isNaN(nMax))
									nMax	= 100;
								if (nMax < nMin)
									nMax	= nMin;
								// Save current value
								this.valueAsNumber	= Math.round(nStep * (nMin + (nMax - nMin) * nRatio)) / nStep;
								// Update thumb position
								this.getDisplay('button').style.left = Input.getRangeOffset(this, this.valueAsNumber);
							}
							break;
					}
				}
			}
		},
		getRangeOffset: function(This, nValue) {
			var nMax	= parseFloat(This.getAttribute('max')),
				nMin	= parseFloat(This.getAttribute('min'));

			if (isNaN(nMin))
				nMin	= 0;
			if (isNaN(nMax))
				nMax	= 100;
			if (nMax < nMin)
				nMax	= nMin;

			return 100 * (Math.max(nMin, Math.min(nMax, nValue)) - nMin) / (nMax - nMin) + '%';
		}
	});


	var RadioGroup = FormControl.extend(function (bdomDocument, node) {
		FormControl.apply(this, arguments);
	},{
		localName:'radio',
		getDisplayModel: function() {
			return {
				cnBase: this.cnBase,
				cnBasePrefix: this.cnBasePrefix,
				name: this.getAttribute('name'),
				value: this.getAttribute('value')
			}
		}

	},{
		template: function(json) {
			return '<span class="' + json.cnBase +' ' + json.cnBase + '--radio-group"></span>';
		}/*,
		handlers: {
			'click': function(oEvent) {
				var optionList = this.childNodes;
				// this should be done somewhere else (if casncle ... wrong value)
				this.setAttribute('value', optionList[optionList.indexOf(oEvent.target)].getAttribute('value'));
			}
		}*/
	});


};


/*
 *	----------------------------------------------------------------
 *	Copyright Backbase b.v. 2003/2012
 *	All rights reserved.
 *	----------------------------------------------------------------
 *	Version 5.5
 *	Author : Backbase R&D - Amsterdam - New York
 *	----------------------------------------------------------------
 */

new function () {
//  ----------------------------------------------------------------
	var FormControl = b$.bdom.getNamespace('http://backbase.com/2012/view').getClass('FormControl');

//  ----------------------------------------------------------------
	var Select = FormControl.extend(function (bdomDocument, node) {
		FormControl.apply(this, arguments);
		this.selectedIndex=0;
		this.options = new b$.bdom.NodeList();
	},{
		localName:'select',
		getDisplayModel: function() {
			return {
				cnBase: this.cnBase,
				cnBasePrefix: this.cnBasePrefix,
				name: this.getAttribute('name'),
				value: this.getAttribute('value')
			}
		},
		DOMReady:function(){
			this.setSelectedIndex(this.selectedIndex);
		},
		setSelectedIndex: function(idx) {
			if(!this.htmlNode){
				this.selectedIndex=idx;
			}
			else {
				if (this.selectedIndex != undefined && this.options[this.selectedIndex]){
                    b$(this.options[this.selectedIndex].htmlNode).removeClass('bc-option-selected');
                }

				if(this.options[idx]){
					this.selectedIndex = idx;
					var s = this.options[idx].getTextContent();
					this.getDisplay('label').innerHTML = s;

					var opt = this.options[idx];
					var v = opt.getAttribute('value');
					if(!opt.hasAttribute('value'))
						v = s

					this.getDisplay('select').value = v;

					b$(opt.htmlNode).addClass('bc-option-selected');

				}
                XHTML_Option.ensureRowIsVisible(this.options[idx]);
            }
		},
		// ,
		// set_selectedIndex: function(oOption) {
		// 	console.info(oOption);
		// 	for (var i = 0, l = this.options.length; i < l; i++) {
		// 		if (this.options[i] == oOption) {
		// 			this.getDisplay('select').value = this.options[i].value;
		// 		};
		// 	}
		// }
		addOption: function(oElement, nIndex){
			return this.appendChild(oElement);
		},
		removeOption: function(nIndex){
			return this.removeChild(this.options[nIndex]);
		},
		toggle: function () {
			Select.toggle(this);
		}
	},{
		template: function(json) {
			var a = [];
			a.push('<div class="'+json.cnBase+'">');
			a.push('<input class="'+json.cnBase+'--select" name="'+json.name+'" />');
			a.push('<ul class="'+json.cnBase+'--list '+json.cnBasePrefix+'gradient-grey '+json.cnBasePrefix+'roundcorner-5">');
			a.push('<li class="'+json.cnBase+'--label">'+json.value+'</li>');
			a.push('<li class="'+json.cnBasePrefix+'dd-arrow"><span class="'+json.cnBase+'--button '+json.cnBasePrefix+'icn '+json.cnBasePrefix+'triangle"></span></li>');
			a.push('</ul>');
			a.push('<div class="'+json.cnBase+'--dropdown bc-roundcorner-8 bc-shadow --area" style="display:none"></div>');
			a.push('</div>');
			return a.join('');
		},
		handlers:{
			'mousedown': function(oEvent) {
				// make shure it doesn't toggle when useing the sroll-bar
				if (oEvent.htmlTarget.className && oEvent.htmlTarget.className.indexOf('--dropdown') == -1) {
					Select.toggle(this);
				}

				// if (oEvent.target == this) {
					// if(this.bOpen) {
//						if(!b$.ua.dom_isDescendant(this.getDisplay('popup'), oEvent.htmlTarget)){
						// if(!b$.ua.dom_isDescendant(oEvent.htmlTarget, this.getDisplay('dropdown'))){
							// console.log('CLOSE')
							// Select.toggle(this);
						// }
					// }
//					var html = this.getDisplayEventTarget(oEvent.htmlTarget);
//					if (html == this.getDisplay("button")){
//					}
				// }


				if (oEvent.target instanceof XHTML_Option) {
					if (this.options[this.selectedIndex] != oEvent.target) {


						this.setSelectedIndex(this.options.indexOf(oEvent.target));


//						if (this.selectedIndex >-1)
//							this.options[this.selectedIndex].removeAttribute("selected");
//						this.options[this.selectedIndex = this.options.indexOf(oEvent.target)].setAttribute("selected", "true");
					}
				}

				return false; // prevent selection
			},
            'keydown': function(oEvent) {
                switch(oEvent.keyIdentifier){
                    case 'U+000D': // enter key: open/ close dropdown
                        Select.toggle(this);
                        break;
                    case 'U+0028': // arrow down: select next option
                        var index = this.selectedIndex < this.options.length - 1 ? this.selectedIndex + 1 : 0;
                        this.setSelectedIndex(index);
                        oEvent.preventDefault();
                        break;
                    case 'U+0026': // arrow up: select previous option
                        var index = this.selectedIndex > 0 ? this.selectedIndex - 1 : this.options.length - 1;
                        this.setSelectedIndex(index);
                        oEvent.preventDefault();
                        break;
//                    default:
//                        console.log('key', oEvent.keyIdentifier);
                }
            }
		},
		toggle: function(This, bForce) {
			var dropdown = This.getDisplay('dropdown'),
			    selectBox = This.getDisplay('list'),
			    prefTab = (This.parentNode && This.parentNode.htmlBody) ? This.parentNode.htmlBody.parentNode : null,
			    upDownLimit,
			    htmlAPI = b$._private.htmlAPI;

			if (selectBox) {
				var dropdownStyle = dropdown.style,
				    selectOffsetTop = htmlAPI.getBoxObject(selectBox).top - htmlAPI.getBoxObject(prefTab).top,
				    upDownLimit = (selectOffsetTop - (prefTab.offsetHeight / 2) + (selectBox.offsetHeight / 2)) >= 0,
				    prefTabHeight = prefTab.offsetHeight - selectOffsetTop - selectBox.offsetHeight;

				dropdownStyle.maxHeight = ((!upDownLimit ? prefTabHeight : selectOffsetTop) - selectBox.offsetHeight) + 'px';
			}

			if ((arguments.length > 1 && bForce == true) || !(arguments.length > 1 || dropdownStyle.display != 'none')) {
				This.bOpen = true;
				b$(This.htmlNode).addClass(This.cnBase+'-open').addClass(!upDownLimit ? '' : This.cnBase+'-up')
				dropdownStyle.display = '';
				b$.ua.setMouseTrap(This);
                XHTML_Option.ensureRowIsVisible(This.options[This.selectedIndex]);
            } else {
				This.bOpen = false;
				b$(This.htmlNode).removeClass(This.cnBase+'-open').removeClass(This.cnBase+'-up')
				dropdownStyle.display = 'none';
				b$.ua.releaseMouseTrap(This);
			}
		}
	});



//  ----------------------------------------------------------------
	var XHTML_Option = FormControl.extend(null,{
		localName:'option',
		getDisplayModel: function() {
			return {
				cnBase: this.cnBase,
				value: this.getAttribute('value') || ''
			}
		}
	},{
		template: function(json) {
			var a = '<div class="'+json.cnBase+' '+json.cnBase+'-ellipsis"><span class="'+json.cnBase+'-label --area"></span></div>';
		//		(this.getAttribute('class')+
		//		(this.disabled ? ' ' + this.cls + '_disabled' : '')+
			return a;
		},
		ensureRowIsVisible: function(oInstance) {
			for (var oElement = oInstance; oElement && (oElement = oElement.parentNode);) {
				if (oElement instanceof Select) {
					var oScroll	= oElement.getDisplay('dropdown'),
						oInput	= oInstance.getDisplay(),
						nDiffTop	= oInput.offsetTop - oScroll.offsetTop,
						nDiffHeight	= oInput.offsetHeight - oScroll.offsetHeight;
					/*
					if (oScroll.scrollTop < nDiffTop + nDiffHeight) {
						oScroll.scrollTop	= nDiffTop + nDiffHeight;
					}
					else if (oScroll.scrollTop > nDiffTop) {
						oScroll.scrollTop	= nDiffTop;
					}
					*/
					oScroll.scrollTop	= oInput.offsetTop - 3;
					break;
				}
			}
		},
		handlers: {
			'DOMNodeInserted': function(oEvent) {
				for (var oNode = this, i = 0; oNode = oNode.parentNode;) {
					if (oNode instanceof Select) {
						break;
					}
					else
						i++;
				}
				if (oNode) {

					oNode.options.add(this);
					if (this.parentNode != oNode)
						this.getDisplay('gap').style.width	= i + 'em';

					var v = this.getAttribute('selected');
					if(v=='true' || v == 'selected' ) {
						oNode.setSelectedIndex(oNode.options.indexOf(this));
					}

				}
			},
			'DOMNodeRemoved': function(oEvent) {
				for (var oNode = this; oNode = oNode.parentNode;)
					if (oNode instanceof Select)
						break;
				if (oNode)
					oNode.options.remove(this);
			},
			'DOMAttrModified': function(event) {
				if (event.target == this) {
					var sName = event.attrName, sValue = event.newValue;
					if(this.htmlNode) {
						if (sName == "selected"){
							var cls = this.prefix + 'option';
							if(sValue != null && sValue != "false")
								b$(this.htmlNode).addClass(cls+'_selected')
							else
								b$(this.htmlNode).removeClass(cls+'_selected')
						}
						else
						if (sName == 'label')
							this.getDisplay('gateway').innerHTML	= sValue || '';
					}
				}
			},
			'mouseenter': function(event) {
				if (event.target == this) {
					b$(this.htmlNode).addClass('_hover')
				}
			},
			'mouseleave': function(event) {
				if (event.target == this) {
					b$(this.htmlNode).removeClass('_hover')
				}
			}
		}
	});

//cXHTMLElement_option.prototype.$mapAttribute	= function(sName, sValue) {
//};









//  ----------------------------------------------------------------
	var Optgroup = FormControl.extend(function (bdomDocument, node) {
		FormControl.apply(this, arguments);
		this.cls = (this.prefix ? this.prefix + '-' : '') + this.localName;
	},{
		localName:'optgroup',
		getDisplayModel: function() {
			return {
				sClassName: this.prefix + 'select'
			}
		}
	},{
		template: function(json) {
			return '<div class="' +	this.cls +
		//				("class" in this.attributes ? ' ' + this.attributes["class"] : '')+
						(this.disabled ? ' ' + this.cls + '_disabled' : '')+
					'">\
						<div class="' + this.cls + '--gap" style="height:1em;float:left"></div>\
						<div class="' + this.cls + '--value">' +(this.label || '')+ '</div>\
						<div class="' + this.cls + '--area">\
						</div>\
					</div>';
		},
		handlers: {
			'mouseover': function(oEvent) {
				if (oEvent.target == this)
					this.$setPseudoClass("hover", true, "value");
			},
			'mouseout':	function(oEvent) {
				if (oEvent.target == this)
					this.$setPseudoClass("hover", false, "value");
			},
			'DOMNodeInsertedIntoDocument': function(oEvent) {
				// Add to the options collection
				for (var oNode = this, nDepth = 0; oNode = oNode.parentNode;)
					if (oNode instanceof Select)
						break;
					else
						nDepth++;
				if (oNode) {
					//
					if (this.parentNode != oNode)
						this.getDisplay('gap').style.width	= nDepth + 'em';
				}
			}
		}
	});


};


/*
 *	----------------------------------------------------------------
 *	Copyright Backbase b.v. 2003/2012
 *	All rights reserved.
 *	----------------------------------------------------------------
 *	Version 5.5
 *	Author : Backbase R&D - Amsterdam - New York
 *	----------------------------------------------------------------
 */

(function () {
//  ----------------------------------------------------------------
	var FormControl = b$.bdom.getNamespace('http://backbase.com/2012/view').getClass('FormControl');

//  ----------------------------------------------------------------
	var Switch = FormControl.extend(function (bdomDocument, node) {
		FormControl.apply(this, arguments);
		this.selectedIndex=0;
	},{
		localName:'switch',
		getDisplayModel: function() {
			return {
				cnBase: this.cnBase,
				cnBasePrefix: this.cnBasePrefix,
				name: this.getAttribute('name'),
				value: this.getAttribute('value')
			};
		},
		toggle: function() {
			var $switch = b$(this.htmlNode),
				$label = b$(this.getDisplay('.' + this.cnBasePrefix + 'label'));
				input = this.getDisplay('input');

			$switch.toggleClass(this.cnBase + '--checked');
			$label.toggleClass(this.cnBasePrefix + 'toggle-checked');

			input.setAttribute('value', input.getAttribute('value') == 'true' ? 'false' : 'true');
			if (input.getAttribute('checked')) input.removeAttribute('checked');
			else input.setAttribute('checked', 'true');
			this.setAttribute('value', this.getAttribute('value') == 'true' ? 'false' : 'true');
		}
	},{
		template: function(json) {
			var a = [],
				isChecked = (json.value == 'true');

			a.push('<span class="' + json.cnBase + ' ' + (isChecked ? json.cnBase + '--checked': '') + '">');
			a.push('<div class="' + json.cnBase + ' ' + json.cnBasePrefix + 'toggle-switch">');
			a.push('<input type="checkbox" class="' + json.cnBase + '--input ' + json.cnBasePrefix + 'toggle-switch"');
			a.push(' name="' + (json.name || '') + '" value="' + json.value + '"' + (isChecked ? ' checked="checked"' : '') + '>');
			a.push('<div class="' + json.cnBasePrefix + 'label' + (isChecked ? ' ' + json.cnBasePrefix + 'toggle-checked': '') + '" data-on="YES" data-off="NO">');
			a.push('</div></div></span>');
			return a.join('');
		},
		handlers:{
			'click': function(oEvent) {
				if (oEvent.target == this) {
					this.toggle();
				}
			},
			'keydown': function(oEvent) {
				if (oEvent.target == this) {
                    if(oEvent.keyIdentifier == "U+000D" || oEvent.keyIdentifier == "U+0027" || oEvent.keyIdentifier == "U+0025" || oEvent.keyIdentifier == "U+0020"){
					    this.toggle();
                        oEvent.preventDefault();
                    }
				}
			}
		}

	});

})();


