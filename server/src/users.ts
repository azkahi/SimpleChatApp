const users: { id: string, name: string, token: string }[] = [];

const addUser = ({ id, name, token }: { id: string, name: string, token: string }): { error?: string, user?: { id: string, name: string, token: string } } => {
  name = name;
  token = token;

  const existingUser = users.find((user) => user.name === name);

  if (name === 'admin') return { error: 'Username is reserved.' };
  if (!name || !token) return { error: 'Username and token are required.' };
  if (existingUser) return { error: 'Username is taken.' };

  const user = { id, name, token };

  users.push(user);

  return { user };
}

const removeUser = (id: string): { id: string, name: string, token: string } | undefined => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (token: string): { id: string, name: string } | undefined => users.find((user) => user.token === token);

const getUsersInRoom = () => users.map((user) => user.name);

export { addUser, removeUser, getUser, getUsersInRoom };