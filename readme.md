# templates-each-of [![NPM version](https://img.shields.io/npm/v/templates-each-of.svg)](https://www.npmjs.com/package/templates-each-of) [![Build Status](https://img.shields.io/travis/assemble/templates-each-of.svg)](https://travis-ci.org/assemble/templates-each-of)

> Assemble plugin that adds an async `eachOf` method for rendering each template in a collection. Uses the `.eachOf` method from the async library.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i templates-each-of --save
```

## Usage

```js
var eachOf = require('templates-each-of');
var templates = require('templates');
var app = templates();

app.use(eachOf());
```

See the [.eachOf docs](https://github.com/caolan/async#forEachOf) on the [async](https://github.com/caolan/async) lib for more details.

## API

### [eachOf](index.js#L36)

The main export is a function that takes `options` and returns a "smart plugin" function to be registered with the `.use` method on the application instance.

A "smart plugin" function automatically detects the instance type: "app",
"collection", "view collection" or "list", and adds features or functionality
created specifically for that type, ensuring that any features added by the
plugin will work consistently regardless of where or how they are used.

**Params**

* `options` **{Object}**
* `returns` **{Function}**

**Example**

```js
var eachOf = require('templates-each-of');
var templates = require('templates');
var app = templates();

// register the plugin
app.use(eachOf());
```

### [.eachOf.app](index.js#L115)

Adds an `eachOf` method to `app` that takes a collection `name`, an iterator `fn` and `callback` as arguments.

Use this only if you don't want to use the main export ("smart plugin"),
and only want to register the plugin on `app`,

**Params**

* `name` **{String}**: Name of the view collection to iterate over
* `fn` **{Function}**: Iterator function
* `callback` **{Function}**: Done function that exposes `err` as the only parameter.
* `returns` **{undefined}**

**Example**

```js
app.use(eachOf());

app.eachOf('pages', function(view, key, next) {
  // `view` from whatever collection you passed
  // `key` is the view object key
  // call next when finished

  // do some view stuff
  next();
}, function(err) {
  if (err) throw err;
});
```

### [.eachOf.views](index.js#L165)

Adds an `eachOf` method to view collections that takes an iterator `fn` and `callback` as arguments.

Use this only if you don't want to use the main export ("smart plugin"),
and only want to register the plugin on view collections

**Params**

* `fn` **{Function}**: Iterator function
* `callback` **{Function}**: Done function that exposes `err` as the only parameter.
* `returns` **{undefined}**

**Example**

```js
app.create('pages');
app.pages.use(eachOf());

app.pages.eachOf(function(page, key, next) {
  // `page` view object
  // `key` is the view object key
  // call next when finished

  // do some view stuff
  next();
}, function(err) {
  if (err) throw err;
});
```

### [.eachOf.collection](index.js#L208)

Adds an `eachOf` method to generic collections that takes an iterator `fn` and `callback` as arguments.

Use this only if you don't want to use the main export ("smart plugin"),
and only want to register the plugin on collections.

**Params**

* `fn` **{Function}**: Iterator function
* `callback` **{Function}**: Done function that exposes `err` as the only parameter.
* `returns` **{undefined}**

**Example**

```js
var collection = app.collection();
collection.use(eachOf());

collection.eachOf(function(item, key, next) {
  // `item` item object
  // `key` is the item object key
  // call next when finished

  // do some collection item stuff
  next();
}, function(err) {
  if (err) throw err;
});
```

### [.eachOf.list](index.js#L248)

Adds an `eachOf` method to `List` that takes an iterator `fn` and `callback` as arguments.

Use this only if you don't want to use the main export ("smart plugin"),
and only want to register the plugin on lists.

**Params**

* `fn` **{Function}**: Iterator function
* `callback` **{Function}**: Done function that exposes `err` as the only parameter.
* `returns` **{undefined}**

**Example**

```js
var list = new app.Collection();
list.use(eachOf());

list.eachOf(function(item, key, next) {
  // `item` item object
  // `key` is the item object key
  // call next when finished

  // do some list item stuff
  next();
}, function(err) {
  if (err) throw err;
});
```

## Related projects

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [assemble-render-file](https://www.npmjs.com/package/assemble-render-file): Assemble plugin for rendering views in a vinyl pipeline. | [homepage](https://github.com/jonschlinkert/assemble-render-file)
* [assemble-render-string](https://www.npmjs.com/package/assemble-render-string): Assemble plugin that adds a `.renderString` method for rendering a string with any registered engine. | [homepage](https://github.com/jonschlinkert/assemble-render-string)
* [assemble-streams](https://www.npmjs.com/package/assemble-streams): Assemble pipeline plugin for pushing a view collection into a vinyl stream. | [homepage](https://github.com/assemble/assemble-streams)

## Generate docs

Generate readme and API documentation with [verb][]:

```sh
$ npm i -d && npm run docs
```

Or, if [verb][] is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/templates-each-of/issues/new).

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the [MIT license](https://github.com/assemble/templates-each-of/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on February 14, 2016._