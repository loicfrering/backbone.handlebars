var originalNameLookup = Handlebars.JavaScriptCompiler.prototype.nameLookup;

Handlebars.JavaScriptCompiler.prototype.nameLookup = function(parent, name, type) {
  return "(" + parent + ".get ? " + parent + ".get('" + name + "') : " + originalNameLookup.apply(this, arguments) + ")";
};
