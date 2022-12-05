import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class UserSerializer extends JSONAPISerializer {
  // restructure the response data, if data type is array object, convert it to string
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload.data.length !== undefined) {
      const data = payload.data.map((data) => {
        if (typeof data.attributes.email === 'object') {
          data.attributes.email = data.attributes.email.join('');
        }
        if (typeof data.attributes.avatar === 'object') {
          data.attributes.avatar = data.attributes.avatar.join('');
        }
        return data;
      });
      payload.data = data;
    } else {
      const data = payload.data;
      if (typeof data.attributes.email === 'object') {
        data.attributes.email = data.attributes.email.join('');
      }
      if (typeof data.attributes.avatar === 'object') {
        data.attributes.avatar = data.attributes.avatar.join('');
      }
      payload.data = data;
    }
    return super.normalizeResponse(...arguments);
  }

  // restructure the post data
  serialize(snapshot, options) {
    let json = {
      attributes: {
        firstname: snapshot.attr('firstname'),
        lastname: snapshot.attr('lastname'),
        email: snapshot.attr('email'),
        avatar: snapshot.attr('avatar'),
      },
    };
    if (options.includeId) {
      json.id = snapshot.id;
    }
    return json;
  }
}
