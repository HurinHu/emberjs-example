import { module, test } from 'qunit';
import { setupTest } from 'test-site/tests/helpers';
import { pauseTest } from '@ember/test-helpers';

module('Unit | Controller | home', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:home');
    assert.ok(controller);
  });

  test('add new item', async function (assert) {
    // mock data for findAll and createRecord, createRecord will return a model which is created by .modelFor, if not mock new user, it will create a real api request during the test
    const store = this.owner.lookup('service:store');
    let data = [{"name":"test1","description":"test1 description","id":1},{"name":"test2","description":"test2 description","id":2},{"name":"test3","description":"test3 description","id":3}];
    store.findAll = async (model) => { 
      return new Promise((resolve) => resolve(data));
    }
    let item = this.owner.lookup('service:store').modelFor('menuItem');
    const obj = {...item};
    obj.id=4;
    obj.name = 'test4';
    obj.description = 'test4 description';
    item = obj;
    // need .save() function to create item
    item.save = () => {
      data.push({"name":"test4","description":"test4 description","id":4});
    }
    store.createRecord = (model, u) => { 
      return item;
    }
    let controller = this.owner.lookup('controller:home');
    setTimeout(() => {this.resumeTest()}, 500); 
    await pauseTest();
    assert.equal(data.length,3,"item list before added");

    controller.name = 'test4';
    controller.description = 'test4 description';

    controller.send('addNewItem');
    setTimeout(() => {this.resumeTest()}, 1000); 
    await pauseTest();
    assert.equal(controller.alert,'success',"alert after added");
    assert.equal(data.length,4,"item list after added");
  });

  test('select item', async function (assert) {
    const store = this.owner.lookup('service:store');
    let item = this.owner.lookup('service:store').modelFor('menuItem');
    const obj = {...item};
    obj.id=3;
    obj.name = 'test3';
    obj.description = 'test3 description';
    item = obj;
    store.peekRecord = (model, id) => { 
      return item;
    }
    let controller = this.owner.lookup('controller:home');
    setTimeout(() => {this.resumeTest()}, 500); 
    await pauseTest();
    assert.equal(controller.selectedid,0,"id before select is 0");
    assert.equal(controller.selectedname,'',"name before select is empty");
    assert.equal(controller.selecteddescription,'',"description before select is empty");

    controller.send('selectItem', 3);
    setTimeout(() => {this.resumeTest()}, 1000); 
    await pauseTest();
    assert.equal(controller.selectedid,3,"id after select is 0");
    assert.equal(controller.selectedname,'test3',"name after select is test3");
    assert.equal(controller.selecteddescription,'test3 description',"description after select is test3 description");
  });

  test('update item', async function (assert) {
    const store = this.owner.lookup('service:store');
    let data = [{"name":"test1","description":"test1 description","id":1},{"name":"test2","description":"test2 description","id":2},{"name":"test3","description":"test3 description","id":3}];
    store.findAll = async (model) => { 
      return new Promise((resolve) => resolve(data));
    }
    let item = this.owner.lookup('service:store').modelFor('menuItem');
    const obj = {...item};
    obj.id=3;
    obj.name = 'test4';
    obj.description = 'test4 description';
    item = obj;
    // need .save() function to update item
    item.save = () => {
      data[2] = {"name":"test4","description":"test4 description","id":3};
    }
    store.peekRecord = (model, id) => { 
      return item;
    }
    let controller = this.owner.lookup('controller:home');
    setTimeout(() => {this.resumeTest()}, 500); 
    await pauseTest();
    assert.equal(data[2].name,'test3',"item name before updated is test3");
    assert.equal(data[2].description,'test3 description',"item name before updated is test3 description");

    controller.selectedid = 3;
    controller.name = 'test4';
    controller.description = 'test4 description';

    controller.send('updateItem', 3);
    setTimeout(() => {this.resumeTest()}, 1000); 
    await pauseTest();
    assert.equal(data[2].name,'test4',"item name after updated is test4");
    assert.equal(data[2].description,'test4 description',"item name after updated is test4 description");
  });

  test('delete item', async function (assert) {
    const store = this.owner.lookup('service:store');
    let data = [{"name":"test1","description":"test1 description","id":1},{"name":"test2","description":"test2 description","id":2},{"name":"test3","description":"test3 description","id":3}];
    store.findAll = async (model) => { 
      return new Promise((resolve) => resolve(data));
    }
    let item = this.owner.lookup('service:store').modelFor('menuItem');
    const obj = {...item};
    obj.id=3;
    obj.name = 'test3';
    obj.description = 'test3 description';
    item = obj;
    // need .save() function to delete item
    item.destroyRecord = () => {
      data.splice(2, 1)
    }
    store.peekRecord = (model, id) => { 
      return item;
    }
    let controller = this.owner.lookup('controller:home');
    setTimeout(() => {this.resumeTest()}, 500); 
    await pauseTest();
    assert.equal(data.length,3,"item list before deleted");

    // call @action deleteItem with input parameter 3
    controller.send('deleteItem', 3);
    setTimeout(() => {this.resumeTest()}, 1000); 
    await pauseTest();
    assert.equal(data.length,2,"item list after deleted");
  });
});
