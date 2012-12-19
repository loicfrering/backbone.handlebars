(function(Backbone) {

  var User = Backbone.Model.extend({
  });

  var AppView = Backbone.HandlebarsView.extend({
    template: '<h1>Hello</h1>{{view "HelloView" model=this}}'
  });

  var HelloView = Backbone.HandlebarsView.extend({
    template: 'Hello {{name}}'
  });
  window.HelloView = HelloView;

  var app = new AppView({model: new User({name: 'Loïc'})});
  app.render().$el.appendTo('#app');

})(Backbone);
