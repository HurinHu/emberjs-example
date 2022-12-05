import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';

module('Unit | Serializer | menu item', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('menu-item');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let item = this.owner.lookup('service:store').modelFor('menuItem');
    const json = {
      id: 4,
      attributes: {
        name: 'test4',
        description: 'test4 description',
      },
    };
    item.serialize = (snapshot, options) => {
      return json;
    };
    store.createRecord = (model, u) => {
      return item;
    };
    let record = store.createRecord('menuItem', {});
    let serializedRecord = record.serialize();
    assert.ok(serializedRecord);
    assert.equal(serializedRecord, json, 'serializes json');
  });
});
