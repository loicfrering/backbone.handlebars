var originalNameLookup = Handlebars.JavaScriptCompiler.prototype.nameLookup;

Handlebars.JavaScriptCompiler.prototype.nameLookup = function(parent, name, type) {
  return parent + ".get ? " + parent + ".get('" + name + "') : " + originalNameLookup.apply(this, arguments);
};

Handlebars.registerHelper('view', function(name, options) {
  var view = new window[name](options.hash);
  view.render();
  return new Handlebars.SafeString(view.$el[0].outerHTML);
});

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var i = 0, ret = "", data;
  var current;

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if (context && typeof context === 'object') {
    if (context instanceof Array || context instanceof Backbone.Collection) {
      for (var j = context.length; i<j; i++) {
        if (data) { data.index = i; }
        current = context.at ? context.at(i) : context[i];
        ret = ret + fn(current, { data: data });
      }
    } else {
      for (var key in context) {
        if (context.hasOwnProperty(key)) {
          if (data) { data.key = key; }
          ret = ret + fn(context[key], {data: data});
          i++;
        }
      }
    }
  }

  if (i === 0) {
    ret = inverse(this);
  }

  return ret;
});
