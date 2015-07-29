var MetroHash64  = require('./index').MetroHash64;
var MetroHash128 = require('./index').MetroHash128;
var expect       = require('chai').expect;

const TESTVECTOR_S = '012345678901234567890123456789012345678901234567890123456789012';
const TESTVECTOR_B = new Buffer(TESTVECTOR_S);

const TESTS = [
  { cls : MetroHash64,            expected : '6B753DAE06704BAD' },
  { cls : MetroHash64,  seed : 0, expected : '6B753DAE06704BAD' },
  { cls : MetroHash64,  seed : 1, expected : '3B0D481CF4B9B8DF' },
  { cls : MetroHash128,           expected : 'C77CE2BFA4ED9F9B0548B2AC5074A297' },
  { cls : MetroHash128, seed : 0, expected : 'C77CE2BFA4ED9F9B0548B2AC5074A297' },
  { cls : MetroHash128, seed : 1, expected : '45A3CDB838199D7FBDD68D867A14ECEF' },
];

describe('Instantiation and method calling', function() {

  it('new MetroHash64() should work', function() {
    expect(function() { new MetroHash64(); }).to.not.throw();
  });

  it('MetroHash64() should work', function() {
    expect(function() { MetroHash64(); }).to.not.throw();
  });

  it('new MetroHash128() should work', function() {
    expect(function() { new MetroHash128(); }).to.not.throw();
  });

  it('MetroHash128() should work', function() {
    expect(function() { MetroHash128(); }).to.not.throw();
  });

  it('MetroHash64() should allow chaining', function() {
    expect(function() {
      new MetroHash64().update(TESTVECTOR_B).digest().toString('hex');
    }).to.not.throw();
  });

  it('MetroHash128() should allow chaining', function() {
    expect(function() {
      new MetroHash128().update(TESTVECTOR_B).digest().toString('hex');
    }).to.not.throw();
  });

});

describe('Test vectors', function() {

  TESTS.forEach(function(test) {
    var suffix = test.seed !== undefined ? ', ' + test.seed + ')' : ')';

    it('new ' + test.cls.name + '(String' + suffix, function() {
      var instance = new test.cls(test.seed);
      instance.update(TESTVECTOR_S);
      expect(instance.digest().toString('hex').toUpperCase()).to.equal(test.expected);
    });

    it(test.cls.name + '(String' + suffix, function() {
      var instance = test.cls(test.seed);
      instance.update(TESTVECTOR_S);
      expect(instance.digest().toString('hex').toUpperCase()).to.equal(test.expected);
    });

    it('new ' + test.cls.name + '(Buffer' + suffix, function() {
      var instance = new test.cls(test.seed);
      instance.update(TESTVECTOR_B);
      expect(instance.digest().toString('hex').toUpperCase()).to.equal(test.expected);
    });

    it(test.cls.name + '(Buffer' + suffix, function() {
      var instance = test.cls(test.seed);
      instance.update(TESTVECTOR_B);
      expect(instance.digest().toString('hex').toUpperCase()).to.equal(test.expected);
    });

    it(test.cls.name + '(String' + suffix + ' incremental', function() {
      var instance = test.cls(test.seed);
      TESTVECTOR_S.split('').forEach(function(c) {
        instance.update(c);
      });
      expect(instance.digest().toString('hex').toUpperCase()).to.equal(test.expected);
    });

    it(test.cls.name + '(Buffer' + suffix + ' incremental', function() {
      var instance = test.cls(test.seed);
      for (var i = 0; i < TESTVECTOR_B.length; i++) {
        instance.update(TESTVECTOR_B.slice(i, i + 1));
      }
      expect(instance.digest().toString('hex').toUpperCase()).to.equal(test.expected);
    });

    it(test.cls.name + '(String' + suffix + ' one shot', function() {
      var instance = test.cls(test.seed);
      expect(instance.hash(TESTVECTOR_S).toString('hex').toUpperCase()).to.equal(test.expected);
    });

    it(test.cls.name + '(Buffer' + suffix + ' one shot', function() {
      var instance = test.cls(test.seed);
      expect(instance.hash(TESTVECTOR_B).toString('hex').toUpperCase()).to.equal(test.expected);
    });

  });

});
