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
});
