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
