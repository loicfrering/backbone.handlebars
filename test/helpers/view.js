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

        window.MyView = {};
        window.MyView.Nested = Backbone.View.extend({
          render: function() {
            this.$el.html('Hello Nested World!');
          }
        });

        fn = Handlebars.compile('{{view "MyView.Nested"}}');
        fn().should.equal('<div>Hello Nested World!</div>');

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

      it('should require the view by its name if not found in the global window object', function(done) {
        window.require = function() {
          arguments.length.should.equal(2);
          arguments[0].should.deep.equal(['MyViewToRequire']);

          var MyViewToRequire = Backbone.View.extend({
            render: function() {
              this.$el.html('Hello World!');
            }
          });

          var callback = arguments[1];
          callback.should.be.an.instanceOf(Function);
          setTimeout(function() {
            callback.call(window, MyViewToRequire);
            done();
          }, 10);
        };

        var fn = Handlebars.compile('{{view "MyViewToRequire"}}');
        fn().should.equal('<div id="bbhbs-4"></div>');

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
