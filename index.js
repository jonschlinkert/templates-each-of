/*!
 * templates-each-of <https://github.com/jonschlinkert/templates-each-of>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var async = require('async');

/**
 * The main export is a function that takes `options` and returns a
 * "smart plugin" function to be registered with the `.use` method on the
 * application instance.
 *
 * A "smart plugin" function automatically detects the instance type: "app",
 * "collection", "view collection" or "list", and adds features or functionality
 * created specifically for that type, ensuring that any features added by the
 * plugin will work consistently regardless of where or how they are used.
 *
 * ```js
 * var eachOf = require('templates-each-of');
 * var templates = require('templates');
 * var app = templates();
 *
 * // register the plugin
 * app.use(eachOf());
 * ```
 * @name eachOf
 * @param {Object} `options`
 * @return {Function}
 * @api public
 */

function plugin(options) {
  return function fn(app) {
    if (this.isRegistered('templates-each-of')) return;
    if (this.isView || this.isItem) return;

    if (this.isViews) {
      this.define('eachOf', viewsPlugin);

    } else if (this.isCollection && !this.isList) {
      this.define('eachOf', collectionPlugin);

    } else if (this.isList) {
      this.define('eachOf', listPlugin);

    } else {
      this.define('eachOf', appPlugin);
    }
    return fn;
  }
}

plugin.app = function(/*options*/) {
  return function(/*application instance*/) {
    if (!this.isApp) return;
    this.define('eachOf', appPlugin);
  };
};

plugin.views = function(/*options*/) {
  return function(/*view collection instance*/) {
    if (!this.isViews) return;
    this.define('eachOf', viewsPlugin);
  };
};

plugin.collection = function(/*options*/) {
  return function(/*collection instance*/) {
    if (this.isCollection && !this.isList && !this.isViews) {
      this.define('eachOf', collectionPlugin);
    }
  };
};

plugin.list = function(/*options*/) {
  return function(/*list instance*/) {
    if (!this.isList) return;
    this.define('eachOf', listPlugin);
  };
};

/**
 * Adds an `eachOf` method to `app` that takes a collection `name`, an
 * iterator `fn` and `callback` as arguments.
 *
 * Use this only if you don't want to use the main export ("smart plugin"),
 * and only want to register the plugin on `app`,
 *
 * ```js
 * app.use(eachOf());
 *
 * app.eachOf('pages', function(view, key, next) {
 *   // `view` from whatever collection you passed
 *   // `key` is the view object key
 *   // call next when finished
 *
 *   // do some view stuff
 *   next();
 * }, function(err) {
 *   if (err) throw err;
 * });
 * ```
 * @name .eachOf.app
 * @param {String} `name` Name of the view collection to iterate over
 * @param {Function} `fn` Iterator function
 * @param {Function} `callback` Done function that exposes `err` as the only parameter.
 * @return {undefined}
 * @api public
 */

function appPlugin(name, fn, cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('app.eachOf is async and expects a callback function');
  }
  if (typeof fn !== 'function') {
    cb(new TypeError('app.eachOf is async and expects an iterator function'));
    return;
  }
  if (typeof name !== 'string') {
    cb(new TypeError('expected collection name to be a string'));
    return;
  }

  try {
    var collection = this.getViews(name);
    async.eachOf(collection, fn, cb);
  } catch (err) {
    cb(err);
  }
}

/**
 * Adds an `eachOf` method to view collections that takes an iterator
 * `fn` and `callback` as arguments.
 *
 * Use this only if you don't want to use the main export ("smart plugin"),
 * and only want to register the plugin on view collections
 *
 * ```js
 * app.create('pages');
 * app.pages.use(eachOf());
 *
 * app.pages.eachOf(function(page, key, next) {
 *   // `page` view object
 *   // `key` is the view object key
 *   // call next when finished
 *
 *   // do some view stuff
 *   next();
 * }, function(err) {
 *   if (err) throw err;
 * });
 * ```
 * @name .eachOf.views
 * @param {Function} `fn` Iterator function
 * @param {Function} `callback` Done function that exposes `err` as the only parameter.
 * @return {undefined}
 * @api public
 */

function viewsPlugin(fn, cb) {
  var name = this.options.plural;
  var method = 'app.' + name + '.eachOf';

  if (typeof cb !== 'function') {
    throw new TypeError(method + ' is async and expects a callback function');
  }
  if (typeof fn !== 'function') {
    cb(new TypeError(method + ' is async and expects an iterator function'));
    return;
  }
  async.eachOf(this.views, fn, cb);
}

/**
 * Adds an `eachOf` method to generic collections that takes an
 * iterator `fn` and `callback` as arguments.
 *
 * Use this only if you don't want to use the main export ("smart plugin"),
 * and only want to register the plugin on collections.
 *
 * ```js
 * var collection = app.collection();
 * collection.use(eachOf());
 *
 * collection.eachOf(function(item, key, next) {
 *   // `item` item object
 *   // `key` is the item object key
 *   // call next when finished
 *
 *   // do some collection item stuff
 *   next();
 * }, function(err) {
 *   if (err) throw err;
 * });
 * ```
 * @name .eachOf.collection
 * @param {Function} `fn` Iterator function
 * @param {Function} `callback` Done function that exposes `err` as the only parameter.
 * @return {undefined}
 * @api public
 */

function collectionPlugin(fn, cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('collection.eachOf is async and expects a callback function');
  }
  if (typeof fn !== 'function') {
    cb(new TypeError('collection.eachOf is async and expects an iterator function'));
    return;
  }
  async.eachOf(this.items, fn, cb);
}

/**
 * Adds an `eachOf` method to `List` that takes an iterator `fn`
 * and `callback` as arguments.
 *
 * Use this only if you don't want to use the main export ("smart plugin"),
 * and only want to register the plugin on lists.
 *
 * ```js
 * var list = new app.Collection();
 * list.use(eachOf());
 *
 * list.eachOf(function(item, key, next) {
 *   // `item` item object
 *   // `key` is the item object key
 *   // call next when finished
 *
 *   // do some list item stuff
 *   next();
 * }, function(err) {
 *   if (err) throw err;
 * });
 * ```
 * @name .eachOf.list
 * @param {Function} `fn` Iterator function
 * @param {Function} `callback` Done function that exposes `err` as the only parameter.
 * @return {undefined}
 * @api public
 */

function listPlugin(fn, cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('list.eachOf is async and expects a callback function');
  }
  if (typeof fn !== 'function') {
    cb(new TypeError('list.eachOf is async and expects an iterator function'));
    return;
  }
  async.eachOf(this.items, function(item, key, next) {
    fn(item, item.key, next);
  }, cb);
}

/**
 * Expose plugin
 */

module.exports = plugin;
