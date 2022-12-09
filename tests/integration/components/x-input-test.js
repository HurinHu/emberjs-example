import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-site/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | x-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<XInput />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <XInput>
        template block text
      </XInput>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
