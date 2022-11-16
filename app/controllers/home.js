import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

export default class HomeController extends Controller {
  @service store;
  @service tool;
  @tracked name = '';
  @tracked description = '';
  @tracked alert = '';
  @tracked msg = '';

  constructor() {
    super(...arguments);
  }

  @action
  addNewItem() {
    try{
      let item = this.store.createRecord('menuItem',{name:this.name,description:this.description});
      item.save();
      this.name = '';
      this.description = '';
      this.alert = 'success';
      this.msg = 'New item added';
    } catch (error) {
      this.alert = 'error';
      this.msg = error;
    }
    this.tool.delay(3000).then(()=>{
      this.alert = '';
      this.msg = '';
    });
  }
}
