async function findOne(username: string) {
  return { username: username, password: 'password' };
}

async function create(user: { username: string; password: string }) {
  console.log(user);
}

const user = {
  findOne,
  create,
};

export default user;
