/*
 *	----------------------------------------------------------------
 *	Copyright Backbase b.v. 2003/2013
 *	All rights reserved.
 *	----------------------------------------------------------------
 *	Version 5.5
 *	Author : Backbase R&D - Amsterdam - New York
 *	Author : G.W.J. Kaandorp
 *	----------------------------------------------------------------
 *
 *  Implementation of http://www.w3.org/1999/xhtml
 *
 */

new function () {

	var tags = [ // HTML 4.01 elements (alphabetic order)
	            /*'a', */'abbr', 'address', 'area',
	            'b', 'base', 'bdo', 'blockquote', 'body', 'br', 'button',
	            'caption', 'cite', 'code', 'col', 'colgroup',
	            'dd', 'del', 'dfn', 'div', 'dl', 'dt',
	            'em', 'eventsource',
	            'fieldset', 'form',
	            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'hr', 'html',
	            'i', 'iframe', 'img', /*'input', */, 'ins',
	            'kbd',
	            'label', 'legend', 'li', 'link',
	            'map', 'menu', 'meta',
	            'noscript',
	            'object', 'ol', 'optgroup', 'option',
	            'p', 'param', 'pre',
	            'q',
	            's', 'samp', /*'script', */'select', 'small', 'span', 'strong', 'style', 'sub', 'sup',
	            /*'table', 'tbody', */'td', 'textarea', /* 'tfoot', */'th', /*'thead', */, 'title', /*'tr', */
	            'u', 'ul',
	            'var',

	            // New HTML5 tags
	            'article', 'aside', 'audio',
	            'bdi',
	            'canvas', 'command',
	            'datalist', 'details', 'dialog',
	            'embed',
	            'figcaption', 'figure', 'footer',
	            'header', 'hgroup',
	            'keygen',
	            'mark', 'meter',
	            'nav',
	            'output',
	            'progress',
	            'rp', 'rt', 'ruby',
	            'section', 'source', 'summary',
	            'time', 'track',
	            'video',
	            'wbr',

	            // The following HTML 4.01 elements are removed from HTML5
	            'acronym', 'applet', 'basefont', 'big', 'center', 'dir', 'font', 'frame', 'frameset', 'noframes', 'strike', 'tt'],
	    tag = {},

	    DisplayElement = b$.bdom.getNamespace('http://backbase.com/2012/view').getClass('layoutElement');



	tag['XHTML_xhtml'] = DisplayElement.extend(null, {
		namespaceURI:'http://www.w3.org/1999/xhtml',
		localName:'#xhtml',

		renderDisplay: function(displayModel) {
			var elm = document.createElement(this.localName);
			for (var i=0,l=this.attributes.length;i<l;i++){
				var a = this.attributes[i];
				// if(a.nodeName!='id' && a.nodeName!='class' && a.nodeName.indexOf(':') ==-1){
				if(a.nodeName!='id' && a.nodeName.indexOf(':') ==-1){
					elm.setAttribute(a.nodeName, a.nodeValue);
				}
			}
			return elm;
		},
		mapAttribute: function(sName, sValue) {
			switch (sName) {
				case 'tabIndex':
					this.tabIndex = isNaN(sValue) ? -1 : sValue * 1;
					break;
				case 'accessKey':
					this.accessKey = sValue || null;
					break;
			}

			var view = this.getDisplay();
			if (view){
				switch (sName) {
					case 'id':
						view.id	= sValue;
						break;
					case 'class':

//						var sClass	=(this.cnBasePrefix: ? this.prefix + '-' : '') + this.localName + (sValue ? ' ' + sValue : '');
						var sClass	=(this.cnBase ? this.cnBase+' ' : '') + sValue;

						if (b$.bUATrident && b$.nUAVersion < 8)
							view.className	= sClass;
						else
							view.setAttribute("class", sClass);
						break;
					case 'style':
//						view.style.cssText	= sValue;
						view.setAttribute(sName,sValue);
						break;
					default:
						view.setAttribute(sName,sValue);
				}
			}
		}
	});

	for (var n = tags.length; n--; ) {
		tag['XHTML_' + tags[n]] = tag['XHTML_xhtml'].extend(null, {
			localName: tags[n]
		});
	}


	tag['XHTML_input'] = tag['XHTML_xhtml'].extend(null, {
		localName:'input',
		doTemplate:function(json){
			var s = '<' + this.localName;
			for (var i=0,l=this.attributes.length;i<l;i++){
				var a = this.attributes[i];
				if(a.nodeName!='id' && a.nodeName!='class' && a.nodeName.indexOf(':') ==-1){
					s+=' '+a.nodeName+'="'+a.nodeValue+'"';
				}
			}
			s+=' class="'+this.cls+' '+this.getAttribute('class')+'"' ;
//			s+=' style="border:10px solid red;"' ;
			s+='/>';
			return s;
		}

	});


	tag['XHTML_script'] = tag['XHTML_xhtml'].extend(null, {
		localName:'script'
	},{
		handlers: {
			'DOMNodeInsertedIntoDocument':	function(event) {
				var sType	= (this.getAttribute('type') || '').match(/(\w+)\/([-\w]+\+)?(?:x\-)?([-\w]+)?;?(.+)?/) ? RegExp.$3 : '';
				if (this.getAttribute('src'))
					this.getDisplay().src = this.getAttribute('src');
				else
				if (this.firstChild &&(sType == '' || sType == 'javascript' || sType == 'ecmascript')) {
					var oElement	= document.body.appendChild(document.createElement("script"));
					oElement.type	= 'text/javascript';
					oElement.text	= this.firstChild.nodeValue;
				}
			}
		}
	});


	tag['XHTML_table'] = tag['XHTML_xhtml'].extend(function() {
		tag['XHTML_xhtml'].apply(this,arguments);

		this.tHead		= null;
		this.tBodies	= new b$.bdom.NodeList();
		this.tFoot		= null;
		this.caption	= null;
		this.rows	= new b$.bdom.NodeList();
	}, {
		localName:'table',
		insertRow: function(idx) {
			var elm	= this.ownerDocument.createElementNS(this.namespaceURI, "tr");
			return idx ==-1 ? this.appendChild(elm) : this.insertBefore(elm, this.rows[idx]);
		},
		deleteRow: function(idx) {
			return this.removeChild(this.rows[idx]);
		},
		createCaption: function() {
		},
		deleteCaption: function() {
		},
		createTHead: function() {
		},
		deleteTHead: function() {
		},
		createTFoot: function() {
		},
		deleteTFoot: function() {
		}
	},{
		handlers: {
			'DOMNodeInserted': function(event) {
				if (event.target.parentNode == this) {
					if (event.target instanceof  tag['XHTML_caption'])
						this.caption = event.target;
					else if (event.target instanceof tag['XHTML_tbody'])
						this.tBodies.add(event.target);
					else if (event.target instanceof tag['XHTML_tfoot'])
						this.tFoot = event.target;
					else if (event.target instanceof tag['XHTML_thead'])
						this.tHead = event.target;
				}
			},
			'DOMNodeRemoved': function(event) {
				if (event.target.parentNode == this) {
					if (event.target instanceof tag['XHTML_caption'])
						this.caption = null;
					else if (event.target instanceof tag['XHTML_tbody'])
						this.tBodies.remove(event.target);
					else if (event.target instanceof tag['XHTML_tfoot'])
						this.tFoot = null;
					else if (event.target instanceof tag['XHTML_thead'])
						this.tHead = null;
				}
			}
		}
	});


	tag['XHTML_tbody'] = tag['XHTML_xhtml'].extend(function() {
		tag['XHTML_xhtml'].apply(this,arguments);
		this.rows = new b$.bdom.NodeList();
	}, {
		localName: 'tbody',
		rows: null,
		insertRow: function(idx){
			var elm	= this.ownerDocument.createElementNS(this.namespaceURI, 'tr');
			return idx ==-1 ? this.appendChild(elm) : this.insertBefore(elm, this.rows[idx]);
		},
		deleteRow: function(idx){
			return this.removeChild(this.rows[idx]);
		}
	},{
		handlers:{
			'DOMNodeInserted':	function(event) {
				if (event.target.parentNode == this)
					if (event.target instanceof tag['XHTML_tr'])
						this.rows.add(event.target);
			},
			'DOMNodeRemoved':	function(event) {
				if (event.target.parentNode == this)
					if (event.target instanceof tag['XHTML_tr'])
						this.rows.remove(event.target);
			}
		}
	});


	tag['XHTML_thead'] = tag['XHTML_tbody'].extend(null, {
		localName:'thead'
	},{
		handlers: tag['XHTML_tbody'].handlers
	});

	
	tag['XHTML_tfoot'] = tag['XHTML_tbody'].extend(null, {
		localName:'tfoot'
	},{
		handlers: tag['XHTML_tbody'].handlers
	});


	tag['XHTML_tr'] = tag['XHTML_xhtml'].extend(function(){
		tag['XHTML_xhtml'].apply(this,arguments);
		this.cells = new b$.bdom.NodeList();
	}, {
		localName: 'tr',
		cells: null,
		insertCell: function(idx){
			var elm	= this.ownerDocument.createElementNS(this.namespaceURI, 'td');
			return idx ==-1 ? this.appendChild(elm) : this.insertBefore(elm, this.cells[idx]);
		},
		deleteCell: function(idx){
			return this.removeChild(this.cells[idx]);
		}
	},{
		handlers:{
			// 'mouseover': function(event) {
			// 	this.getDisplay().style.backgroundColor='#f00';
			// },
			// 'mouseout': function(event) {
			// 	this.getDisplay().style.backgroundColor='';
			// },
			'DOMNodeInserted': function(event) {
				if (event.target.parentNode == this)
					if (event.target instanceof tag['XHTML_td'] || event.target instanceof tag['XHTML_th'])
						this.cells.add(event.target);
			},
			'DOMNodeRemoved': function(event) {
				if (event.target.parentNode == this)
					if (event.target instanceof tag['XHTML_td'] || event.target instanceof tag['XHTML_th'])
						this.cells.remove(event.target);
			}
		}
	});


	tag['XHTML_a'] = tag['XHTML_xhtml'].extend(null, {
		localName:'a'
	},{
		handlers:{
			'focus': function(event){
			},
			'blur': function(event){
			},
			'click': function(event){
			},
			'DOMActivate': function(event){
			}
		}
	});

};