import RESTAdapter from '@ember-data/adapter/rest';
import fetch from 'fetch';

export default class EntitystatusAdapter extends RESTAdapter {
  // define api base url
  host = 'https://localhost:7125/v1/';
  //host = 'http://10.30.4.11/v1/';
  contentType = 'application/json';
  dataType = 'json';
  init() {
    super.init(...arguments);
  }

  async findAll(store, type, query) {
    let res = await fetch(this.host + 'EntityStatus');
    let data = await res.json();
    if (res.status !== 200) {
			let error = data;
			if ((typeof data.errors) === 'object') {
				error = Object.values(data.errors).join('<br>');
			}
			throw error;
		}
    return data;
  }
}
