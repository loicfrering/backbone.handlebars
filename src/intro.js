(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['backbone', 'Handlebars'], factory);
	} else {
	 	// Browser globals
	 	factory(Backbone, Handlebars);
	}
}(function(Backbone, Handlebars) {
