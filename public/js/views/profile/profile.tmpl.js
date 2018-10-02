export default function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}var params=__fest_context;var avatar=(function(){var __fest_buf="",__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn, __fest_params;try{__fest_buf+=(__fest_escapeHTML(params.user.avatar))}catch(e){__fest_log_error(e.message + "2");}return __fest_buf;})();var email=(function(){var __fest_buf="",__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn, __fest_params;try{__fest_buf+=(__fest_escapeHTML(params.user.email))}catch(e){__fest_log_error(e.message + "5");}return __fest_buf;})();__fest_buf+=("<section class=\"section profile\"><figure class=\"profile__avatar\"><form class=\"profile__form\">");try{__fest_attrs[0]=__fest_escapeHTML(avatar)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<img src=\"" + __fest_attrs[0] + "\" height=\"200\" width=\"200\" class=\"profile__img js-avatar\"/><input type=\"file\" class=\"js-upload-avatar\" name=\"avatar\"/></form><div class=\"warning signup__warning hidden js-warning-avatar\"></div></figure><article class=\"profile__info\"><div class=\"profile-row js-email-row\"><div class=\"profile__data\">Email:</div><div class=\"profile__data js-email-field\">");try{__fest_buf+=(__fest_escapeHTML(params.user.email))}catch(e){__fest_log_error(e.message + "22");}__fest_buf+=("</div><button class=\"profile__edit-button\">Edit</button></div><div class=\"profile-row hidden js-email-form\"><form name=\"email-form\"><label for=\"email\">Email:</label>");try{__fest_attrs[0]=__fest_escapeHTML(email)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input type=\"email\" name=\"email\" class=\"input signup__input\" id=\"email\" value=\"" + __fest_attrs[0] + "\" autocomplete=\"autocomplete\" autofocus=\"true\"/><div class=\"warning signup__warning hidden js-warning-email\"></div><input class=\"button signup__submit js-button-submit\" type=\"submit\" name=\"submit\" value=\"Submit\"/><button class=\"button signup__back-button js-button-cancel\">Cancel</button></form></div><div class=\"profile-row js-password-row\"><div class=\"profile__data\">Password:</div><div class=\"profile__data\">--</div><button class=\"profile__edit-button\">Edit</button></div><div class=\"profile-row hidden js-password-form\"><form name=\"password-form\"><label for=\"password-pass\">Password:</label><input type=\"password\" name=\"password\" class=\"input signup__input\" id=\"password-pass\" value=\"password\" autocomplete=\"autocomplete\" autofocus=\"true\"/><div class=\"warning signup__warning hidden js-warning-password\"></div><input class=\"button signup__submit js-button-submit\" type=\"submit\" name=\"submit\" value=\"Submit\"/><button class=\"button signup__back-button js-button-cancel\">Cancel</button></form></div><div class=\"profile-row js-score-row\"><div class=\"profile__data\">Score:</div><div class=\"profile__data\">");try{__fest_buf+=(__fest_escapeHTML(params.user.score))}catch(e){__fest_log_error(e.message + "65");}__fest_buf+=("</div></div><div class=\"profile__row\"><a href=\"\" class=\"button menu__button\">Menu</a></div></article></section>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}