import RESTSerializer from '@ember-data/serializer/rest';

export default class EntitystatusSerializer extends RESTSerializer {
  // restructure the response data, if data type is array object, convert it to string
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload !== undefined) {
      const data = payload.map((data) => {
        return { id: data.entityStatusID, ...data };
      });
      payload = {
        entitystatus: data,
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
}
