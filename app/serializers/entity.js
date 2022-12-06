import RESTSerializer from '@ember-data/serializer/rest';

export default class EntitySerializer extends RESTSerializer {
  // restructure the response data, if data type is array object, convert it to string
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload.length !== undefined) {
      const data = payload.map((data) => {
				data.id = data.entityID;
        return data;
      });
      payload = {
        entity: data,
      };
    } else {
      payload = {
        entity: [
          {
            id: payload.entityID,
            ...payload,
          },
        ],
      };
    }
    return super.normalizeResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  // restructure the post data
  serialize(snapshot, options) {
    let json = {
      attributes: {
        entityName: snapshot.attr('entityName'),
        websiteUrl: snapshot.attr('websiteUrl'),
        nzbnNumber: snapshot.attr('nzbnNumber'),
        entityStatus: snapshot.attr('entityStatus'),
      },
    };
    if (options.includeId) {
      json.id = snapshot.id;
    }
    return json;
  }
}
