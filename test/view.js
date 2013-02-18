describe('HandlebarsView', function() {

  describe('rendering', function() {
    it('should return itself', function() {
      var view = new HandlebarsView();
      view.render().should.equal(view);
    });

    it('should render a template function', function() {
      var MyView = HandlebarsView.extend({
        template: function(context) {
          context.should.deep.equal({name: 'World', foo: 'bar'});
          return 'Hello ' + context.name + '!';
        }
      });

      var view = new MyView({model: {name: 'World', foo: 'bar'}});
      view.render().$el.html().should.equal('Hello World!');
    });

    it('should render a string template', function() {
      var originalCompile = Handlebars.compile;
      Handlebars.compile = function(template) {
        return function(context) {
          context.should.deep.equal({name: 'World', foo: 'bar'});
          return template.replace('{{name}}', context.name);
        };
      };

      var MyView = HandlebarsView.extend({
        template: 'Hello {{name}}!'
      });

      var view = new MyView({model: {name: 'World', foo: 'bar'}});
      view.render().$el.html().should.equal('Hello World!');

      Handlebars.compile = originalCompile;
    });
  });

  describe('context', function() {
    it('should use this.model as context if defined', function() {
      var view = new HandlebarsView({model: {name: 'World'}});
      view.context().should.deep.equal({name: 'World'});
    });

    it('should use this.collection if defined and this.model undefined', function() {
      var view = new HandlebarsView({collection: ['World']});
      view.context().should.deep.equal(['World']);

      view = new HandlebarsView({model: {name: 'World'}, collection: ['World']});
      view.context().should.deep.equal({name: 'World'});
    });

    it('should default to {} when this.collection and this.model are undefined', function() {
      var view = new HandlebarsView();
      view.context().should.deep.equal({});
    });
  });
});
