import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SidebarComponent extends Component {
  // declare services and variables
  @service store;
  @tracked items = [];

  constructor() {
    super(...arguments);
    // get menuItem list from api and set to variable items. If you need to use variables in this class, you have to use arrow function instead of traditional function
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
