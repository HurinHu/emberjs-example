import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  // declare attributes
  @attr('string') firstname;
  @attr('string') lastname;
  @attr('string') email;
  @attr('string') avatar;

  // declare aggregate data, user.fullName will return this result 
  get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}
