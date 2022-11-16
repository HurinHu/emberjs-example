import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SidebarComponent extends Component {
  @service store;
  @tracked items = [];

  constructor() {
    super(...arguments);
    this.store
      .findAll('menuItem')
      .then((data) => {
        this.items = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
