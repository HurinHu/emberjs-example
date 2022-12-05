import Model, { attr, belongsTo } from '@ember-data/model';

export default class IndustryModel extends Model {
  @belongsTo('entity',{ inverse: null }) entity;
  @attr('number') industryID;
  @attr('string') industryCode;
  @attr('string') industryDescription;
  @attr('number') industryClassificationID;
  @attr('string') industryHierarchy;
}
