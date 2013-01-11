describe('Helpers', function() {

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
