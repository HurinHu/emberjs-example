import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';
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
    // mock data for findAll and createRecord, createRecord will return a model which is created by .modelFor, if not mock new user, it will create a real api request during the test
    const store = this.owner.lookup('service:store');
    let data = [{"email":"Tom.John@gmail.com","firstname":"Tom","lastname":"John","avatar":"","id":1},{"email":"Tom1.John1@gmail.com","firstname":"Tom1","lastname":"John1","avatar":"","id":2}];
    store.findAll = async (model) => { 
      return new Promise((resolve) => resolve(data));
    }
    const user = this.owner.lookup('service:store').modelFor('user');
    user.id=3;
    user.firstname = 'Alice';
    user.lastname = 'Adren';
    user.email = 'Alice.Adren@gmail.com';
    user.avatar = 'http://www.img.com/234.jpg';
    // need .save() function to create item
    user.save = () => {
      data.push({"email":"Alice.Adren@gmail.com","firstname":"Alice","lastname":"Adren","avatar":"http://www.img.com/234.jpg","id":3});
    }
    store.createRecord = (model, u) => { 
      return user;
    }
    let controller = this.owner.lookup('controller:about');
    // set some delay time to make sure everything is rendered and api request completed
    setTimeout(() => {this.resumeTest()}, 500); 
    await pauseTest();
    assert.equal(controller.users.length,2,"users list before added");

    // set value
    controller.firstname = 'Alice';
    controller.lastname = 'Adren';
    controller.email = 'Alice.Adren@gmail.com';
    controller.avatar = 'http://www.img.com/234.jpg';

    // call the addNewUser function
    controller.send('addNewUser');
    setTimeout(() => {this.resumeTest()}, 1000); 
    await pauseTest();
    assert.equal(controller.alert,'success',"alert after added");
    assert.equal(controller.users.length,3,"users list after added");
  });

  test('select user', async function (assert) {
    const store = this.owner.lookup('service:store');
    const user = this.owner.lookup('service:store').modelFor('user');
    user.id=2;
    user.firstname = 'Tom1';
    user.lastname = 'John1';
    user.email = 'Tom1.John1@gmail.com';
    user.avatar = '';
    store.peekRecord = (model, id) => { 
      return user;
    }
    let controller = this.owner.lookup('controller:about');
    setTimeout(() => {this.resumeTest()}, 500); 
    await pauseTest();
    assert.equal(controller.selectedid,0,"id before select is 0");
    assert.equal(controller.selectedfirstname,'',"firstname before select is empty");
    assert.equal(controller.selectedlastname,'',"lastname before select is empty");
    assert.equal(controller.selectedemail,'',"email before select is empty");
    assert.equal(controller.avatar,'',"avatar before select is empty");

    controller.send('selectUser', 2);
    setTimeout(() => {this.resumeTest()}, 1000); 
    await pauseTest();
    assert.equal(controller.selectedid,2,"id after select is 2");
    assert.equal(controller.selectedfirstname,'Tom1',"firstname after select is Tom1");
    assert.equal(controller.selectedlastname,'John1',"lastname after select is John1");
    assert.equal(controller.selectedemail,'Tom1.John1@gmail.com',"email after select is Tom1.John1@gmail.com");
    assert.equal(controller.avatar,'',"avatar after select is empty");
  });

  test('update user', async function (assert) {
    const store = this.owner.lookup('service:store');
    let data = [{"email":"Tom.John@gmail.com","firstname":"Tom","lastname":"John","avatar":"","id":1},{"email":"Tom1.John1@gmail.com","firstname":"Tom1","lastname":"John1","avatar":"","id":2}];
    store.findAll = async (model) => { 
      return new Promise((resolve) => resolve(data));
    }
    const user = this.owner.lookup('service:store').modelFor('user');
    user.id=2;
    user.firstname = 'Alice';
    user.lastname = 'Adren';
    user.email = 'Alice.Adren@gmail.com';
    user.avatar = 'http://www.img.com/234.jpg';
    // need .save() function to update item
    user.save = () => {
      data[1] = {"email":"Alice.Adren@gmail.com","firstname":"Alice","lastname":"Adren","avatar":"http://www.img.com/234.jpg","id":2};
    }
    store.peekRecord = (model, id) => { 
      return user;
    }
    let controller = this.owner.lookup('controller:about');
    setTimeout(() => {this.resumeTest()}, 500); 
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

  test('delete user', async function (assert) {
    const store = this.owner.lookup('service:store');
    let data = [{"email":"Tom.John@gmail.com","firstname":"Tom","lastname":"John","avatar":"","id":1},{"email":"Tom1.John1@gmail.com","firstname":"Tom1","lastname":"John1","avatar":"","id":2}];
    store.findAll = async (model) => { 
      return new Promise((resolve) => resolve(data));
    }
    const user = this.owner.lookup('service:store').modelFor('user');
    user.id=2;
    user.firstname = 'Tom1';
    user.lastname = 'John1';
    user.email = 'Tom1.John1@gmail.com';
    user.avatar = '';
    // need .destoryRecord() to delete item
    user.destroyRecord = () => {
      data.splice(1, 1)
    }
    store.peekRecord = (model, id) => { 
      return user;
    }
    let controller = this.owner.lookup('controller:about');
    setTimeout(() => {this.resumeTest()}, 500); 
    await pauseTest();
    assert.equal(controller.users.length,2,"users list before deleted");

    controller.send('deleteUser', 2);
    setTimeout(() => {this.resumeTest()}, 1000); 
    await pauseTest();
    assert.equal(controller.users.length,1,"users list after deleted");
  });
});
