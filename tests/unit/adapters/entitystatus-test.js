import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';

module('Unit | Adapter | entitystatus', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:entitystatus');
    assert.ok(adapter);
  });
});
