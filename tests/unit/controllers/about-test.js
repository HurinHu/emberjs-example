import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';
import { run } from '@ember/runloop';
import { pauseTest } from '@ember/test-helpers';

module('Unit | Controller | about', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    store.findAll = async (model) => { 
      let data = [{"email":"Tom.John@gmail.com","firstname":"Tom","lastname":"John","avatar":""},{"email":"Tom1.John1@gmail.com","firstname":"Tom1","lastname":"John1","avatar":""}];
      return new Promise((resolve) => resolve(data));
    }
    let controller = this.owner.lookup('controller:about');
    assert.ok(controller);
  });

  test('add new user', async function (assert) {
    const store = this.owner.lookup('service:store');
    let data = [{"email":"Tom.John@gmail.com","firstname":"Tom","lastname":"John","avatar":"","id":1},{"email":"Tom1.John1@gmail.com","firstname":"Tom1","lastname":"John1","avatar":"","id":2}];
    store.findAll = async (model) => { 
      return new Promise((resolve) => resolve(data));
    }
    const user = this.owner.lookup('service:store').createRecord('user',{"email":"Alice.Adren@gmail.com","firstname":"Alice","lastname":"Adren","avatar":"http://www.img.com/234.jpg","id":3});
    store.createRecord = (model, u) => { 
      data.push({"email":"Alice.Adren@gmail.com","firstname":"Alice","lastname":"Adren","avatar":"http://www.img.com/234.jpg","id":3})
      return user;
    }
    let controller = this.owner.lookup('controller:about');
    setTimeout(() => {this.resumeTest()}, 1000); 
    await pauseTest();
    assert.equal(controller.users.length,2,"users list before added");

    controller.firstname = 'Alice';
    controller.lastname = 'Adren';
    controller.email = 'Alice.Adren@gmail.com';
    controller.avatar = 'http://www.img.com/234.jpg';

    controller.send('addNewUser');
    setTimeout(() => {this.resumeTest()}, 1000); 
    await pauseTest();
    assert.equal(controller.alert,'success',"alert after added");
    assert.equal(controller.users.length,3,"users list after added");
  });

  test('update user', async function (assert) {
    const store = this.owner.lookup('service:store');
    let data = [{"email":"Tom.John@gmail.com","firstname":"Tom","lastname":"John","avatar":"","id":1},{"email":"Tom1.John1@gmail.com","firstname":"Tom1","lastname":"John1","avatar":"","id":2}];
    store.findAll = async (model) => { 
      return new Promise((resolve) => resolve(data));
    }
    const user = this.owner.lookup('service:store').createRecord('user',{"email":"Tom1.John1@gmail.com","firstname":"Tom1","lastname":"John1","avatar":"","id":2});
    user.save = () => {
      data[1] = {"email":"Alice.Adren@gmail.com","firstname":"Alice","lastname":"Adren","avatar":"http://www.img.com/234.jpg","id":2};
    }
    store.peekRecord = (model, id) => { 
      return user;
    }
    let controller = this.owner.lookup('controller:about');
    setTimeout(() => {this.resumeTest()}, 1000); 
    await pauseTest();
    assert.equal(controller.users.length,2,"users list before updated");

    controller.selectedid = 2;
    controller.selectedfirstname = 'Alice';
    controller.selectedlastname = 'Adren';
    controller.selectedemail = 'Alice.Adren@gmail.com';
    controller.selectedavatar = 'http://www.img.com/234.jpg';

    controller.send('updateUser', 2);
    setTimeout(() => {this.resumeTest()}, 1000); 
    await pauseTest();
    assert.equal(controller.users.length,2,"users list after updated");
    assert.equal(controller.users[1].firstname,'Alice',"firstname after updated");
  });
});
