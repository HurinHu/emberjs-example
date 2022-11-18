import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-site/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { run } from '@ember/runloop';

module('Integration | Component | sidebar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    run(() => {
      this.owner.lookup('service:store').createRecord('menuItem',{name:'test1',description:'test1 description'});
      this.owner.lookup('service:store').createRecord('menuItem',{name:'test2',description:'test2 description'});
      this.owner.lookup('service:store').createRecord('menuItem',{name:'test3',description:'test3 description'});
    });
    const store = this.owner.lookup('service:store');
    store.findAll = async (model) => { 
      let data = [{"name":"test1","description":"test1 description","id":"1"},{"name":"test2","description":"test2 description","id":"2"},{"name":"test3","description":"test3 description","id":"3"}];
      return new Promise((resolve) => resolve(data));
    }
    await render(hbs`<Sidebar />`);
    assert.dom(this.element).hasText('test1 test2 test3');

  });
});
