
function seed(dbName, user, password) {
  db = db.getSiblingDB(dbName);
  db.createUser({
    user: user,
    pwd: password,
    roles: [{ role: 'readWrite', db: dbName }],
  });

  db.createCollection('apikeys');
  db.createCollection('roles');
  db.createCollection('users');

  db.apikeys.insert({
    metadata: 'tarasht front',
    key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
    version: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // logs deleted after 3 mot=nth : 7,890,000 sec
  db.logs.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 7890000 })

  db.roles.insertMany([
    { name: 'HUMAN', code: 0, status: true, description: 'fee', createdAt: new Date(), updatedAt: new Date() },
    { name: 'USER', code: 1, status: true, description: 'car', createdAt: new Date(), updatedAt: new Date() },
    { name: 'SUPERUSER', code: 2, status: true, description: 'customer', createdAt: new Date(), updatedAt: new Date() },
    { name: 'ADMIN', code: 3, status: true, description: 'finance', createdAt: new Date(), updatedAt: new Date() },
    { name: 'SUPERADMIN', code: 4, status: true, description: 'manager', createdAt: new Date(), updatedAt: new Date() },
    { name: 'GOD', code: 5, status: true, description: 'god', createdAt: new Date(), updatedAt: new Date() },
  ]);

  db.users.insertMany([
    {name: 'admin', username:'admin', password:'g@jajzzuse5*9z9ho#@@y^wmsaz8wp79'},
  ]);
}

seed('tarasht', 't4r4sht','t4r4shtt');
