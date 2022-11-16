import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service store;
  constructor() {
    super(...arguments);
  }
}
