import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @service store;
  @service tool;
  @tracked name = '';
  @tracked description = '';
  @tracked alert = '';
  @tracked msg = '';
  @tracked selectedid = 0;
  @tracked selectedname = '';
  @tracked selecteddescription = '';
  @tracked updatealert = '';
  @tracked updatemsg = '';

  constructor() {
    super(...arguments);
  }

  @action
  addNewItem() {
    console.log(this.name);
    // try{
    //   let item = this.store.createRecord('menuItem',{name:this.name,description:this.description});
    //   item.save();
    //   this.name = '';
    //   this.description = '';
    //   this.alert = 'success';
    //   this.msg = 'New item added';
    // } catch (error) {
    //   this.alert = 'error';
    //   this.msg = error;
    // }
    // this.tool.delay(3000).then(()=>{
    //   this.alert = '';
    //   this.msg = '';
    // });
  }

  @action
  selectItem(id) {
    let item = this.store.peekRecord('menuItem', id);
    this.selectedid = item.id;
    this.selectedname = item.name;
    this.selecteddescription = item.description;
  }

  @action
  updateItem(id) {
    try {
      let item = this.store.peekRecord('menuItem', id);
      item.name = this.selectedname;
      item.description = this.selecteddescription;
      item.save();
    } catch(error) {
      alert(error);
    }
  }

  @action
  deleteItem(id) {
    try{
      let item = this.store.peekRecord('menuItem',id);
      item.destroyRecord();
    } catch (error) {
      this.alert(error);
    }
  }
}
