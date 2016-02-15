'use strict';

require('mocha');
var assert = require('assert');
var assemble = require('assemble-core');
var eachOf = require('./');
var app, collection, list;

describe('plugin', function() {
  describe('app', function() {
    beforeEach(function() {
      app = assemble();
      app.use(eachOf());
    });

    it('should throw an error when collection is not defined', function(cb) {
      app.eachOf(null, function() {}, function(err) {
        assert(err);
        assert.equal(err.message, 'expected collection name to be a string');
        cb();
      });
    });

    it('should throw an error when no iterator is given', function(cb) {
      app.eachOf('pages', null, function(err) {
        assert(err);
        assert.equal(err.message, 'app.eachOf is async and expects an iterator function');
        cb();
      });
    });

    it('should throw an error when no callback is given:', function(cb) {
      try {
        app.eachOf('foo', function() {});
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'app.eachOf is async and expects a callback function');
        cb();
      }
    });

    it('should error when a collection does not exist', function(cb) {
      app.eachOf('pages', function(view, key, next) {
         next();
      }, function(err) {
        assert(err);
        assert.equal(err.message, 'getViews cannot find collection: pages');
        cb();
      });
    });

    it('should iterate over the views in a collection', function(cb) {
      app.create('pages');

      app.pages('aaa', {content: 'this is aaa'});
      app.pages('bbb', {content: 'this is bbb'});
      app.pages('ccc', {content: 'this is ccc'});
      var count = 0;

      app.eachOf('pages', function(view, key, next) {
         count++;
         next();
      }, function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });
  });

  describe('view collection', function() {
    beforeEach(function() {
      app = assemble();
      app.create('pages');
      app.pages.use(eachOf());
    });

    it('should throw an error when no iterator is given', function(cb) {
      app.pages.eachOf(null, function(err) {
        assert(err);
        assert.equal(err.message, 'app.pages.eachOf is async and expects an iterator function');
        cb();
      });
    });

    it('should throw an error when no callback is given:', function(cb) {
      try {
        app.pages.eachOf('foo');
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'app.pages.eachOf is async and expects a callback function');
        cb();
      }
    });

    it('should iterate over the views in a collection', function(cb) {
      app.pages('aaa', {content: 'this is aaa'});
      app.pages('bbb', {content: 'this is bbb'});
      app.pages('ccc', {content: 'this is ccc'});
      var count = 0;

      app.pages.eachOf(function(view, key, next) {
         count++;
         next();
      }, function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });
  });

  describe('collection', function() {
    beforeEach(function() {
      app = assemble();
      collection = new app.Collection();
      collection.use(eachOf());
    });

    it('should throw an error when no iterator is given', function(cb) {
      collection.eachOf(null, function(err) {
        assert(err);
        assert.equal(err.message, 'collection.eachOf is async and expects an iterator function');
        cb();
      });
    });

    it('should throw an error when no callback is given:', function(cb) {
      try {
        collection.eachOf('foo');
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'collection.eachOf is async and expects a callback function');
        cb();
      }
    });

    it('should iterate over the views in a collection', function(cb) {
      collection.addItem('aaa', {content: 'this is aaa'});
      collection.addItem('bbb', {content: 'this is bbb'});
      collection.addItem('ccc', {content: 'this is ccc'});
      var count = 0;

      collection.eachOf(function(view, key, next) {
         count++;
         next();
      }, function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });
  });

  describe('list', function() {
    beforeEach(function() {
      app = assemble();
      list = new app.List();
      list.use(eachOf());
    });

    it('should throw an error when no iterator is given', function(cb) {
      list.eachOf(null, function(err) {
        assert(err);
        assert.equal(err.message, 'list.eachOf is async and expects an iterator function');
        cb();
      });
    });

    it('should throw an error when no callback is given:', function(cb) {
      try {
        list.eachOf('foo');
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'list.eachOf is async and expects a callback function');
        cb();
      }
    });

    it('should iterate over the views in a list', function(cb) {
      list.addItem('aaa', {content: 'this is aaa'});
      list.addItem('bbb', {content: 'this is bbb'});
      list.addItem('ccc', {content: 'this is ccc'});
      var count = 0;

      list.eachOf(function(item, key, next) {
         count++;
         next();
      }, function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });
  });
});

describe('plugin.app', function() {
  describe('app', function() {
    beforeEach(function() {
      app = assemble();
      app.use(eachOf.app());
    });

    it('should throw an error when collection is not defined', function(cb) {
      app.eachOf(null, function() {}, function(err) {
        assert(err);
        assert.equal(err.message, 'expected collection name to be a string');
        cb();
      });
    });

    it('should throw an error when no iterator is given', function(cb) {
      app.eachOf('pages', null, function(err) {
        assert(err);
        assert.equal(err.message, 'app.eachOf is async and expects an iterator function');
        cb();
      });
    });

    it('should throw an error when no callback is given:', function(cb) {
      try {
        app.eachOf('foo', function() {});
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'app.eachOf is async and expects a callback function');
        cb();
      }
    });

    it('should error when a collection does not exist', function(cb) {
      app.eachOf('pages', function(view, key, next) {
         next();
      }, function(err) {
        assert(err);
        assert.equal(err.message, 'getViews cannot find collection: pages');
        cb();
      });
    });

    it('should iterate over the views in a collection', function(cb) {
      app.create('pages');

      app.pages('aaa', {content: 'this is aaa'});
      app.pages('bbb', {content: 'this is bbb'});
      app.pages('ccc', {content: 'this is ccc'});
      var count = 0;

      app.eachOf('pages', function(view, key, next) {
         count++;
         next();
      }, function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });
  });
});

describe('plugin.views', function() {
  describe('view collection', function() {
    beforeEach(function() {
      app = assemble();
      app.create('pages');
      app.pages.use(eachOf.views());
    });

    it('should throw an error when no iterator is given', function(cb) {
      app.pages.eachOf(null, function(err) {
        assert(err);
        assert.equal(err.message, 'app.pages.eachOf is async and expects an iterator function');
        cb();
      });
    });

    it('should throw an error when no callback is given:', function(cb) {
      try {
        app.pages.eachOf('foo');
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'app.pages.eachOf is async and expects a callback function');
        cb();
      }
    });

    it('should iterate over the views in a collection', function(cb) {
      app.pages('aaa', {content: 'this is aaa'});
      app.pages('bbb', {content: 'this is bbb'});
      app.pages('ccc', {content: 'this is ccc'});
      var count = 0;

      app.pages.eachOf(function(view, key, next) {
         count++;
         next();
      }, function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });
  });
});

describe('plugin.collection', function() {
  describe('collection', function() {
    beforeEach(function() {
      app = assemble();
      collection = new app.Collection();
      collection.use(eachOf.collection());
    });

    it('should throw an error when no iterator is given', function(cb) {
      collection.eachOf(null, function(err) {
        assert(err);
        assert.equal(err.message, 'collection.eachOf is async and expects an iterator function');
        cb();
      });
    });

    it('should throw an error when no callback is given:', function(cb) {
      try {
        collection.eachOf('foo');
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'collection.eachOf is async and expects a callback function');
        cb();
      }
    });

    it('should iterate over the views in a collection', function(cb) {
      collection.addItem('aaa', {content: 'this is aaa'});
      collection.addItem('bbb', {content: 'this is bbb'});
      collection.addItem('ccc', {content: 'this is ccc'});
      var count = 0;

      collection.eachOf(function(view, key, next) {
         count++;
         next();
      }, function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });
  });
});

describe('plugin.list', function() {
  describe('list', function() {
    beforeEach(function() {
      app = assemble();
      list = new app.List();
      list.use(eachOf.list());
    });

    it('should throw an error when no iterator is given', function(cb) {
      list.eachOf(null, function(err) {
        assert(err);
        assert.equal(err.message, 'list.eachOf is async and expects an iterator function');
        cb();
      });
    });

    it('should throw an error when no callback is given:', function(cb) {
      try {
        list.eachOf('foo');
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'list.eachOf is async and expects a callback function');
        cb();
      }
    });

    it('should iterate over the views in a list', function(cb) {
      list.addItem('aaa', {content: 'this is aaa'});
      list.addItem('bbb', {content: 'this is bbb'});
      list.addItem('ccc', {content: 'this is ccc'});
      var count = 0;

      list.eachOf(function(item, key, next) {
         count++;
         next();
      }, function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });
  });
});
