var HandlebarsView = Backbone.View.extend({
  render: function() {
    var context = this.model || this.collection || {};

    if (_.isString(this.template)) {
      this.template = Handlebars.compile(this.template, {knownHelpersOnly: true});
    }

    var html = this.template(context);
    this.$el.html(html);
    return this;
  }
});
