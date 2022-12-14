import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from "ember-concurrency";

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
  entityModel = this.store.modelFor('entity');

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

}
