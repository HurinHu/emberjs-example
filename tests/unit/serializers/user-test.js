import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';

module('Unit | Serializer | user', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('user');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let item = this.owner.lookup('service:store').modelFor('user');
    const json = {
      id: 4,
      attributes: {
        firstname: 'Tom',
        lastname: 'John',
        email: '',
        avatar: '',
      },
    };
    item.serialize = (snapshot, options) => {
      return json;
    };
    store.createRecord = (model, u) => {
      return item;
    };
    let record = store.createRecord('user', {});
    let serializedRecord = record.serialize();
    assert.ok(serializedRecord);
    assert.equal(serializedRecord, json, 'serializes json');
  });
});
