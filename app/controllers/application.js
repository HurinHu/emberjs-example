import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  // declare services and variables
  @tracked isExpand = false;

  constructor() {
    super(...arguments);
    // define window onresize function,
    window.onresize = this.resize;
  }

  // for local use, this function doesn't need @action
  resize = () => {
    this.isExpand = false;
  };

  // delcare button action with @action, change the value of isExpand
  @action
  sidebarToggle() {
    this.isExpand = !this.isExpand;
  }
}
