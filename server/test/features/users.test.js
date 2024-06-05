import { addUser, removeUser, getUser, getUsersInRoom } from './users';

describe('users', () => {
  beforeEach(() => {
    // Clear the users array before each test
    users.length = 0;
  });

  test('addUser should add a user to the users array', () => {
    const user = { id: '1', name: 'John', token: 'abc123' };
    const result = addUser(user);

    expect(result.user).toEqual(user);
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(user);
  });

  test('addUser should return an error if username is reserved', () => {
    const user = { id: '1', name: 'admin', token: 'abc123' };
    const result = addUser(user);

    expect(result.error).toBe('Username is reserved.');
    expect(users.length).toBe(0);
  });

  test('addUser should return an error if username or token is missing', () => {
    const user = { id: '1', name: '', token: 'abc123' };
    const result = addUser(user);

    expect(result.error).toBe('Username and token are required.');
    expect(users.length).toBe(0);
  });

  test('addUser should return an error if username is taken', () => {
    const user1 = { id: '1', name: 'John', token: 'abc123' };
    const user2 = { id: '2', name: 'John', token: 'def456' };

    addUser(user1);
    const result = addUser(user2);

    expect(result.error).toBe('Username is taken.');
    expect(users.length).toBe(1);
  });

  test('removeUser should remove a user from the users array', () => {
    const user = { id: '1', name: 'John', token: 'abc123' };

    addUser(user);
    const result = removeUser(user.id);

    expect(result).toEqual(user);
    expect(users.length).toBe(0);
  });

  test('removeUser should return undefined if user is not found', () => {
    const result = removeUser('1');

    expect(result).toBeUndefined();
  });

  test('getUser should return a user by token', () => {
    const user = { id: '1', name: 'John', token: 'abc123' };

    addUser(user);
    const result = getUser(user.token);

    expect(result).toEqual({ id: user.id, name: user.name });
  });

  test('getUser should return undefined if user is not found', () => {
    const result = getUser('abc123');

    expect(result).toBeUndefined();
  });

  test('getUsersInRoom should return an array of user names', () => {
    const user1 = { id: '1', name: 'John', token: 'abc123' };
    const user2 = { id: '2', name: 'Jane', token: 'def456' };

    addUser(user1);
    addUser(user2);
    const result = getUsersInRoom();

    expect(result).toEqual(['John', 'Jane']);
  });
});