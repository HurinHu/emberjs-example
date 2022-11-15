import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') firstname;
  @attr('string') lastname;
  @attr('string') email;
  @attr('string') avatar;

  get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}
