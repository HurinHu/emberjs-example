import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';

module('Unit | Controller | application', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:application');
    assert.ok(controller);
  });

  test('toggle changes', function (assert) {
    let controller = this.owner.lookup('controller:application');
    assert.equal(controller.isExpand, false,"isExpand is false before toggle");
    controller.send('sidebarToggle');
    assert.equal(controller.isExpand, true,"isExpand is true after toggle");
  });

  test('resize trigger', function (assert) {
    let controller = this.owner.lookup('controller:application');
    controller.send('sidebarToggle');
    assert.equal(controller.isExpand, true,"isExpand is true before toggle");
    controller.resize();
    assert.equal(controller.isExpand, false,"isExpand is false after toggle");
  });
});
