describe('NestedViews', function() {
  describe('rendering', function() {
    it('should render a nested view', function() {
      window.MyNestedView = Backbone.View.extend({
        render: function() {
          this.$el.html('Hello World!');
        }
      });

      var MyView = HandlebarsView.extend({
        template: '{{view "MyNestedView"}}'
      });

      var view = new MyView();
      view.render();
      view.$el.html().should.equal('<div>Hello World!</div>');

      delete window.MyNestedView;
    });

    it('should pass helper\'s options to the nested view', function() {
      window.MyNestedView = Backbone.View.extend({
        initialize: function() {
          this.options.should.deep.equal({foo: 'bar', name: 'World'});
        },
        render: function() {
          this.$el.html('Hello ' + this.options.name + '!');
        }
      });

      var MyView = HandlebarsView.extend({
        template: '{{view "MyNestedView" name=name foo="bar"}}'
      });

      var view = new MyView({model: {name: 'World'}});
      view.render();
      view.$el.html().should.equal('<div>Hello World!</div>');

      delete window.MyNestedView;
    });
  });

  describe('view class resolution', function() {
    it('should directly instantiate a view class available in the context', function() {
      var MyNestedView = Backbone.View.extend({
        render: function() {
          this.$el.html('Hello World!');
        }
      });

      var MyView = HandlebarsView.extend({
        template: '{{view MyNestedView}}'
      });

      var view = new MyView({model: {MyNestedView: MyNestedView}});
      view.render();
      view.$el.html().should.equal('<div>Hello World!</div>');
    });

    it('should directly return a view class', function(done) {
      var MyView = Backbone.View.extend();
      HandlebarsView.prototype.resolveViewClass(MyView, function(viewClass) {
        viewClass.should.equal(MyView);
        done();
      });
    });

    it('should look for a view class in the window global object', function(done) {
      window.MyView = Backbone.View.extend();
      HandlebarsView.prototype.resolveViewClass('MyView', function(viewClass) {
        viewClass.should.equal(MyView);
        delete window.MyView;
        done();
      });
    });

    it('should look for a view class in a nested path of the window global object', function(done) {
      window.My = {Deep: {}};
      window.My.Deep.View = Backbone.View.extend();
      HandlebarsView.prototype.resolveViewClass('My.Deep.View', function(viewClass) {
        viewClass.should.equal(My.Deep.View);
        delete window.My;
        done();
      });
    });

    it('should require the view by its name if not found in the global window object', function(done) {
      var MyViewToRequire = Backbone.View.extend();

      window.require = function() {
        arguments.length.should.equal(2);
        arguments[0].should.deep.equal(['MyViewToRequire']);

        var callback = arguments[1];
        callback.should.be.an.instanceOf(Function);
        setTimeout(function() {
          callback.call(window, MyViewToRequire);
        }, 1);
      };

      HandlebarsView.prototype.resolveViewClass('MyViewToRequire', function(viewClass) {
        viewClass.should.equal(MyViewToRequire);
        delete window.MyView;
        done();
      });

      delete window.require;
    });

    it('should throw an error for an unresolvable view', function() {
      var MyView = HandlebarsView.extend({
        template: '{{view "MyNestedView"}}'
      });

      var view = new MyView();
      view.render.should.throw(Error);
    });
  });
});
