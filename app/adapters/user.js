import RESTAdapter from '@ember-data/adapter/rest';
import fetch from 'fetch';

export default class UserAdapter extends RESTAdapter {
  //host = 'https://6362f8d637f2167d6f702efa.mockapi.io/api';
  contentType = 'application/json';
  dataType = 'json';
  init() {
    super.init(...arguments);
  }
  urlForFindAll(modelName) {
    const path = this.pathForType(modelName);
    return `/data/${path}/all.json`;
  }
  urlForFindRecord(id, modelName) {
    const path = this.pathForType(modelName);
    return `/data/${path}/${id}.json`;
  }
  // urlForCreateRecord(modelName) {
  //   const path = this.pathForType(modelName);
  //   return `${this.host}/${path}`;
  // }
  async createRecord(store, type, snapshot) {
    let { modelName, _attributes } = snapshot;
    const path = this.pathForType(modelName);
    let host = 'https://6362f8d637f2167d6f702efa.mockapi.io/api';
    let res = await fetch(`${host}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attributes: _attributes }),
    });
    let data = await res.json();
    return data;
  }
  async query(store, type, query) {
    const path = this.pathForType(type.modelName);
    let host = 'https://6362f8d637f2167d6f702efa.mockapi.io/api';
    let res = await fetch(`${host}/${path}`, query);
    let data = await res.json();
    return data;
  }
  // async findAll(store, type, query) {
  //     let response = await fetch(this.host+'users?page='+query.page);
  //     let data = await response.json();
  //     console.log(data.data);
  //     return data;
  // }
}
