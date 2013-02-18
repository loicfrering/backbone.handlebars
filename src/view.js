var HandlebarsView = Backbone.View.extend({
  render: function() {
    var context = this.context();

    if (_.isString(this.template)) {
      this.template = Handlebars.compile(this.template, {knownHelpersOnly: true});
    }

    if (_.isFunction(this.template)) {
      var html = this.template(context, {data: {view: this}});
      this.$el.html(html);
    }
    this.renderNestedViews();
    return this;
  },

  renderNestedViews: function() {
    _.each(this.nestedViews, function(nestedView, id) {
      this.resolveViewClass(nestedView.name, _.bind(function(viewClass) {
        this.renderNestedView(id, viewClass, nestedView.options);
      }, this));
    }, this);
  },

  renderNestedView: function(id, viewClass, options) {
    var $el = this.$('#' + id);
    if ($el.size() === 1) {
      var view = new viewClass(options);
      $el.replaceWith(view.$el);
      view.render();
    }
  },

  resolveViewClass: function(name, callback) {
    if (_.isFunction(name)) {
      return callback(name);
    } else if (_.isString(name)) {
      var parts, i, len, obj;
      parts = name.split(".");
      for (i = 0, len = parts.length, obj = window; i < len; ++i) {
          obj = obj[parts[i]];
      }
      if (obj) {
        return callback(obj);
      } else if (typeof require !== 'undefined') {
        return require([name], callback);
      }
    }
    throw new Error('Cannot resolve view "' + name + '"');
  },

  context: function() {
    return this.model || this.collection || {};
  }
});
