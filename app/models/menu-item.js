import Model, { attr } from '@ember-data/model';

export default class MenuItemModel extends Model {
  @attr('string') name;
  @attr('string') description;
}
