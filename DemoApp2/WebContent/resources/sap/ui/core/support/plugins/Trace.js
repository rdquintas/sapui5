/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/support/Plugin'],function(q,P){"use strict";var T=P.extend("sap.ui.core.support.plugins.Trace",{constructor:function(s){P.apply(this,["sapUiSupportTrace","JavaScript Trace",s]);this._aEventIds=this.isToolPlugin()?[this.getId()+"Entry"]:[];if(this.isToolPlugin()){this._aLogEntries=[];this._iLogLevel=q.sap.log.Level.ALL;q.sap.require("sap.ui.core.format.DateFormat");this._oDateFormat=sap.ui.core.format.DateFormat.getDateTimeInstance()}else{var t=this;q.sap.log.setLevel(q.sap.log.Level.ALL);q.sap.log.addLogListener({onLogEntry:function(L){if(t.isActive()){s.sendEvent(t.getId()+"Entry",{"entry":L})}}})}}});T.prototype.onsapUiSupportTraceEntry=function(e){l(this,e.getParameter("entry"))};T.prototype.init=function(s){P.prototype.init.apply(this,arguments);if(!this.isToolPlugin()){return}var t=this;var r=sap.ui.getCore().createRenderManager();r.write("<div class='sapUiSupportToolbar'>");r.write("<button id='"+this.getId()+"-clear' class='sapUiSupportBtn'>Clear</button>");r.write("<label class='sapUiSupportLabel'>Filter:</label><input type='text' id='"+this.getId()+"-filter' class='sapUiSupportTxtFld'></input>");r.write("<label class='sapUiSupportLabel'>Log Level:</label><select id='"+this.getId()+"-loglevel' class='sapUiSupportTxtFld'>");r.write("<option value='0'>FATAL</option>");r.write("<option value='1'>ERROR</option>");r.write("<option value='2'>WARNING</option>");r.write("<option value='3'>INFO</option>");r.write("<option value='4'>DEBUG</option>");r.write("<option value='5'>TRACE</option>");r.write("<option value='6' selected=''>ALL</option>");r.write("</select>");r.write("</div><div class='sapUiSupportTraceCntnt'></div>");r.flush(this.$().get(0));r.destroy();this._fClearHandler=function(){l(t)};this._fLogLevelHandler=function(){t._iLogLevel=t.$("loglevel").val();var R=[];for(var i=0;i<t._aLogEntries.length;i++){if(a(t._filter,t._iLogLevel,t._aLogEntries[i])){R.push(g(t,t._aLogEntries[i]))}}l(t,R.join(""))};this._fFilterHandler=function(){t._filter=t.$("filter").val();t._filter=t._filter?t._filter.toLowerCase():"";var R=[];for(var i=0;i<t._aLogEntries.length;i++){if(a(t._filter,t._iLogLevel,t._aLogEntries[i])){R.push(g(t,t._aLogEntries[i]))}}l(t,R.join(""))};this.$("clear").bind("click",this._fClearHandler);this.$("filter").bind("change",this._fFilterHandler);this.$("loglevel").bind("change",this._fLogLevelHandler)};T.prototype.exit=function(s){if(this._fClearHandler){this.$("clear").unbind("click",this._fClearHandler);this._fClearHandler=null}if(this._fFilterHandler){this.$("filter").unbind("change",this._fFilterHandler);this._fFilterHandler=null}if(this._fLogLevelHandler){this.$("loglevel").unbind("change",this._fLogLevelHandler);this._fLogLevelHandler=null}P.prototype.exit.apply(this,arguments)};function l(p,e){var c=q(".sapUiSupportTraceCntnt",p.$());if(!e){c.html("");p._aLogEntries=[]}else if(typeof(e)==="string"){c.html(e);c[0].scrollTop=c[0].scrollHeight}else{e._levelInfo=b(e.level);if(a(p._filter,p._iLogLevel,e)){c.append(g(p,e));c[0].scrollTop=c[0].scrollHeight}p._aLogEntries.push(e)}};function g(p,e){var L=e._levelInfo;var s=" style='color:"+L[1]+";'";var r="<div class='sapUiSupportTraceEntry'><span class='sapUiSupportTraceEntryLevel'"+s+">"+L[0]+"</span><span class='sapUiSupportTraceEntryTime'"+s+">"+p._oDateFormat.format(new Date(e.timestamp))+"</span><span class='sapUiSupportTraceEntryMessage'>"+e.message+"</div>";return r};function a(f,L,e){var c=e._levelInfo;if(e._levelInfo[2]<=L){if(f){var p=f.split(" ");var r=true;for(var i=0;i<p.length;i++){r=r&&e.message.toLowerCase().indexOf(p[i])>=0||c[0].toLowerCase().indexOf(p[i])>=0}return r}return true}return false};function b(L){switch(L){case q.sap.log.Level.FATAL:return["FATAL","#E60000",L];case q.sap.log.Level.ERROR:return["ERROR","#E60000",L];case q.sap.log.Level.WARNING:return["WARNING","#FFAA00",L];case q.sap.log.Level.INFO:return["INFO","#000000",L];case q.sap.log.Level.DEBUG:return["DEBUG","#000000",L];case q.sap.log.Level.TRACE:return["TRACE","#000000",L]}return["unknown","#000000",L]};return T},true);
