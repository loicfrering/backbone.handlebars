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
  if (window[name]) {
    callback(window[name]);
  } else if (typeof require !== 'undefined') {
    require(name, callback);
  }
}
