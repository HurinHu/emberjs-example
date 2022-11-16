import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';

module('Unit | Service | tool', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:tool');
    assert.ok(service);
  });
});
