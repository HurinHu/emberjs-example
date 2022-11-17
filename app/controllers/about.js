import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AboutController extends Controller {
    @service store;
    @service tool;
    @tracked users = [];
    @tracked firstname = '';
    @tracked lastname = '';
    @tracked email = '';
    @tracked avatar = '';
    @tracked alert = '';
    @tracked msg = '';
    @tracked selectedid = 0;
    @tracked selectedfirstname = '';
    @tracked selectedlastname = '';
    @tracked selectedemail = '';
    @tracked selectedavatar = '';
    @tracked updatealert = '';
    @tracked updatemsg = '';

    constructor() {
        super(...arguments);
        this.store
            .findAll('user')
            .then((data) => {
                this.users = data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    @action
    addNewItem() {
        try{
            let item = this.store.createRecord('user',{firstname:this.firstname,lastname:this.lastname,email:this.email,avatar:this.avatar});
            item.save();
            this.firstname = '';
            this.lastname = '';
            this.email = '';
            this.avatar = '';
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

    @action
    selectItem(id) {
        let item = this.store.peekRecord('user', id);
        this.selectedid = item.id;
        this.selectedfirstname = item.firstname;
        this.selectedlastname = item.lastname;
        this.selectedemail = item.email;
        this.selectedavatar = item.avatar;
    }

    @action
    updateItem(id) {
        try {
            let item = this.store.peekRecord('user', id);
            item.id = this.selectedid;
            item.firstname = this.selectedfirstname;
            item.lastname = this.selectedlastname;
            item.email = this.selectedemail;
            item.avatar = this.selectedavatar;
            item.save();
        } catch (error) {
            alert(error);
        }
    }

    @action
    deleteItem(id) {
        try {
            let item = this.store.peekRecord('user', id);
            item.destroyRecord();
            this.selectedid = 0;
            this.selectedfirstname = '';
            this.selectedlastname = '';
            this.selectedemail = '';
            this.selectedavatar = '';
        } catch (error) {
            this.alert(error);
        }
    }

}
