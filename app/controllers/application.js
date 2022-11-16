import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked isExpand = false;

  constructor() {
    super(...arguments);
    window.onresize = this.resize;
  }

  resize = () => {
    this.isExpand = false;
  };

  @action
  sidebarToggle() {
    this.isExpand = !this.isExpand;
  }
}
