import Model, { attr, belongsTo } from '@ember-data/model';

export default class IndustryModel extends Model {
  @attr('number') industryID;
  @attr('string') industryCode;
  @attr('string') industryDescription;
  @attr('number') industryClassificationID;
  @attr('string') industryHierarchy;
}
