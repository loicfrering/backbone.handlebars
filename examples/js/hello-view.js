define(function() {

  var HelloView = Backbone.HandlebarsView.extend({
    tagName: 'p',
    template: 'Hello {{name}}'
  });

  return HelloView;
});
