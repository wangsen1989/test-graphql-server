const { ApolloServer } = require("apollo-server");
const { gql } = require("apollo-server");

const clusters = [
  { id: 'compass-stack', name: '控制集群' },
  { id: 'user-cluster', name: '用户集群' },
  { id: 'azure', name: 'azure 集群' },
];

const allPartitions = [
  { name: 'app', labels: { cid: 'compass-stack' } },
  { name: 'dev', labels: { cid: 'compass-stack' } },
  { name: 'test', labels: { cid: 'user-cluster' } },
];
const allServers = [
  { name: 'nginx', alias: 'nginx', labels: { partition: 'app' } },
  { name: 'apache', alias: 'apache', labels: { partition: 'app' } },
  { name: 'wordpress', alias: 'wordpress', labels: { partition: 'dev' } },
]
const customCachKeys = {
  cluster: 'id',
  partition: 'name',
  server: 'name',
}
const typeDefs = gql`
type Cluster {
  # id: ID!
  name: String!
  partitions: [Partition]
}
type Partition {
  # id: String
  name: String!
  servers: [Server]
  volumes: [Volume]
}
type Server {
  # id: String
  name: String!
  alias: String
}
type Volume {
  name: String!
  capacity: Int
}
type Query {
  getClusterDetail(id: ID!): Cluster
  getServerDetail(id: String): Server
  findUser(id: ID!): User #测试 loading 和缓存
}
type Mutation {
  deleteUser(id: ID!): Boolean
}
type User {
  id: ID!
  name: String!
}
`;
let i = 0;

const resolvers = {
  Query: {
    findUser: (parent, { id }) => {
      const user = { id, name: ++i };
      if (user) {
        return user;
      } else {
        throw new Error("Not Found!");
      }
    },
    getClusterDetail: (parent, { id }) => {
      let cluster = clusters.find(c => c.id === id);
      const partitions = [];
      allPartitions.forEach(p => {
        if (p.labels.cid === id) {
          let servers = allServers.filter(s => s.labels.partition === p.name);
          partitions.push({ ...p, servers })
        }
      });
      return { ...cluster, partitions };
    },
    getServerDetail: (parent, { cid, partition, name }) => {
      return allServers.find(s => s.name === 'nginx');
    },
  },

  Mutation: {
    deleteUser: (parent, { id }) => {
      const index = users.findIndex(user => user.id === id);
      if (index < 0) return false;
      users.splice(index, 1);
      return true;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(30000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
