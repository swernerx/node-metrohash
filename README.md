# node-metrohash

Wrapper around [MetroHash](https://github.com/jandrewrogers/MetroHash).
 
[![Build Status](https://travis-ci.org/robertklep/node-metrohash.svg)](https://travis-ci.org/robertklep/node-metrohash)

### Installation

```
$ npm install metrohash
```

### Usage

The module exports 2 classes, `MetroHash64` and `MetroHash128`.

Both have the same interface:

``` javascript
// Constructor.
Hash([ seed:Number = 0 ]) : Object

// Update.
Hash#update(input : [String | Buffer]) : void

// Finalize and get hash values.
Hash#digest() : Buffer
```

### Examples

``` javascript
var MetroHash64 = require('metrohash').MetroHash64;

// Instantiate using seed 123.
var hash = new MetroHash64(123);

// Update using a string as input.
hash.update('Hello, World!');

// Finalize and convert to hex string.
var digest = hash.digest().toString('hex');
```
