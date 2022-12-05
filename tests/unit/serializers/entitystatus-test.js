import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';

module('Unit | Serializer | entitystatus', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('entitystatus');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('entitystatus', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
