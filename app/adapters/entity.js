import RESTAdapter from '@ember-data/adapter/rest';
import fetch from 'fetch';

export default class EntityAdapter extends RESTAdapter {
  // define api base url
  host = 'https://localhost:7125/v1/';
  contentType = 'application/json';
  dataType = 'json';
  init() {
    super.init(...arguments);
  }

	async findAll(store, type, query) {
      let response = await fetch(this.host+'Entities');
      let data = await response.json();
      console.log(data);
      return data;
  }
}
