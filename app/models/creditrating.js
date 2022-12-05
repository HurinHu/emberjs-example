import Model, { belongsTo } from '@ember-data/model';

export default class CreditratingModel extends Model {
  @belongsTo('entity') entity;
}
