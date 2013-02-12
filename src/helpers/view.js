uid = 1;

Handlebars.registerHelper('view', function(name, options) {
  var viewClass, view;
  var id = 'bbhbs-' + uid++;
  resolveViewClass(name, function(resolvedViewClass) {
    viewClass = resolvedViewClass;

    var $el = $('#' + id);
    if ($el.size() === 1) {
      var view = new viewClass(options.hash);
      $el.replaceWith(view.$el);
      view.render();
    }
  });

  if (viewClass) {
    view = new viewClass(options.hash);
    view.render();
    return new Handlebars.SafeString(view.$el[0].outerHTML);
  } else {
    return new Handlebars.SafeString('<div id="' + id + '"></div>');
  }
});

function resolveViewClass(name, callback) {
  var parts, i, len, obj;
  if (_.isFunction(name)) {
    callback(name);
    return;
  } else if (_.isString(name)) {
    parts = name.split(".");
    for (i = 0, len = parts.length, obj = window; i < len; ++i) {
        obj = obj[parts[i]];
    }
    if (obj) {
      callback(obj);
      return;
    } else if (typeof require !== 'undefined') {
      require([name], callback);
      return;
    }
  }
  throw new Error('Cannot resolve view "' + name + '"');
}
