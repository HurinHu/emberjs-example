import users from 'ember-quickstart/mirage/data/users';

export default function loadDefaultScenario(server) {
  server.db.loadData({
    users,
  });
}
