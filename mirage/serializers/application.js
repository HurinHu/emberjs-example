import { JSONAPISerializer } from 'miragejs';

export default JSONAPISerializer.extend({
  keyForAttribute(key) {
    return key;
  },
});
