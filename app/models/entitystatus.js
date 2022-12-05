import Model, { attr, belongsTo } from '@ember-data/model';

export default class EntitystatusModel extends Model {
  @belongsTo('entity',{ inverse: null }) entity;
  @attr('number') entityStatusID;
  @attr('string') entityStatusCode;
  @attr('string') entityStatusDescription;
  @attr('boolean') isActive;
}
