import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';

module('Unit | Model | menu item', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('menu-item', {});
    assert.ok(model);
  });
});
