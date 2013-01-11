Handlebars.registerHelper('view', function(name, options) {
  var viewClass;
  resolveViewClass(name, function(resolvedViewClass) {
    viewClass = resolvedViewClass;
  });

  var view = new viewClass(options.hash);
  view.render();
  return new Handlebars.SafeString(view.$el[0].outerHTML);
});

function resolveViewClass(name, callback) {
  if (_.isFunction(name)) {
    callback(name);
    return;
  } else if (_.isString(name)) {
    if (window[name]) {
      callback(window[name]);
      return;
    } else if (typeof require !== 'undefined') {
      require(name, callback);
      return;
    }
  }
  throw new Error('Cannot resolve view "' + name + '"');
}
