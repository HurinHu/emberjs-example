import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';

module('Unit | Adapter | menu item', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:menu-item');
    assert.ok(adapter);
  });
});
