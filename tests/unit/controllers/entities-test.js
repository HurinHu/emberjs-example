import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';

module('Unit | Controller | entities', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:entities');
    assert.ok(controller);
  });
});
