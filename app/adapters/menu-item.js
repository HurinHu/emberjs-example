import RESTAdapter from '@ember-data/adapter/rest';

export default class MenuItemAdapter extends RESTAdapter {
  host = 'https://6362f8d637f2167d6f702efa.mockapi.io/api';
  contentType = 'application/json';
  dataType = 'json';
  init() {
    super.init(...arguments);
  }
  //only needed when serving with fastboot
  async findAll(store, type, sinceToken, snapshotRecordArray) {
    let { modelName } = type;
    const path = this.pathForType(modelName);
    
    let res = await fetch(`${this.host}/${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    let data = await res.json();
    return data;
  }
}
