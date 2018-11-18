/*!
 * jQuery Migrate - v1.3.0 - 2016-01-13
 * Copyright jQuery Foundation and other contributors
 */
(function(a){a.oldInit=a.fn.init
})(jQuery);
(function(t,F,j){t.migrateVersion="1.3.0";
var o={};
t.migrateWarnings=[];
t.migrateMute=true;
if(!t.migrateMute&&F.console&&F.console.log){F.console.log("JQMIGRATE: Logging is active")
}if(t.migrateTrace===j){t.migrateTrace=true
}t.migrateReset=function(){o={};
t.migrateWarnings.length=0
};
function H(N){var M=F.console;
if(!o[N]){o[N]=true;
t.migrateWarnings.push(N);
if(M&&M.warn&&!t.migrateMute){M.warn("JQMIGRATE: "+N);
if(t.migrateTrace&&M.trace){M.trace()
}}}}function r(O,Q,N,P){if(Object.defineProperty){try{Object.defineProperty(O,Q,{configurable:true,enumerable:true,get:function(){H(P);
return N
},set:function(R){H(P);
N=R
}});
return
}catch(M){}}t._definePropertyBroken=true;
O[Q]=N
}if(document.compatMode==="BackCompat"){H("jQuery is not compatible with Quirks Mode")
}var D=t("<input/>",{size:1}).attr("size")&&t.attrFn,J=t.attr,E=t.attrHooks.value&&t.attrHooks.value.get||function(){return null
},q=t.attrHooks.value&&t.attrHooks.value.set||function(){return j
},v=/^(?:input|button)$/i,n=/^[238]$/,K=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;
r(t,"attrFn",D||{},"jQuery.attrFn is deprecated");
t.attr=function(Q,O,R,P){var N=O.toLowerCase(),M=Q&&Q.nodeType;
if(P){if(J.length<4){H("jQuery.fn.attr( props, pass ) is deprecated")
}if(Q&&!n.test(M)&&(D?O in D:t.isFunction(t.fn[O]))){return t(Q)[O](R)
}}if(O==="type"&&R!==j&&v.test(Q.nodeName)&&Q.parentNode){H("Can't change the 'type' of an input or button in IE 6/7/8")
}if(!t.attrHooks[N]&&K.test(N)){t.attrHooks[N]={get:function(T,S){var V,U=t.prop(T,S);
return U===true||typeof U!=="boolean"&&(V=T.getAttributeNode(S))&&V.nodeValue!==false?S.toLowerCase():j
},set:function(T,V,S){var U;
if(V===false){t.removeAttr(T,S)
}else{U=t.propFix[S]||S;
if(U in T){T[U]=true
}T.setAttribute(S,S.toLowerCase())
}return S
}};
if(f.test(N)){H("jQuery.fn.attr('"+N+"') might use property instead of attribute")
}}return J.call(t,Q,O,R)
};
t.attrHooks.value={get:function(N,M){var O=(N.nodeName||"").toLowerCase();
if(O==="button"){return E.apply(this,arguments)
}if(O!=="input"&&O!=="option"){H("jQuery.fn.attr('value') no longer gets properties")
}return M in N?N.value:null
},set:function(M,N){var O=(M.nodeName||"").toLowerCase();
if(O==="button"){return q.apply(this,arguments)
}if(O!=="input"&&O!=="option"){H("jQuery.fn.attr('value', val) no longer sets properties")
}M.value=N
}};
var h,b,s=t.fn.init,x=t.parseJSON,u=/^\s*</,C=/^([^<]*)(<[\w\W]+>)([^>]*)$/;
t.fn.init=function(M,Q,P){var O,N;
if(M&&typeof M==="string"&&!t.isPlainObject(Q)&&(O=C.exec(t.trim(M)))&&O[0]){if(!u.test(M)){H("$(html) HTML strings must start with '<' character")
}if(O[3]){H("$(html) HTML text after last tag is ignored")
}if(O[0].charAt(0)==="#"){H("HTML string cannot start with a '#' character");
t.error("JQMIGRATE: Invalid selector string (XSS)")
}if(Q&&Q.context){Q=Q.context
}if(t.parseHTML){return s.call(this,t.parseHTML(O[2],Q&&Q.ownerDocument||Q||document,true),Q,P)
}}if(M==="#"){H("jQuery( '#' ) is not a valid selector");
M=[]
}N=s.apply(this,arguments);
if(M&&M.selector!==j){N.selector=M.selector;
N.context=M.context
}else{N.selector=typeof M==="string"?M:"";
if(M){N.context=M.nodeType?M:Q||document
}}return N
};
t.fn.init.prototype=t.fn;
t.parseJSON=function(M){if(!M){H("jQuery.parseJSON requires a valid JSON string");
return null
}return x.apply(this,arguments)
};
t.uaMatch=function(N){N=N.toLowerCase();
var M=/(chrome)[ \/]([\w.]+)/.exec(N)||/(webkit)[ \/]([\w.]+)/.exec(N)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(N)||/(msie) ([\w.]+)/.exec(N)||N.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(N)||[];
return{browser:M[1]||"",version:M[2]||"0"}
};
if(!t.browser){h=t.uaMatch(navigator.userAgent);
b={};
if(h.browser){b[h.browser]=true;
b.version=h.version
}if(b.chrome){b.webkit=true
}else{if(b.webkit){b.safari=true
}}t.browser=b
}r(t,"browser",t.browser,"jQuery.browser is deprecated");
t.boxModel=t.support.boxModel=(document.compatMode==="CSS1Compat");
r(t,"boxModel",t.boxModel,"jQuery.boxModel is deprecated");
r(t.support,"boxModel",t.support.boxModel,"jQuery.support.boxModel is deprecated");
t.sub=function(){function M(P,Q){return new M.fn.init(P,Q)
}t.extend(true,M,this);
M.superclass=this;
M.fn=M.prototype=this();
M.fn.constructor=M;
M.sub=this.sub;
M.fn.init=function O(Q,R){var P=t.fn.init.call(this,Q,R,N);
return P instanceof M?P:M(P)
};
M.fn.init.prototype=M.fn;
var N=M(document);
H("jQuery.sub() is deprecated");
return M
};
t.fn.size=function(){H("jQuery.fn.size() is deprecated; use the .length property");
return this.length
};
var m=false;
if(t.swap){t.each(["height","width","reliableMarginRight"],function(N,M){var O=t.cssHooks[M]&&t.cssHooks[M].get;
if(O){t.cssHooks[M].get=function(){var P;
m=true;
P=O.apply(this,arguments);
m=false;
return P
}
}})
}t.swap=function(R,Q,S,P){var O,N,M={};
if(!m){H("jQuery.swap() is undocumented and deprecated")
}for(N in Q){M[N]=R.style[N];
R.style[N]=Q[N]
}O=S.apply(R,P||[]);
for(N in Q){R.style[N]=M[N]
}return O
};
t.ajaxSetup({converters:{"text json":t.parseJSON}});
var I=t.fn.data;
t.fn.data=function(O){var N,M,P=this[0];
if(P&&O==="events"&&arguments.length===1){N=t.data(P,O);
M=t._data(P,O);
if((N===j||N===M)&&M!==j){H("Use of jQuery.fn.data('events') is deprecated");
return M
}}return I.apply(this,arguments)
};
var L=/\/(java|ecma)script/i;
if(!t.clean){t.clean=function(M,N,T,P){N=N||document;
N=!N.nodeType&&N[0]||N;
N=N.ownerDocument||N;
H("jQuery.clean() is deprecated");
var Q,O,R,U,S=[];
t.merge(S,t.buildFragment(M,N).childNodes);
if(T){R=function(V){if(!V.type||L.test(V.type)){return P?P.push(V.parentNode?V.parentNode.removeChild(V):V):T.appendChild(V)
}};
for(Q=0;
(O=S[Q])!=null;
Q++){if(!(t.nodeName(O,"script")&&R(O))){T.appendChild(O);
if(typeof O.getElementsByTagName!=="undefined"){U=t.grep(t.merge([],O.getElementsByTagName("script")),R);
S.splice.apply(S,[Q+1,0].concat(U));
Q+=U.length
}}}}return S
}
}var z=t.event.add,w=t.event.remove,p=t.event.trigger,a=t.fn.toggle,d=t.fn.live,y=t.fn.die,l=t.fn.load,g="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",i=new RegExp("\\b(?:"+g+")\\b"),G=/(?:^|\s)hover(\.\S+|)\b/,c=function(M){if(typeof(M)!=="string"||t.event.special.hover){return M
}if(G.test(M)){H("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'")
}return M&&M.replace(G,"mouseenter$1 mouseleave$1")
};
if(t.event.props&&t.event.props[0]!=="attrChange"){t.event.props.unshift("attrChange","attrName","relatedNode","srcElement")
}if(t.event.dispatch){r(t.event,"handle",t.event.dispatch,"jQuery.event.handle is undocumented and deprecated")
}t.event.add=function(P,N,O,Q,M){if(P!==document&&i.test(N)){H("AJAX events should be attached to document: "+N)
}z.call(this,P,c(N||""),O,Q,M)
};
t.event.remove=function(Q,O,P,M,N){w.call(this,Q,c(O)||"",P,M,N)
};
t.each(["load","unload","error"],function(N,M){t.fn[M]=function(){var O=Array.prototype.slice.call(arguments,0);
H("jQuery.fn."+M+"() is deprecated");
if(M==="load"&&typeof arguments[0]==="string"){return l.apply(this,arguments)
}O.splice(0,0,M);
if(arguments.length){return this.bind.apply(this,O)
}this.triggerHandler.apply(this,O);
return this
}
});
t.fn.toggle=function(Q,O){if(!t.isFunction(Q)||!t.isFunction(O)){return a.apply(this,arguments)
}H("jQuery.fn.toggle(handler, handler...) is deprecated");
var N=arguments,M=Q.guid||t.guid++,P=0,R=function(S){var T=(t._data(this,"lastToggle"+Q.guid)||0)%P;
t._data(this,"lastToggle"+Q.guid,T+1);
S.preventDefault();
return N[T].apply(this,arguments)||false
};
R.guid=M;
while(P<N.length){N[P++].guid=M
}return this.click(R)
};
t.fn.live=function(M,O,N){H("jQuery.fn.live() is deprecated");
if(d){return d.apply(this,arguments)
}t(this.context).on(M,this.selector,O,N);
return this
};
t.fn.die=function(M,N){H("jQuery.fn.die() is deprecated");
if(y){return y.apply(this,arguments)
}t(this.context).off(M,this.selector||"**",N);
return this
};
t.event.trigger=function(O,P,N,M){if(!N&&!i.test(O)){H("Global events are undocumented and deprecated")
}return p.call(this,O,P,N||document,M)
};
t.each(g.split("|"),function(N,M){t.event.special[M]={setup:function(){var O=this;
if(O!==document){t.event.add(document,M+"."+t.guid,function(){t.event.trigger(M,Array.prototype.slice.call(arguments,1),O,true)
});
t._data(this,M,t.guid++)
}return false
},teardown:function(){if(this!==document){t.event.remove(document,M+"."+t._data(this,M))
}return false
}}
});
t.event.special.ready={setup:function(){H("'ready' event is deprecated")
}};
var B=t.fn.andSelf||t.fn.addBack,k=t.fn.find;
t.fn.andSelf=function(){H("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
return B.apply(this,arguments)
};
t.fn.find=function(M){var N=k.apply(this,arguments);
N.context=this.context;
N.selector=this.selector?this.selector+" "+M:M;
return N
};
if(t.Callbacks){var A=t.Deferred,e=[["resolve","done",t.Callbacks("once memory"),t.Callbacks("once memory"),"resolved"],["reject","fail",t.Callbacks("once memory"),t.Callbacks("once memory"),"rejected"],["notify","progress",t.Callbacks("memory"),t.Callbacks("memory")]];
t.Deferred=function(N){var M=A(),O=M.promise();
M.pipe=O.pipe=function(){var P=arguments;
H("deferred.pipe() is deprecated");
return t.Deferred(function(Q){t.each(e,function(S,R){var T=t.isFunction(P[S])&&P[S];
M[R[1]](function(){var U=T&&T.apply(this,arguments);
if(U&&t.isFunction(U.promise)){U.promise().done(Q.resolve).fail(Q.reject).progress(Q.notify)
}else{Q[R[0]+"With"](this===O?Q.promise():this,T?[U]:arguments)
}})
});
P=null
}).promise()
};
M.isResolved=function(){H("deferred.isResolved is deprecated");
return M.state()==="resolved"
};
M.isRejected=function(){H("deferred.isRejected is deprecated");
return M.state()==="rejected"
};
if(N){N.call(M,M)
}return M
}
}})(jQuery,window);
(function(a){function b(){var c=Array.prototype.slice.apply(arguments);
if(c.length&&typeof c[0]==="string"){c[0]=c[0].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")
}return a.oldInit.apply(this,c)
}b.prototype=a.fn;
a.fn.init=b
})(jQuery);