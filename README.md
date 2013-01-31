Backbone.Handlebars
===================

[Backbone.Handlebars](http://loicfrering.github.com/backbone.handlebars/)
provides a solid integration of Handlebars into Backbone with:

* Support for Backbone.Model: `{{user.name}}` compiles to `user.get('name')`
* Support for Backbone.Collection: the `each` helper is able to iterate through
  a Backbone.Collection.
* Nested views: `<h1>User details</h1>{{view UserView model=user}}`
* HandlebarsView: an extended BackboneView that automate the rendering of your
  empowered Handlebars templates.

You can refer to the [project's website](http://loicfrering.github.com/backbone.handlebars/)
for a nice HTML documentation.

[![Build Status](https://secure.travis-ci.org/loicfrering/backbone.handlebars.png)](http://travis-ci.org/loicfrering/backbone.handlebars)

Download
--------

The raw sources can be navigated on [GitHub](https://github.com/loicfrering/backbone.handlebars).
The distributed sources can be found in the `dist/` directory or
downloaded directly via one of the following links:

* Production minified version: [backbone.handlebars.min.js (v0.1.0)](https://raw.github.com/loicfrering/backbone.handlebars/v0.1.0/dist/backbone.handlebars.min.js).
* Development version: [backbone.handlebars.js (v0.1.0)](https://raw.github.com/loicfrering/backbone.handlebars/v0.1.0/dist/backbone.handlebars.js).

You can also use [Bower](http://twitter.github.com/bower/) to install
backbone.handlebars:

    $ bower install backbone.handlebars --save

Support for Backbone.Model
--------------------------

Backbone.Handlebars extends Handlebars to support fetching Backbone.Model
attributes through `model.get(attribute)`:

```javascript
var user = new Backbone.Model({name: 'World'});
var fn = Handlebars.compile('Hello {{name}}!');
fn(user);
// Hello World!
```

Notice that we directly pass the user as context and not `user.toJSON()`.
Instead of using the dot notation `user.name`, it will detect that we are
managing a Backbone.Model and use `user.get('name')`.

Support for Backbone.Collection
-------------------------------

Backbone.Handlebars override the default `each` helper to support looping
through a Backbone.Collection:

```javascript
var numbers = new Backbone.Collection(['one', 'two', 'three', 'four']);
var fn = Handlebars.compile('<ul>{{#each numbers}}<li>{{number}}</li>{{/each}}</ul>');
fn({numbers: numbers});
// <ul><li>one</li><li>two</li><li>three</li><li>four</li></ul>
```

Nested views
------------

```javascript
var HelloView = Backbone.View.extend({
  render: function() {
    this.$el.html('Hello ' + this.model.get('name') + '!');
  }
});

var fn = Handlebars.compile('{{view HelloView model=user tagName="h1"}}');
fn({
  user: {name: 'World'},
  HelloView: HelloView
});
// <h1>Hello World!</h1>
```

HandlebarsView
--------------

```javascript
var User = Backbone.Model.extend();

var AppView = Backbone.HandlebarsView.extend({
  template: '<h1>Hello</h1>{{view "HelloView" model=this}}'
});

var HelloView = Backbone.HandlebarsView.extend({
  template: 'Hello {{name}}'
});

var app = new AppView({model: new User({name: 'Loïc'})});
app.render().$el.appendTo('#app');
```

Tests
-----

Backbone.Handlebars is [tested](https://github.com/loicfrering/backbone.handlebars/tree/master/test),
you can see its [test suite running online](test/).  Also, [Travis
CI](https://travis-ci.org/) takes care of continuously running this test suite:
[![Build Status](https://secure.travis-ci.org/loicfrering/backbone.handlebars.png)](http://travis-ci.org/loicfrering/backbone.handlebars).

License
-------

Copyright (c) 2013 [Loïc Frering](https://github.com/loicfrering), licensed
under the MIT license. See the LICENSE file for more informations.
