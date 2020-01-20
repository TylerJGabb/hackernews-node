module.exports = {
    
  links: (root, args, context, info) => {
    return context.prisma.links();
  },

  info: () => `This is the API of a Hackernews Clone`
};
