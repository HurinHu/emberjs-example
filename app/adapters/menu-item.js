import RESTAdapter from '@ember-data/adapter/rest';

export default class MenuItemAdapter extends RESTAdapter {
  host = 'https://6362f8d637f2167d6f702efa.mockapi.io/api';
  contentType = 'application/json';
  dataType = 'json';
  init() {
    super.init(...arguments);
  }
}
