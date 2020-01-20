const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../src/utils')

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({
    name: args.name,
    email: args.email,
    password
  });

  //when a user signs up, we generate a token with that user's ID
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return { token, user }; //returning an AuthPayload, containing a token and user
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) throw new Error("No such user found");
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error("Invalid Password");
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return { token, user };
}

function postLink(root, args, context) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: {connect: {id: userId}}
  });
}

function deleteLink(root, args, context) {
  getUserId(context);
  return prisma.deleteLink({
    id: args.id
  });
}

module.exports = {
  signup,
  login,
  postLink,
  deleteLink
};
