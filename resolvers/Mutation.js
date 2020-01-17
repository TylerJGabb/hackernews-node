async function signup(parent, args, context, info){
    const pass = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({...args, password});
    const token = jwt.sign({userId: user.id}, APP_SECRET);
    return { token, user }; //returning an AuthPayload, containing a token and user
}

async function login(parent, args, context, info){
    const user = await context.prisma.user({email: args.email });
    if(!user) throw new Error('No such user found');
    const valid = bcrypt.compare(args.password, user.password);
    if(!valid) throw new Error('Invalid Password');
    const token = jwt.sign({userId: user.id }, APP_SECRET);
    return { token, user };
}

module.exports = {
    signup,
    login
}