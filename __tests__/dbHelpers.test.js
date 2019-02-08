const { users } = require('../data/dbHelpers.js');

describe.skip('Users helpers', () => {
  describe('getUsers()', () => {
    it('should return an array of objects', async () => {
      // const userList = await users.getUsers();
      const getUsersMock = jest.spyOn(users, 'getUsers');
      const userList = getUsersMock();
      expect(userList).not.toBeNull();
      expect(userList).not.toBeUndefined();
    });
  });
  describe('getUser()', () => {
    it('should return a user from the db', async () => {
      // const user = await users.getUser('justin');
      const getUserMock = jest.spyOn(users, 'getUser');
      const user = await getUserMock('justin');
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
  describe('addUser', () => {
    it('should add a user to the db', async () => {
      const userList = await users.getUsers();
      await users.addUser({
        username: `faketestuser${userList.length}`,
        password: 'faketestpw',
        email: `faketest@email${userList.length}`,
        phone: `098423${userList.length}`
      });
      const updatedList = await users.getUsers();
      expect(updatedList.length).toBe(userList.length + 1);
    });
  });
  describe('updateUser()', () => {
    it('should update a user', async () => {
      const changes = { username: 'j' };
      const updateUserMock = jest.spyOn(users, 'updateUser');
      // await users.updateUser(1, changes);
      // const updatedUser = await updateUserMock(1, changes);
      expect(await updateUserMock(1, changes)).toBe(1);
      // const updatedUser = await users.getUserById(1);
      // expect(updatedUser.username).toBe('j');
      // console.log(updatedUser);

      // await users.updateUser(1, { username: 'justin' });
    });
  });
});
