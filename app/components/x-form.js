import Component from '@glimmer/component';
import { task } from "ember-concurrency";
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import {
    validatePresence,
    validateLength,
  } from "ember-changeset-validations/validators";
  

export default class modelXFormComponent extends Component {
    EntityValidations = {
        entityName: [validatePresence(true), validateLength({ min: 3, max: 40 })],
        websiteUrl: [validateLength({ allowBlank: true, max: 200 })],
        nzbnNumber: [validateLength({ allowBlank: true, max: 200 })],
        entityStatus: [validatePresence(true)],
        };
    @service store;
    @service tool;
    @tracked alert = '';
    @tracked msg = '';
  
    @task
    *submit(model) {
        // yield timeout(1000);
        // yield model.save();
        let item = this.store.createRecord('entity', {
            entityName: model.entityName !== '' ? model.entityName : null,
            websiteUrl: model.websiteUrl !== '' ? model.websiteUrl : null,
            nzbnNumber: model.nzbnNumber !== '' ? this.nzbnNumber : null,
            entityStatus: model.entityStatus,
            industry: model.industry
          });
          item.save()
        .then((res) => {
            model.entityName = '';
            model.websiteUrl = '';
            model.nzbnNumber = '';
            model.entityStatusID =
            model.entityStatus = null;
            this.alert = 'success';
            this.msg = 'New Entity added';
            this.tool.delay(3000).then(() => {
                this.alert = '';
                this.msg = '';
                //this.openCreateModal(false);
            });
        })
        .catch((error) => {
            item.deleteRecord();
            this.alert = 'error';
            this.msg = error.message;
            this.tool.delay(5000).then(() => {
                this.alert = '';
                this.msg = '';
            });
        });
    }
}
