import {
  assert,
  expect,
} from 'chai';

import partial, { _ } from '.';

describe('partial', () => {
  it('Should create a function from a function', () => {
    expect(partial(() => {})).to.be.a('function');
  });

  it('Should throw if provided a non-function', () => {
    assert.throws(
      () => partial('...'),
      'Expected a function for parameter `fn`',
    );
  });

  it('Should return the original function if no partials are provided', () => {
    const fn = () => {};
    expect(partial(fn)).to.equal(fn);
  });

  it('Should return a partialized function', () => {
    const fn = (a, b) => a + b;
    expect(partial(fn, 5)(1)).to.equal(6);
  });

  it('Should respect placeholders (1)', () => {
    const fn = (a, b, c) => `${a}-${b}-${c}`;
    expect(partial(fn, 'foo', partial, 'baz')('bar')).to.equal('foo-bar-baz');
  });

  it('Should respect placeholders (2)', () => {
    const fn = (a, b, c) => `${a}-${b}-${c}`;
    expect(partial(fn, _, _, 'baz')('foo', 'bar')).to.equal('foo-bar-baz');
  });

  it('Should respect placeholders (3, highly varied)', () => {
    const fn = (a, b, c, d, e, f, g) => `${a}-${b}-${c}-${d}-${e}-${f}-${g}`;
    expect(partial(fn, 'a', _, 'c', _, 'e', _, 'g')('b', 'd', 'f', 'h', 'j')).to.equal('a-b-c-d-e-f-g');
  });

  it('Should respect placeholders (4, too many placeholders 1)', () => {
    const fn = (a, b, c) => `${a}-${b}-${c}`;
    expect(partial(fn, 'a', _, _, _, _, _, _)('b')).to.equal('a-b-undefined');
  });

  it('Should respect placeholders (5, too many placeholders, 2)', () => {
    const fn = (a, b, c) => `${a}-${b}-${c}`;
    expect(partial(fn, 'a', _, 'c', _, _, _, _)('b')).to.equal('a-b-c');
  });

  it('Should respect placeholders (5, too many placeholders, 3)', () => {
    const fn = (a, b, c) => `${a}-${b}-${c}`;
    expect(partial(fn, 'a', _, _, 'd', _, _, _)('b')).to.equal('a-b-undefined');
  });

  it('Should respect placeholders (filling arity)', () => {
    const fn = (a, b, c) => `${a}-${b}-${c}`;
    expect(partial(fn, 'a', 'b', 'c')('d')).to.equal('a-b-c');
  });

  it('Should respect the `this` context (1)', () => {
    function method(a, b, c) {
      return `${this.prefix}-${a}-${b}-${c}`;
    }

    const object = {
      prefix: 'prefix',
      partial: partial(method, _, _, 'baz'),
    };

    expect(object.partial('foo', 'bar')).to.equal('prefix-foo-bar-baz');
  });

  it('Should respect the `this` context (2)', () => {
    class Foo {
      constructor(prefix) {
        this.prefix = prefix;
      }

      method(a, b, c) {
        return `${this.prefix}-${a}-${b}-${c}`;
      }
    }

    Foo.prototype.partial = partial(Foo.prototype.method, 'foo', 'bar');
    const instance = new Foo('prefix');
    expect(instance.partial('baz')).to.equal('prefix-foo-bar-baz');
  });
});
