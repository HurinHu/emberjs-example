import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class EntitiesRoute extends Route {
  // declare service
  @service store;

  // declare model with variable, data is get from menuItem list which is stored in the local cache and retrieved with peekAll, if the cache does not exist, it will be empty until it has value.
  model() {
    return hash({
      entitystatus: this.store.findAll('entitystatus'),
    });
  }
}
