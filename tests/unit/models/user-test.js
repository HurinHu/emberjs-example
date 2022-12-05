import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';
import { run } from '@ember/runloop';

module('Unit | Model | user', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('user', {});
    assert.ok(model);
  });

  test('should get user data', function (assert) {
    const user = run(() =>
      this.owner.lookup('service:store').createRecord('user', {
        firstname: 'Tom',
        lastname: 'John',
        email: 'Tom.John@gmail.com',
        avatar: 'https://www.img.com/123.jpg',
      })
    );
    assert.equal(user.firstname, 'Tom', 'get first name');
    assert.equal(user.lastname, 'John', 'get last name');
    assert.equal(user.email, 'Tom.John@gmail.com', 'get email');
    assert.equal(user.avatar, 'https://www.img.com/123.jpg', 'get avatar');
    assert.equal(user.fullName, 'Tom John', 'get fullName');
  });
});
