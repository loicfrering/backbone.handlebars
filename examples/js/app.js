(function(Backbone) {

  var User = Backbone.Model.extend();

  var Users = Backbone.Collection.extend({
    model: User
  });

  var AppView = Backbone.HandlebarsView.extend({
    template: '<h1>Hello</h1>'                                  +
              '<ul>'                                            +
              ' {{#each this}}'                                 +
              '   {{view "HelloView" model=this tagName="li"}}' +
              ' {{/each}}'                                      +
              '</ul>'
  });

  var HelloView = Backbone.HandlebarsView.extend({
    tagName: 'p',
    template: 'Hello {{name}}',
    initialize: function() {
      this.model.on('change', this.render, this);
    }
  });
  window.HelloView = HelloView;

  var users = new Users([{name: 'One'}, {name: 'Two'}, {name: 'Three'}]);
  var app = new AppView({collection: users});
  app.render().$el.appendTo('#app');

})(Backbone);
