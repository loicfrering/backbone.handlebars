window.MyView  = undefined;
window.require = undefined;

describe('Helpers', function() {

  describe('view helper', function() {

    describe('nested view', function() {

      it('should render a nested view defined in the window global object', function() {
        window.MyView = Backbone.View.extend({
          render: function() {
            this.$el.html('Hello World!');
          }
        });

        var fn = Handlebars.compile('{{view "MyView"}}');
        fn().should.equal('<div>Hello World!</div>');

        window.MyView = undefined;
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

        window.MyView = undefined;
      });
    });

    describe('view class resolution', function() {

      it('should require the view by its name if not found in the global window object', function() {
        window.require = function() {
          arguments.length.should.equal(2);
          arguments[0].should.equal('MyViewToRequire');

          var MyViewToRequire = Backbone.View.extend({
            render: function() {
              this.$el.html('Hello World!');
            }
          });

          arguments[1].should.be.an.instanceOf(Function);
          arguments[1].call(window, MyViewToRequire);
        };

        var fn = Handlebars.compile('{{view "MyViewToRequire"}}');
        fn().should.equal('<div>Hello World!</div>');

        window.require = undefined;
      });

      it('should directly instantiate a view class available in the context', function() {
        var MyView = Backbone.View.extend({
          render: function() {
            this.$el.html('Hello World!');
          }
        });

        var fn = Handlebars.compile('{{view MyView}}');
        fn({MyView: MyView}).should.equal('<div>Hello World!</div>');
      });

      it('should throw an error for an unresolvable view', function() {
        var fn = Handlebars.compile('{{view "MyView"}}');
        fn.should.throw(Error);
      });
    });
  });
});
