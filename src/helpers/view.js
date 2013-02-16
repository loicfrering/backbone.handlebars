uid = 1;

Handlebars.registerHelper('view', function(name, options) {
  var id = 'bbhbs-' + uid++;

  var parentView = options.data.view;
  parentView.nestedViews = parentView.nestedViews || {};
  parentView.nestedViews[id] = {
    name: name,
    options: options.hash
  };

  return new Handlebars.SafeString('<div id="' + id + '"></div>');
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
