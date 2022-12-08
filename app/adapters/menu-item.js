import RESTAdapter from '@ember-data/adapter/rest';

export default class MenuItemAdapter extends RESTAdapter {
  // define api base url
  host = 'https://6362f8d637f2167d6f702efa.mockapi.io/api';
  contentType = 'application/json';
  dataType = 'json';
  init() {
    super.init(...arguments);
  }
  // only needed when serving with fastboot, override the default methods
  async findAll(store, type, sinceToken, snapshotRecordArray) {
    let { modelName } = type;
    const path = this.pathForType(modelName);

    let res = await fetch(`${this.host}/${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
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
