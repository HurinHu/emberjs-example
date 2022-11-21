import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
    // declare services and variables
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

    // delcare button action with @action, createRecord is return a model not promise, and it need to call .save() to create the network request.
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

    // delcare button action with @action, peekRecord is return a model without network request, data is get from local cache.
    @action
    selectItem(id) {
        let item = this.store.peekRecord('menuItem', id);
        this.selectedid = item.id;
        this.selectedname = item.name;
        this.selecteddescription = item.description;
    }

    // delcare button action with @action, peekRecord is return a model without network request, data is get from local cache, .save() will make a post request to update item.
    @action
    updateItem(id) {
        try {
            let item = this.store.peekRecord('menuItem', id);
            item.name = this.selectedname;
            item.description = this.selecteddescription;
            item.save();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    // delcare button action with @action, peekRecord is return a model without network request, data is get from local cache, .destroyRecord() will make a delete request to delete item.
    @action
    deleteItem(id) {
        try {
            let item = this.store.peekRecord('menuItem', id);
            item.destroyRecord();
            this.selectedid = '';
            this.selectedname = '';
        } catch (error) {
            this.alert(error);
        }
    }
}
