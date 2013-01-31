// backbone.handlebars v0.1.0
//
// Copyright (c) 2013 Loïc Frering <loic.frering@gmail.com>
// Distributed under the MIT license

(function() {

var originalNameLookup = Handlebars.JavaScriptCompiler.prototype.nameLookup;

Handlebars.JavaScriptCompiler.prototype.nameLookup = function(parent, name, type) {
  return parent + ".get ? " + parent + ".get('" + name + "') : " + originalNameLookup.apply(this, arguments);
};

var HandlebarsView = Backbone.View.extend({
  render: function() {
    var context = this.context();

    if (_.isString(this.template)) {
      this.template = Handlebars.compile(this.template, {knownHelpersOnly: true});
    }

    if (_.isFunction(this.template)) {
      var html = this.template(context);
      this.$el.html(html);
    }
    return this;
  },

  context: function() {
    return this.model || this.collection || {};
  }
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
  if (_.isFunction(name)) {
    callback(name);
    return;
  } else if (_.isString(name)) {
    if (window[name]) {
      callback(window[name]);
      return;
    } else if (typeof require !== 'undefined') {
      require([name], callback);
      return;
    }
  }
  throw new Error('Cannot resolve view "' + name + '"');
}

  Backbone.HandlebarsView = HandlebarsView;
})();
