import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';
import { hash } from 'rsvp';

module('Unit | Route | home', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:home');
    assert.ok(route);
  });

  test('get data for model()', function (assert) {
    const store = this.owner.lookup('service:store');
    let data = [{"name":"test1","description":"test1 description","id":1},{"name":"test2","description":"test2 description","id":2},{"name":"test3","description":"test3 description","id":3}];
    store.peekAll = async (model) => { 
      return data;
    }
    const model = () => {
      return hash({
        sidebarItems: data,
      });
    }
    let route = this.owner.lookup('route:home');
    assert.equal(route.model().then,model().then,"get data for model()");
  });
});
