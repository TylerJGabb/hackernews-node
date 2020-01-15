let links = [
  {
    id: "link-0",
    url: "www.google.com",
    description: "Fullstack tutorial for GraphQL"
  },
  {
    id: "link-1",
    url: "www.foobar.baz",
    description: "doodee"
  },
  {
    id: "link-2",
    url: "www.zipzap.com",
    description: "zippy zappy"
  }
];

let found = links.find(l => l.id === "link-0");
links = links.filter(l => l !== found);
console.log('done');


