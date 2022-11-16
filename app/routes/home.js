import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class HomeRoute extends Route {
  @service store;

  model() {
    return hash({
      sidebarItems: this.store.peekAll('menuItem'),
    });
  }
}
