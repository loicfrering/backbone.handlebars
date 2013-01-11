Handlebars.registerHelper('view', function(name, options) {
  var view = new window[name](options.hash);
  view.render();
  return new Handlebars.SafeString(view.$el[0].outerHTML);
});
