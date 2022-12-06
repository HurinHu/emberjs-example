import Model, { attr, hasMany } from '@ember-data/model';

export default class EntityModel extends Model {
  @attr('number') entityID;
  @attr('string') entityName;
  @attr('string') websiteUrl;
  @attr('string') nzbnNumber;
  @attr industry;
  @attr entityStatus;
  @attr creditRating;
}
