import global from './global';

export default global.Set || class PseudoSet {
  constructor(values) {
    Object.defineProperties(this, {
      values: {
        value: [...values],
        writable: true,
        enumerable: false,
        configurable: false,
      },
    });
  }

  get size() {
    return this.values.length;
  }

  add(value) {
    if (!this.has(value)) this.values.push(value);
    return this;
  }

  has(value) {
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i] === value) return true;
    }

    return false;
  }

  values() {
    return [...this.values];
  }

  delete(value) {
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i] === value) {
        this.values.splice(i, 1);
        break;
      }
    }

    return this;
  }

  clear() {
    this.values = [];
    return this;
  }
};
