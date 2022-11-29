import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AboutController extends Controller {
    // declare services and variables
    @service store;
    @service tool;
    @tracked users = [];
    @tracked firstname = '';
    @tracked lastname = '';
    @tracked email = '';
    @tracked avatar = '';
    @tracked alert = '';
    @tracked msg = '';
    @tracked updatealert = '';
    @tracked updatemsg = '';
    @tracked selectedid = 0;
    @tracked selectedfirstname = '';
    @tracked selectedlastname = '';
    @tracked selectedemail = '';
    @tracked selectedavatar = '';
    @tracked updatealert = '';
    @tracked updatemsg = '';
    @tracked modalCreated = false;
    @tracked modalUpdate = false;

    constructor() {
        super(...arguments);
        // get user list from api and set to variable users. If you need to use variables in this class, you have to use arrow function instead of traditional function 
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
    openCreateModal(flag) {
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.avatar = '';
        this.modalCreated = flag;
    }

    @action
    openUpdateModal(id) {
        let item = this.store.peekRecord('user', id);
        this.selectedid = id;
        this.selectedfirstname = item.firstname;
        this.selectedlastname = item.lastname;
        this.selectedemail = item.email;
        this.selectedavatar = item.avatar;
        this.modalUpdate = true;
    }

    // delcare button action with @action, createRecord is return a model not promise, and it need to call .save() to create the network request.
    @action
    addNewUser() {
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
            this.openCreateModal(false);
        });
    }

    // delcare button action with @action, peekRecord is return a model without network request, data is get from local cache, .save() will make a post request to update item.
    @action
    updateUser(id) {
        try {
            let item = this.store.peekRecord('user', id);
            item.id = this.selectedid;
            item.firstname = this.selectedfirstname;
            item.lastname = this.selectedlastname;
            item.email = this.selectedemail;
            item.avatar = this.selectedavatar;
            item.save();
            this.updatealert = 'success';
            this.updatemsg = 'New item updated';
        } catch (error) {
            console.log(error);
            this.updatealert = 'error';
            this.updatemsg = error;
        }
        this.tool.delay(3000).then(()=>{
            this.updatealert = '';
            this.updatemsg = '';
        });
    }

    // delcare button action with @action, peekRecord is return a model without network request, data is get from local cache, .destroyRecord() will make a delete request to delete item.
    @action
    deleteUser(id) {
        try {
            let item = this.store.peekRecord('user', id);
            item.destroyRecord();
            this.selectedid = 0;
            this.selectedfirstname = '';
            this.selectedlastname = '';
            this.selectedemail = '';
            this.selectedavatar = '';
        } catch (error) {
            alert(error);
        }
    }

}
