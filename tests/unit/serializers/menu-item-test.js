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
    let record = store.createRecord('menu-item', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
