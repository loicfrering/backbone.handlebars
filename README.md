Backbone.Handlebars
===================

This is a very early proof of concept for using nested Backbone views in your
Handlebars templates.

```javascript
var User = Backbone.Model.extend({
});

var AppView = Backbone.HandlebarsView.extend({
  template: '<h1>Hello</h1>{{view "HelloView" model=this}}'
});

var HelloView = Backbone.HandlebarsView.extend({
  template: 'Hello {{name}}'
});

var app = new AppView({model: new User({name: 'Loïc'})});
app.render().$el.appendTo('#app');
```

License
-------

Copyright (c) 2012 [Loïc Frering](https://github.com/loicfrering), licensed
under the MIT license. See the LICENSE file for more informations.
