const { gql } = require('apollo-server');



const typeDefs = gql`
scalar Date
type Task {
    id: Int
    title: String
    description: String
    targetDate: Date
    taskStatus: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    tasks(pageSize: Int, after: String): [Task]
    taskById(id: Int): Task
  }

  type Mutation {
    insert_task(id: Int, title: String, description: String , targetDate: Date, taskStatus: String): [Task]
  }`;

  module.exports = typeDefs;