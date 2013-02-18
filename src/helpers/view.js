uid = 1;

Handlebars.registerHelper('view', function(name, options) {
  var id = 'bbhbs-' + uid++;

  if (!options.data || !options.data.view) {
    throw new Error('A nested view must be defined in a HandlebarsView.');
  }
  var parentView = options.data.view;
  parentView.nestedViews = parentView.nestedViews || {};
  parentView.nestedViews[id] = {
    name: name,
    options: options.hash
  };

  return new Handlebars.SafeString('<div id="' + id + '"></div>');
});
