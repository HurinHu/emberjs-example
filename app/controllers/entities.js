import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EntitiesController extends Controller {
  // declare services and variables
  @service store;
  @service tool;
  @tracked alert = '';
  @tracked msg = '';
  @tracked modalCreated = false;
  @tracked entityName = '';
  @tracked websiteUrl = '';
  @tracked nzbnNumber = '';
  @tracked entityStatusID = 0;
  entityStatus = null;

  constructor() {
    super(...arguments);
  }

  @action
  openCreateModal(flag) {
    this.entityName = '';
    this.websiteUrl = '';
    this.nzbnNumber = '';
    this.entityStatus = this.store.peekAll('entitystatus');
    this.entityStatusID =
      this.entityStatus.length > 0 ? this.entityStatus[0].entityStatusID : 0;
    this.modalCreated = flag;
  }

  @action
  onChangeSelect(value) {
    this.entityStatusID = Number(value);
  }

  // delcare button action with @action, createRecord is return a model not promise, and it need to call .save() to create the network request.
  @action
  addNewEntity() {
		if (this.entityName === '') {
			this.alert = 'error';
      this.msg = 'Please input entityName';
			this.tool.delay(3000).then(() => {
				this.alert = '';
				this.msg = '';
			});
		} else if (this.entityStatus.length === 0) {
			this.alert = 'error';
      this.msg = 'Please select entityStatus';
			this.tool.delay(3000).then(() => {
				this.alert = '';
				this.msg = '';
			});
		} else {
			this.entityStatus = this.store.peekAll('entitystatus');
			let entityStatus = {entityStatusID: 0, entityStatusCode: '', entityStatusDescription: '', isActive: false};
			this.entityStatus.forEach((item)=>{
				if (item.entityStatusID === this.entityStatusID) {
					entityStatus = item;
				}
			})
			let item = this.store.createRecord('entity', {
				entityName: this.entityName !== '' ? this.entityName : null,
				websiteUrl: this.websiteUrl !== '' ? this.websiteUrl : null,
				nzbnNumber: this.nzbnNumber !== '' ? this.nzbnNumber : null,
				entityStatus: {
					entityStatusID: entityStatus.entityStatusID,
					entityStatusCode: entityStatus.entityStatusCode,
					entityStatusDescription: entityStatus.entityStatusDescription,
					isActive: entityStatus.isActive,
				},
			});
			item.save().then((res) => {
				this.entityName = '';
				this.websiteUrl = '';
				this.nzbnNumber = '';
				this.entityStatusID = this.entityStatus.length > 0 ? this.entityStatus[0].entityStatusID : 0;
				this.alert = 'success';
				this.msg = 'New Entity added';
				this.tool.delay(3000).then(() => {
					this.alert = '';
					this.msg = '';
					this.openCreateModal(false);
				});
			}).catch((error) => {
				item.deleteRecord()
				this.alert = 'error';
				this.msg = error.message;
				this.tool.delay(5000).then(() => {
					this.alert = '';
					this.msg = '';
				});
			});
		}
    
  }
}
