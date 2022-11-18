import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';
import { run } from '@ember/runloop';

module('Unit | Model | menu item', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('menu-item', {});
    assert.ok(model);
  });

  test('should get menu item data', function(assert) {
    const item = run(() =>
      this.owner.lookup('service:store').createRecord('menuItem',{name:'test name',description:'test description'})
    );
    assert.equal(item.name, 'test name', 'get name');
    assert.equal(item.description, 'test description', 'get description');
  });
});
