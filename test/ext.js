window.MyView = null;

describe('HandlebarsExt', function() {

  describe('nameLookup', function() {

    it('should compile to JavaScript that uses parent.get() instead of dot notation if defined', function() {
      var compiler = new Handlebars.JavaScriptCompiler();
      compiler.nameLookup('foo', 'bar').should.equal('foo.get ? foo.get(\'bar\') : foo.bar');
      compiler.nameLookup('user', 'name').should.equal('user.get ? user.get(\'name\') : user.name');
    });

    it('should invoke parent.get if defined', function() {
      var fn = Handlebars.compile('{{user.name}}');
      var context = {
        user: new Backbone.Model({name: 'Loïc'})
      };

      fn(context).should.equal('Loïc');
    });

    it('should fallback to dot notation if parent.get is not defined', function() {
      var fn = Handlebars.compile('{{user.name}}');
      var context = {
        user: {
          name: 'Loïc'
        }
      };

      fn(context).should.equal('Loïc');
    });
  });

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

  describe('each helper', function() {

    it('should iterate through an array', function() {
      var numbers = ['one', 'two', 'three', 'four'];
      var fn = Handlebars.compile('<ul>{{#each numbers}}<li>{{this}}</li>{{/each}}</ul>');
      fn({numbers: numbers}).should.equal('<ul><li>one</li><li>two</li><li>three</li><li>four</li></ul>');
    });

    it('should iterate through object properties', function() {
      var numbers = {first: 'one', second: 'two', third: 'three', fourth: 'four'};
      var fn = Handlebars.compile('<ul>{{#each numbers}}<li>{{this}}</li>{{/each}}</ul>');
      fn({numbers: numbers}).should.equal('<ul><li>one</li><li>two</li><li>three</li><li>four</li></ul>');
    });

    it('should iterate through a Backbone.Collection', function() {
      var Num = Backbone.Model.extend();
      var Numbers = Backbone.Collection.extend({
        model: Num
      });

      var numbers = new Numbers([{label: 'one'}, {label: 'two'}, {label: 'three'}, {label: 'four'}]);
      var fn = Handlebars.compile('<ul>{{#each numbers}}<li>{{label}}</li>{{/each}}</ul>');
      fn({numbers: numbers}).should.equal('<ul><li>one</li><li>two</li><li>three</li><li>four</li></ul>');
    });
  });
});
