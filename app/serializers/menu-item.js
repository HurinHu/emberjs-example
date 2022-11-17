import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class MenuItemSerializer extends JSONAPISerializer {
  serialize(snapshot, options) {
    let json = {
      attributes: {
        name: snapshot.attr('name'),
        description: snapshot.attr('description'),
      },
    };
    if (options.includeId) {
      json.id = snapshot.id;
    }
    return json;
  }
}
