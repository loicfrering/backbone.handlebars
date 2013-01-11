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
