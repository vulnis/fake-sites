var goog=goog||{};
goog.DEBUG=false;
goog.inherits=function(d,e){function f(){}f.prototype=e.prototype;
d.superClass_=e.prototype;
d.prototype=new f();
d.prototype.constructor=d
};
if(!goog.userAgent){goog.userAgent=(function(){var c="";
if("undefined"!==typeof navigator&&navigator&&"string"==typeof navigator.userAgent){c=navigator.userAgent
}var d=c.indexOf("Opera")==0;
return{jscript:{HAS_JSCRIPT:"ScriptEngine" in this},OPERA:d,IE:!d&&c.indexOf("MSIE")!=-1,WEBKIT:!d&&c.indexOf("WebKit")!=-1}
})()
}if(!goog.asserts){goog.asserts={assert:function(b){if(!b){throw Error("Assertion error")
}},fail:function(b){}}
}if(!goog.dom){goog.dom={};
goog.dom.DomHelper=function(b){this.document_=b||document
};
goog.dom.DomHelper.prototype.getDocument=function(){return this.document_
};
goog.dom.DomHelper.prototype.createElement=function(b){return this.document_.createElement(b)
};
goog.dom.DomHelper.prototype.createDocumentFragment=function(){return this.document_.createDocumentFragment()
}
}if(!goog.format){goog.format={insertWordBreaks:function(n,v){n=String(n);
var q=[];
var o=0;
var u=false;
var m=false;
var p=0;
var s=0;
for(var r=0,t=n.length;
r<t;
++r){var i=n.charCodeAt(r);
if(p>=v&&i!=32){q[o++]=n.substring(s,r);
s=r;
q[o++]=goog.format.WORD_BREAK;
p=0
}if(u){if(i==62){u=false
}}else{if(m){switch(i){case 59:m=false;
++p;
break;
case 60:m=false;
u=true;
break;
case 32:m=false;
p=0;
break
}}else{switch(i){case 60:u=true;
break;
case 38:m=true;
break;
case 32:p=0;
break;
default:++p;
break
}}}}q[o++]=n.substring(s);
return q.join("")
},WORD_BREAK:goog.userAgent.WEBKIT?"<wbr></wbr>":goog.userAgent.OPERA?"&shy;":"<wbr>"}
}if(!goog.i18n){goog.i18n={bidi:{detectRtlDirectionality:function(c,d){c=soyshim.$$bidiStripHtmlIfNecessary_(c,d);
return soyshim.$$bidiRtlWordRatio_(c)>soyshim.$$bidiRtlDetectionThreshold_
}}}
}goog.i18n.bidi.Dir={RTL:-1,UNKNOWN:0,LTR:1};
goog.i18n.bidi.toDir=function(b){if(typeof b=="number"){return b>0?goog.i18n.bidi.Dir.LTR:b<0?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.UNKNOWN
}else{return b?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR
}};
goog.i18n.BidiFormatter=function(b){this.dir_=goog.i18n.bidi.toDir(b)
};
goog.i18n.BidiFormatter.prototype.dirAttr=function(f,e){var d=soy.$$bidiTextDir(f,e);
return d&&d!=this.dir_?d<0?'dir="rtl"':'dir="ltr"':""
};
goog.i18n.BidiFormatter.prototype.endEdge=function(){return this.dir_<0?"left":"right"
};
goog.i18n.BidiFormatter.prototype.mark=function(){return((this.dir_>0)?"\u200E":(this.dir_<0)?"\u200F":"")
};
goog.i18n.BidiFormatter.prototype.markAfter=function(f,e){var d=soy.$$bidiTextDir(f,e);
return soyshim.$$bidiMarkAfterKnownDir_(this.dir_,d,f,e)
};
goog.i18n.BidiFormatter.prototype.spanWrap=function(g,h){g=String(g);
var e=soy.$$bidiTextDir(g,true);
var f=soyshim.$$bidiMarkAfterKnownDir_(this.dir_,e,g,true);
if(e>0&&this.dir_<=0){g='<span dir="ltr">'+g+"</span>"
}else{if(e<0&&this.dir_>=0){g='<span dir="rtl">'+g+"</span>"
}}return g+f
};
goog.i18n.BidiFormatter.prototype.startEdge=function(){return this.dir_<0?"right":"left"
};
goog.i18n.BidiFormatter.prototype.unicodeWrap=function(g,h){g=String(g);
var e=soy.$$bidiTextDir(g,true);
var f=soyshim.$$bidiMarkAfterKnownDir_(this.dir_,e,g,true);
if(e>0&&this.dir_<=0){g="\u202A"+g+"\u202C"
}else{if(e<0&&this.dir_>=0){g="\u202B"+g+"\u202C"
}}return g+f
};
goog.string={newLineToBr:function(c,d){c=String(c);
if(!goog.string.NEWLINE_TO_BR_RE_.test(c)){return c
}return c.replace(/(\r\n|\r|\n)/g,d?"<br />":"<br>")
},urlEncode:encodeURIComponent,NEWLINE_TO_BR_RE_:/[\r\n]/};
goog.string.StringBuffer=function(d,c){this.buffer_=goog.userAgent.jscript.HAS_JSCRIPT?[]:"";
if(d!=null){this.append.apply(this,arguments)
}};
goog.string.StringBuffer.prototype.bufferLength_=0;
goog.string.StringBuffer.prototype.append=function(j,f,h){if(goog.userAgent.jscript.HAS_JSCRIPT){if(f==null){this.buffer_[this.bufferLength_++]=j
}else{var g=(this.buffer_);
g.push.apply(g,arguments);
this.bufferLength_=this.buffer_.length
}}else{this.buffer_+=j;
if(f!=null){for(var i=1;
i<arguments.length;
i++){this.buffer_+=arguments[i]
}}}return this
};
goog.string.StringBuffer.prototype.clear=function(){if(goog.userAgent.jscript.HAS_JSCRIPT){this.buffer_.length=0;
this.bufferLength_=0
}else{this.buffer_=""
}};
goog.string.StringBuffer.prototype.toString=function(){if(goog.userAgent.jscript.HAS_JSCRIPT){var b=this.buffer_.join("");
this.clear();
if(b){this.append(b)
}return b
}else{return(this.buffer_)
}};
if(!goog.soy){goog.soy={renderAsElement:function(h,f,e,g){return(soyshim.$$renderWithWrapper_(h,f,g,true,e))
},renderAsFragment:function(h,f,e,g){return soyshim.$$renderWithWrapper_(h,f,g,false,e)
},renderElement:function(h,g,f,e){h.innerHTML=g(f,null,e)
},data:{}}
}goog.soy.data.SanitizedContentKind={HTML:{},JS:goog.DEBUG?{sanitizedContentJsStrChars:true}:{},JS_STR_CHARS:{},URI:{},ATTRIBUTES:goog.DEBUG?{sanitizedContentHtmlAttribute:true}:{},CSS:{},TEXT:{}};
goog.soy.data.SanitizedContent=function(){throw Error("Do not instantiate directly")
};
goog.soy.data.SanitizedContent.prototype.contentKind;
goog.soy.data.SanitizedContent.prototype.content;
goog.soy.data.SanitizedContent.prototype.toString=function(){return this.content
};
var soy={esc:{}};
var soydata={};
soydata.VERY_UNSAFE={};
var soyshim={$$DEFAULT_TEMPLATE_DATA_:{}};
soyshim.$$renderWithWrapper_=function(k,m,q,p,j){var o=q||document;
var r=o.createElement("div");
r.innerHTML=k(m||soyshim.$$DEFAULT_TEMPLATE_DATA_,undefined,j);
if(r.childNodes.length==1){var l=r.firstChild;
if(!p||l.nodeType==1){return(l)
}}if(p){return r
}var n=o.createDocumentFragment();
while(r.firstChild){n.appendChild(r.firstChild)
}return n
};
soyshim.$$bidiMarkAfterKnownDir_=function(h,e,g,f){return(h>0&&(e<0||soyshim.$$bidiIsRtlExitText_(g,f))?"\u200E":h<0&&(e>0||soyshim.$$bidiIsLtrExitText_(g,f))?"\u200F":"")
};
soyshim.$$bidiStripHtmlIfNecessary_=function(c,d){return d?c.replace(soyshim.$$BIDI_HTML_SKIP_RE_," "):c
};
soyshim.$$BIDI_HTML_SKIP_RE_=/<[^>]*>|&[^;]+;/g;
soyshim.$$bidiLtrChars_="A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF";
soyshim.$$bidiNeutralChars_="\u0000-\u0020!-@[-`{-\u00BF\u00D7\u00F7\u02B9-\u02FF\u2000-\u2BFF";
soyshim.$$bidiRtlChars_="\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
soyshim.$$bidiRtlDirCheckRe_=new RegExp("^[^"+soyshim.$$bidiLtrChars_+"]*["+soyshim.$$bidiRtlChars_+"]");
soyshim.$$bidiNeutralDirCheckRe_=new RegExp("^["+soyshim.$$bidiNeutralChars_+"]*$|^http://");
soyshim.$$bidiIsRtlText_=function(b){return soyshim.$$bidiRtlDirCheckRe_.test(b)
};
soyshim.$$bidiIsNeutralText_=function(b){return soyshim.$$bidiNeutralDirCheckRe_.test(b)
};
soyshim.$$bidiRtlDetectionThreshold_=0.4;
soyshim.$$bidiRtlWordRatio_=function(h){var f=0;
var g=0;
var i=h.split(" ");
for(var j=0;
j<i.length;
j++){if(soyshim.$$bidiIsRtlText_(i[j])){f++;
g++
}else{if(!soyshim.$$bidiIsNeutralText_(i[j])){g++
}}}return g==0?0:f/g
};
soyshim.$$bidiLtrExitDirCheckRe_=new RegExp("["+soyshim.$$bidiLtrChars_+"][^"+soyshim.$$bidiRtlChars_+"]*$");
soyshim.$$bidiRtlExitDirCheckRe_=new RegExp("["+soyshim.$$bidiRtlChars_+"][^"+soyshim.$$bidiLtrChars_+"]*$");
soyshim.$$bidiIsLtrExitText_=function(c,d){c=soyshim.$$bidiStripHtmlIfNecessary_(c,d);
return soyshim.$$bidiLtrExitDirCheckRe_.test(c)
};
soyshim.$$bidiIsRtlExitText_=function(c,d){c=soyshim.$$bidiStripHtmlIfNecessary_(c,d);
return soyshim.$$bidiRtlExitDirCheckRe_.test(c)
};
soy.StringBuilder=goog.string.StringBuffer;
soydata.SanitizedContentKind=goog.soy.data.SanitizedContentKind;
soydata.SanitizedHtml=function(){goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedHtml,goog.soy.data.SanitizedContent);
soydata.SanitizedHtml.prototype.contentKind=soydata.SanitizedContentKind.HTML;
soydata.SanitizedJs=function(){goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedJs,goog.soy.data.SanitizedContent);
soydata.SanitizedJs.prototype.contentKind=soydata.SanitizedContentKind.JS;
soydata.SanitizedJsStrChars=function(){goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedJsStrChars,goog.soy.data.SanitizedContent);
soydata.SanitizedJsStrChars.prototype.contentKind=soydata.SanitizedContentKind.JS_STR_CHARS;
soydata.SanitizedUri=function(){goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedUri,goog.soy.data.SanitizedContent);
soydata.SanitizedUri.prototype.contentKind=soydata.SanitizedContentKind.URI;
soydata.SanitizedHtmlAttribute=function(){goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedHtmlAttribute,goog.soy.data.SanitizedContent);
soydata.SanitizedHtmlAttribute.prototype.contentKind=soydata.SanitizedContentKind.ATTRIBUTES;
soydata.SanitizedCss=function(){goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedCss,goog.soy.data.SanitizedContent);
soydata.SanitizedCss.prototype.contentKind=soydata.SanitizedContentKind.CSS;
soydata.UnsanitizedText=function(b){this.content=String(b)
};
goog.inherits(soydata.UnsanitizedText,goog.soy.data.SanitizedContent);
soydata.UnsanitizedText.prototype.contentKind=soydata.SanitizedContentKind.TEXT;
soydata.$$makeSanitizedContentFactory_=function(c){function d(){}d.prototype=c.prototype;
return function(a){var b=new d();
b.content=String(a);
return b
}
};
soydata.markUnsanitizedText=function(b){return new soydata.UnsanitizedText(b)
};
soydata.VERY_UNSAFE.ordainSanitizedHtml=soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtml);
soydata.VERY_UNSAFE.ordainSanitizedJs=soydata.$$makeSanitizedContentFactory_(soydata.SanitizedJs);
soydata.VERY_UNSAFE.ordainSanitizedJsStrChars=soydata.$$makeSanitizedContentFactory_(soydata.SanitizedJsStrChars);
soydata.VERY_UNSAFE.ordainSanitizedUri=soydata.$$makeSanitizedContentFactory_(soydata.SanitizedUri);
soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute=soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtmlAttribute);
soydata.VERY_UNSAFE.ordainSanitizedCss=soydata.$$makeSanitizedContentFactory_(soydata.SanitizedCss);
soy.renderElement=goog.soy.renderElement;
soy.renderAsFragment=function(g,e,f,h){return goog.soy.renderAsFragment(g,e,h,new goog.dom.DomHelper(f))
};
soy.renderAsElement=function(g,e,f,h){return goog.soy.renderAsElement(g,e,h,new goog.dom.DomHelper(f))
};
soy.$$augmentMap=function(g,i){function h(){}h.prototype=g;
var f=new h();
for(var j in i){f[j]=i[j]
}return f
};
soy.$$checkMapKey=function(b){if((typeof b)!="string"){throw Error("Map literal's key expression must evaluate to string (encountered type \""+(typeof b)+'").')
}return b
};
soy.$$getMapKeys=function(f){var d=[];
for(var e in f){d.push(e)
}return d
};
soy.$$getDelTemplateId=function(b){return b
};
soy.$$DELEGATE_REGISTRY_PRIORITIES_={};
soy.$$DELEGATE_REGISTRY_FUNCTIONS_={};
soy.$$registerDelegateFn=function(i,l,k,g){var j="key_"+i+":"+l;
var h=soy.$$DELEGATE_REGISTRY_PRIORITIES_[j];
if(h===undefined||k>h){soy.$$DELEGATE_REGISTRY_PRIORITIES_[j]=k;
soy.$$DELEGATE_REGISTRY_FUNCTIONS_[j]=g
}else{if(k==h){throw Error('Encountered two active delegates with the same priority ("'+i+":"+l+'").')
}else{}}};
soy.$$getDelegateFn=function(h,e,g){var f=soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_"+h+":"+e];
if(!f&&e!=""){f=soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_"+h+":"]
}if(f){return f
}else{if(g){return soy.$$EMPTY_TEMPLATE_FN_
}else{throw Error('Found no active impl for delegate call to "'+h+":"+e+'" (and not allowemptydefault="true").')
}}};
soy.$$EMPTY_TEMPLATE_FN_=function(e,f,d){return""
};
soy.$$escapeHtml=function(b){if(b&&b.contentKind&&b.contentKind===goog.soy.data.SanitizedContentKind.HTML){goog.asserts.assert(b.constructor===soydata.SanitizedHtml);
return b.content
}return soy.esc.$$escapeHtmlHelper(b)
};
soy.$$cleanHtml=function(b){if(b&&b.contentKind&&b.contentKind===goog.soy.data.SanitizedContentKind.HTML){goog.asserts.assert(b.constructor===soydata.SanitizedHtml);
return b.content
}return soy.$$stripHtmlTags(b,soy.esc.$$SAFE_TAG_WHITELIST_)
};
soy.$$escapeHtmlRcdata=function(b){if(b&&b.contentKind&&b.contentKind===goog.soy.data.SanitizedContentKind.HTML){goog.asserts.assert(b.constructor===soydata.SanitizedHtml);
return soy.esc.$$normalizeHtmlHelper(b.content)
}return soy.esc.$$escapeHtmlHelper(b)
};
soy.$$HTML5_VOID_ELEMENTS_=new RegExp("^<(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)\\b");
soy.$$stripHtmlTags=function(i,j){if(!j){return String(i).replace(soy.esc.$$HTML_TAG_REGEX_,"").replace(soy.esc.$$LT_REGEX_,"&lt;")
}var f=String(i).replace(/\[/g,"&#91;");
var g=[];
f=f.replace(soy.esc.$$HTML_TAG_REGEX_,function(d,b){if(b){b=b.toLowerCase();
if(j.hasOwnProperty(b)&&j[b]){var a=d.charAt(1)==="/"?"</":"<";
var c=g.length;
g[c]=a+b+">";
return"["+c+"]"
}}return""
});
f=soy.esc.$$normalizeHtmlHelper(f);
var h=soy.$$balanceTags_(g);
f=f.replace(/\[(\d+)\]/g,function(a,b){return g[b]
});
return f+h
};
soy.$$balanceTags_=function(l){var g=[];
for(var k=0,i=l.length;
k<i;
++k){var h=l[k];
if(h.charAt(1)==="/"){var j=g.length-1;
while(j>=0&&g[j]!=h){j--
}if(j<0){l[k]=""
}else{l[k]=g.slice(j).reverse().join("");
g.length=j
}}else{if(!soy.$$HTML5_VOID_ELEMENTS_.test(h)){g.push("</"+h.substring(1))
}}}return g.reverse().join("")
};
soy.$$escapeHtmlAttribute=function(b){if(b&&b.contentKind){if(b.contentKind===goog.soy.data.SanitizedContentKind.HTML){goog.asserts.assert(b.constructor===soydata.SanitizedHtml);
return soy.esc.$$normalizeHtmlHelper(soy.$$stripHtmlTags(b.content))
}}return soy.esc.$$escapeHtmlHelper(b)
};
soy.$$escapeHtmlAttributeNospace=function(b){if(b&&b.contentKind){if(b.contentKind===goog.soy.data.SanitizedContentKind.HTML){goog.asserts.assert(b.constructor===soydata.SanitizedHtml);
return soy.esc.$$normalizeHtmlNospaceHelper(soy.$$stripHtmlTags(b.content))
}}return soy.esc.$$escapeHtmlNospaceHelper(b)
};
soy.$$filterHtmlAttributes=function(b){if(b&&b.contentKind===goog.soy.data.SanitizedContentKind.ATTRIBUTES){goog.asserts.assert(b.constructor===soydata.SanitizedHtmlAttribute);
return b.content.replace(/([^"'\s])$/,"$1 ")
}return soy.esc.$$filterHtmlAttributesHelper(b)
};
soy.$$filterHtmlElementName=function(b){return soy.esc.$$filterHtmlElementNameHelper(b)
};
soy.$$escapeJs=function(b){return soy.$$escapeJsString(b)
};
soy.$$escapeJsString=function(b){if(b&&b.contentKind===goog.soy.data.SanitizedContentKind.JS_STR_CHARS){goog.asserts.assert(b.constructor===soydata.SanitizedJsStrChars);
return b.content
}return soy.esc.$$escapeJsStringHelper(b)
};
soy.$$escapeJsValue=function(b){if(b==null){return" null "
}if(b.contentKind==goog.soy.data.SanitizedContentKind.JS){goog.asserts.assert(b.constructor===soydata.SanitizedJs);
return b.content
}switch(typeof b){case"boolean":case"number":return" "+b+" ";
default:return"'"+soy.esc.$$escapeJsStringHelper(String(b))+"'"
}};
soy.$$escapeJsRegex=function(b){return soy.esc.$$escapeJsRegexHelper(b)
};
soy.$$problematicUriMarks_=/['()]/g;
soy.$$pctEncode_=function(b){return"%"+b.charCodeAt(0).toString(16)
};
soy.$$escapeUri=function(d){if(d&&d.contentKind===goog.soy.data.SanitizedContentKind.URI){goog.asserts.assert(d.constructor===soydata.SanitizedUri);
return soy.$$normalizeUri(d)
}var c=soy.esc.$$escapeUriHelper(d);
soy.$$problematicUriMarks_.lastIndex=0;
if(soy.$$problematicUriMarks_.test(c)){return c.replace(soy.$$problematicUriMarks_,soy.$$pctEncode_)
}return c
};
soy.$$normalizeUri=function(b){return soy.esc.$$normalizeUriHelper(b)
};
soy.$$filterNormalizeUri=function(b){if(b&&b.contentKind==goog.soy.data.SanitizedContentKind.URI){goog.asserts.assert(b.constructor===soydata.SanitizedUri);
return soy.$$normalizeUri(b)
}return soy.esc.$$filterNormalizeUriHelper(b)
};
soy.$$escapeCssString=function(b){return soy.esc.$$escapeCssStringHelper(b)
};
soy.$$filterCssValue=function(b){if(b&&b.contentKind===goog.soy.data.SanitizedContentKind.CSS){goog.asserts.assert(b.constructor===soydata.SanitizedCss);
return b.content
}if(b==null){return""
}return soy.esc.$$filterCssValueHelper(b)
};
soy.$$filterNoAutoescape=function(b){if(b&&b.contentKind===goog.soy.data.SanitizedContentKind.TEXT){goog.asserts.fail("Tainted SanitizedContentKind.TEXT for |noAutoescape: `%s`",[b.content]);
return"zSoyz"
}return String(b)
};
soy.$$changeNewlineToBr=function(b){return goog.string.newLineToBr(String(b),false)
};
soy.$$insertWordBreaks=function(c,d){return goog.format.insertWordBreaks(String(c),d)
};
soy.$$truncate=function(f,e,d){f=String(f);
if(f.length<=e){return f
}if(d){if(e>3){e-=3
}else{d=false
}}if(soy.$$isHighSurrogate_(f.charAt(e-1))&&soy.$$isLowSurrogate_(f.charAt(e))){e-=1
}f=f.substring(0,e);
if(d){f+="..."
}return f
};
soy.$$isHighSurrogate_=function(b){return 55296<=b&&b<=56319
};
soy.$$isLowSurrogate_=function(b){return 56320<=b&&b<=57343
};
soy.$$bidiFormatterCache_={};
soy.$$getBidiFormatterInstance_=function(b){return soy.$$bidiFormatterCache_[b]||(soy.$$bidiFormatterCache_[b]=new goog.i18n.BidiFormatter(b))
};
soy.$$bidiTextDir=function(c,d){if(!c){return 0
}return goog.i18n.bidi.detectRtlDirectionality(c,d)?-1:1
};
soy.$$bidiDirAttr=function(d,f,e){return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute(soy.$$getBidiFormatterInstance_(d).dirAttr(f,e))
};
soy.$$bidiMarkAfter=function(e,g,f){var h=soy.$$getBidiFormatterInstance_(e);
return h.markAfter(g,f)
};
soy.$$bidiSpanWrap=function(e,f){var d=soy.$$getBidiFormatterInstance_(e);
return d.spanWrap(f+"",true)
};
soy.$$bidiUnicodeWrap=function(e,f){var d=soy.$$getBidiFormatterInstance_(e);
return d.unicodeWrap(f+"",true)
};
soy.esc.$$escapeUriHelper=function(b){return encodeURIComponent(String(b))
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_={"\x00":"\x26#0;","\x22":"\x26quot;","\x26":"\x26amp;","\x27":"\x26#39;","\x3c":"\x26lt;","\x3e":"\x26gt;","\x09":"\x26#9;","\x0a":"\x26#10;","\x0b":"\x26#11;","\x0c":"\x26#12;","\x0d":"\x26#13;"," ":"\x26#32;","-":"\x26#45;","/":"\x26#47;","\x3d":"\x26#61;","`":"\x26#96;","\x85":"\x26#133;","\xa0":"\x26#160;","\u2028":"\x26#8232;","\u2029":"\x26#8233;"};
soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_=function(b){return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_[b]
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_={"\x00":"\\x00","\x08":"\\x08","\x09":"\\t","\x0a":"\\n","\x0b":"\\x0b","\x0c":"\\f","\x0d":"\\r","\x22":"\\x22","\x26":"\\x26","\x27":"\\x27","/":"\\/","\x3c":"\\x3c","\x3d":"\\x3d","\x3e":"\\x3e","\\":"\\\\","\x85":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029","$":"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"};
soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_=function(b){return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_[b]
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_={"\x00":"\\0 ","\x08":"\\8 ","\x09":"\\9 ","\x0a":"\\a ","\x0b":"\\b ","\x0c":"\\c ","\x0d":"\\d ","\x22":"\\22 ","\x26":"\\26 ","\x27":"\\27 ","(":"\\28 ",")":"\\29 ","*":"\\2a ","/":"\\2f ",":":"\\3a ",";":"\\3b ","\x3c":"\\3c ","\x3d":"\\3d ","\x3e":"\\3e ","@":"\\40 ","\\":"\\5c ","{":"\\7b ","}":"\\7d ","\x85":"\\85 ","\xa0":"\\a0 ","\u2028":"\\2028 ","\u2029":"\\2029 "};
soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_=function(b){return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_[b]
};
soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_={"\x00":"%00","\x01":"%01","\x02":"%02","\x03":"%03","\x04":"%04","\x05":"%05","\x06":"%06","\x07":"%07","\x08":"%08","\x09":"%09","\x0a":"%0A","\x0b":"%0B","\x0c":"%0C","\x0d":"%0D","\x0e":"%0E","\x0f":"%0F","\x10":"%10","\x11":"%11","\x12":"%12","\x13":"%13","\x14":"%14","\x15":"%15","\x16":"%16","\x17":"%17","\x18":"%18","\x19":"%19","\x1a":"%1A","\x1b":"%1B","\x1c":"%1C","\x1d":"%1D","\x1e":"%1E","\x1f":"%1F"," ":"%20","\x22":"%22","\x27":"%27","(":"%28",")":"%29","\x3c":"%3C","\x3e":"%3E","\\":"%5C","{":"%7B","}":"%7D","\x7f":"%7F","\x85":"%C2%85","\xa0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86","\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89","\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"};
soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_=function(b){return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_[b]
};
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_=/[\x00\x22\x26\x27\x3c\x3e]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_=/[\x00\x22\x27\x3c\x3e]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_=/[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_=/[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_=/[\x00\x08-\x0d\x22\x24\x26-\/\x3a\x3c-\x3f\x5b-\x5e\x7b-\x7d\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_=/[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g;
soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_=/^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i;
soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_=/^(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_=/^(?!style|on|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|src|usemap)(?:[a-z0-9_$:-]*)$/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_=/^(?!script|style|title|textarea|xmp|no)[a-z0-9_$:-]*$/i;
soy.esc.$$escapeHtmlHelper=function(d){var c=String(d);
return c.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$normalizeHtmlHelper=function(d){var c=String(d);
return c.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$escapeHtmlNospaceHelper=function(d){var c=String(d);
return c.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$normalizeHtmlNospaceHelper=function(d){var c=String(d);
return c.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$escapeJsStringHelper=function(d){var c=String(d);
return c.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_,soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
};
soy.esc.$$escapeJsRegexHelper=function(d){var c=String(d);
return c.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_,soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
};
soy.esc.$$escapeCssStringHelper=function(d){var c=String(d);
return c.replace(soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_,soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_)
};
soy.esc.$$filterCssValueHelper=function(d){var c=String(d);
if(!soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_.test(c)){return"zSoyz"
}return c
};
soy.esc.$$normalizeUriHelper=function(d){var c=String(d);
return c.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_,soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_)
};
soy.esc.$$filterNormalizeUriHelper=function(d){var c=String(d);
if(!soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_.test(c)){return"#zSoyz"
}return c.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_,soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_)
};
soy.esc.$$filterHtmlAttributesHelper=function(d){var c=String(d);
if(!soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_.test(c)){return"zSoyz"
}return c
};
soy.esc.$$filterHtmlElementNameHelper=function(d){var c=String(d);
if(!soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_.test(c)){return"zSoyz"
}return c
};
soy.esc.$$HTML_TAG_REGEX_=/<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g;
soy.esc.$$LT_REGEX_=/</g;
soy.esc.$$SAFE_TAG_WHITELIST_={b:1,br:1,em:1,i:1,s:1,sub:1,sup:1,u:1};