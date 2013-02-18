describe('Helpers', function() {

  describe('view helper', function() {
    it('should attach an anchor in the view', function() {
      var fn = Handlebars.compile('{{view "MyViewToRequire"}}');
      fn({}, {data: {view: {}}}).should.equal('<div id="bbhbs-1"></div>');
    });

    it('should populate the nested views to be rendered in the parent view', function() {
      var fn = Handlebars.compile('{{view "MyNestedView1"}}{{view "MyNestedView2" name=name foo="bar"}}');
      var parentView = {};
      var html = fn({name: 'World'}, {data: {view: parentView}});

      html.should.equal('<div id="bbhbs-2"></div><div id="bbhbs-3"></div>');
      parentView.nestedViews.should.deep.equal({
        'bbhbs-2': {
          name: 'MyNestedView1',
          options: {}
        },
        'bbhbs-3': {
          name: 'MyNestedView2',
          options: {
            name: 'World',
            foo: 'bar'
          }
        }
      });
    });
  });
});
