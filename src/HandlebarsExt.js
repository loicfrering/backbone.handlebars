var originalNameLookup = Handlebars.JavaScriptCompiler.prototype.nameLookup;

Handlebars.JavaScriptCompiler.prototype.nameLookup = function(parent, name, type) {
  return parent + ".get ? " + parent + ".get('" + name + "') : " + originalNameLookup.apply(this, arguments);
};

Handlebars.registerHelper('view', function(name, options) {
  var view = new window[name](options.hash);
  return new Handlebars.SafeString(view.render().$el[0].outerHTML);
});
