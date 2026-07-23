export function createCache({ load }) {
  return {
    async get(key) {
      return load(key);
    },
  };
}
