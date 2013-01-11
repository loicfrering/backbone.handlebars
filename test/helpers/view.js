window.MyView = null;

describe('Helpers', function() {

  describe('view helper', function() {

    it('should render a nested view', function() {
      window.MyView = Backbone.View.extend({
        render: function() {
          this.$el.html('Hello World!');
        }
      });

      var fn = Handlebars.compile('{{view "MyView"}}');
      fn().should.equal('<div>Hello World!</div>');
    });

    it('should pass helper\'s options to the nested view', function() {
      window.MyView = Backbone.View.extend({
        initialize: function() {
          this.options.should.deep.equal({foo: 'bar', name: 'World'});
        },
        render: function() {
          this.$el.html('Hello ' + this.options.name + '!');
        }
      });

      var fn = Handlebars.compile('{{view "MyView" name=name foo="bar"}}');
      fn({name: 'World'}).should.equal('<div>Hello World!</div>');
    });
  });
});
