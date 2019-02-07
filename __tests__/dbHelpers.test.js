const { users } = require('../data/dbHelpers.js');

describe('Users helpers', () => {
  describe('getUsers()', () => {
    it('should return an array of objects', async () => {
      const userList = await users.getUsers();
      expect(userList).not.toBeNull();
      expect(userList).not.toBeUndefined();
    });
  });
  describe('getUser()', () => {
    it('should return a user from the db', async () => {
      const user = await users.getUser('justin');
      expect(user).not.toBeNull();
      expect(user).toEqual(expect.objectContaining({ username: 'justin' }));
    });
  });
  describe('getUserById', () => {
    it('should return a user with a valid id', async () => {
      const user = await users.getUserById(1);
      expect(user).not.toBeNull();
      expect(user).toEqual(expect.objectContaining({ username: 'justin' }));
    });
  });
});
