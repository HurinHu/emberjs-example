import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EntitiesController extends Controller {
  // declare services and variables
  @service store;
	@tracked entities = [];

	constructor() {
    super(...arguments);
		this.store
      .findAll('entity')
      .then((data) => {
        this.entities = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
