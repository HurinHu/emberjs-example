import users from 'test-site/mirage/data/users';

export default function loadDefaultScenario(server) {
  server.db.loadData({
    users,
  });
}
