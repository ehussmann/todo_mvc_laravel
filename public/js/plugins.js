// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// Place any jQuery/helper plugins in here.

/**
 * Backbone localStorage Adapter
 * Version 1.0
 *
 * https://github.com/jeromegn/Backbone.localStorage
 */
 //(function(a,b){typeof define=="function"&&define.amd?define(["underscore","backbone"],function(c,d){return b(c||a._,d||a.Backbone)}):b(_,Backbone)})(this,function(a,b){function c(){return((1+Math.random())*65536|0).toString(16).substring(1)}function d(){return c()+c()+"-"+c()+"-"+c()+"-"+c()+"-"+c()+c()+c()}return b.LocalStorage=window.Store=function(a){this.name=a;var b=this.localStorage().getItem(this.name);this.records=b&&b.split(",")||[]},a.extend(b.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(a){return a.id||(a.id=d(),a.set(a.idAttribute,a.id)),this.localStorage().setItem(this.name+"-"+a.id,JSON.stringify(a)),this.records.push(a.id.toString()),this.save(),this.find(a)},update:function(b){return this.localStorage().setItem(this.name+"-"+b.id,JSON.stringify(b)),a.include(this.records,b.id.toString())||this.records.push(b.id.toString()),this.save(),this.find(b)},find:function(a){return this.jsonData(this.localStorage().getItem(this.name+"-"+a.id))},findAll:function(){return a(this.records).chain().map(function(a){return this.jsonData(this.localStorage().getItem(this.name+"-"+a))},this).compact().value()},destroy:function(b){return this.localStorage().removeItem(this.name+"-"+b.id),this.records=a.reject(this.records,function(a){return a==b.id.toString()}),this.save(),b},localStorage:function(){return localStorage},jsonData:function(a){return a&&JSON.parse(a)}}),b.LocalStorage.sync=window.Store.sync=b.localSync=function(a,b,c){var d=b.localStorage||b.collection.localStorage,e,f=$.Deferred&&$.Deferred();switch(a){case"read":e=b.id!=undefined?d.find(b):d.findAll();break;case"create":e=d.create(b);break;case"update":e=d.update(b);break;case"delete":e=d.destroy(b)}return e?(c&&c.success&&c.success(e),f&&f.resolve()):(c&&c.error&&c.error("Record not found"),f&&f.reject()),c&&c.complete&&c.complete(e),f&&f.promise()},b.ajaxSync=b.sync,b.getSyncMethod=function(a){return a.localStorage||a.collection&&a.collection.localStorage?b.localSync:b.ajaxSync},b.sync=function(a,c,d){return b.getSyncMethod(c).apply(this,[a,c,d])},b.LocalStorage});


 /**
 * Backbone localStorage Adapter
 * https://github.com/jeromegn/Backbone.localStorage
 */

// (function() {
// // A simple module to replace `Backbone.sync` with *localStorage*-based
// // persistence. Models are given GUIDS, and saved into a JSON object. Simple
// // as that.

// // Hold reference to Underscore.js and Backbone.js in the closure in order
// // to make things work even if they are removed from the global namespace
// var _ = this._;
// var Backbone = this.Backbone;

// // Generate four random hex digits.
// function S4() {
//    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
// };

// // Generate a pseudo-GUID by concatenating random hexadecimal.
// function guid() {
//    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
// };

// // Our Store is represented by a single JS object in *localStorage*. Create it
// // with a meaningful name, like the name you'd give a table.
// // window.Store is deprectated, use Backbone.LocalStorage instead
// Backbone.LocalStorage = window.Store = function(name) {
//   this.name = name;
//   var store = this.localStorage().getItem(this.name);
//   this.records = (store && store.split(",")) || [];
// };

// _.extend(Backbone.LocalStorage.prototype, {

//   // Save the current state of the **Store** to *localStorage*.
//   save: function() {
//     this.localStorage().setItem(this.name, this.records.join(","));
//   },

//   // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
//   // have an id of it's own.
//   create: function(model) {
//     if (!model.id) {
//         model.id = guid();
//         model.set(model.idAttribute, model.id);
//     }
//     this.localStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
//     this.records.push(model.id.toString());
//     this.save();
//     return model.toJSON();
//   },

//   // Update a model by replacing its copy in `this.data`.
//   update: function(model) {
//     this.localStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
//     if (!_.include(this.records, model.id.toString())) this.records.push(model.id.toString()); this.save();
//     return model.toJSON();
//   },

//   // Retrieve a model from `this.data` by id.
//   find: function(model) {
//     return JSON.parse(this.localStorage().getItem(this.name+"-"+model.id));
//   },

//   // Return the array of all models currently in storage.
//   findAll: function() {
//     return _(this.records).chain()
//         .map(function(id){return JSON.parse(this.localStorage().getItem(this.name+"-"+id));}, this)
//         .compact()
//         .value();
//   },

//   // Delete a model from `this.data`, returning it.
//   destroy: function(model) {
//     this.localStorage().removeItem(this.name+"-"+model.id);
//     this.records = _.reject(this.records, function(record_id){return record_id == model.id.toString();});
//     this.save();
//     return model;
//   },

//   localStorage: function() {
//       return localStorage;
//   }

// });

// // localSync delegate to the model or collection's
// // *localStorage* property, which should be an instance of `Store`.
// // window.Store.sync and Backbone.localSync is deprectated, use Backbone.LocalStorage.sync instead
// Backbone.LocalStorage.sync = window.Store.sync = Backbone.localSync = function(method, model, options, error) {
//   var store = model.localStorage || model.collection.localStorage;

//   // Backwards compatibility with Backbone <= 0.3.3
//   if (typeof options == 'function') {
//     options = {
//       success: options,
//       error: error
//     };
//   }

//   var resp;

//   switch (method) {
//     case "read":    resp = model.id != undefined ? store.find(model) : store.findAll(); break;
//     case "create":  resp = store.create(model);                            break;
//     case "update":  resp = store.update(model);                            break;
//     case "delete":  resp = store.destroy(model);                           break;
//   }

//   if (resp) {
//     options.success(model, resp, options);
//   } else {
//     options.error(model, "Record not found", options);
//   }
// };

// Backbone.ajaxSync = Backbone.sync;

// Backbone.getSyncMethod = function(model) {
// 	if(model.localStorage || (model.collection && model.collection.localStorage))
// 	{
// 		return Backbone.localSync;
// 	}

// 	return Backbone.ajaxSync;
// };

// // Override 'Backbone.sync' to default to localSync,
// // the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
// Backbone.sync = function(method, model, options, error) {
// 	return Backbone.getSyncMethod(model).apply(this, [method, model, options, error]);
// };

// })();