async function signup(parent, args, context, info){
    const pass = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({...args, password});
    const token = jwt.sign({userId: user.id}, APP_SECRET);
    
}