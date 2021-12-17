const { GraphQLScalarType } =require('graphql');
const { Kind } =require('graphql/language');

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
  },
}),
  Query: {
    tasks: async (_, { pageSize = 20, after }, { pgPool }) => {
        const results = await pgPool.query(`select id, title, description, "taskStatus", "targetDate" from tasks`);
        const tasks = results.rows;

      /**
      const tasks = paginateResults({
        after,
        pageSize,
        results: allTasks,
      }); */

        return tasks;
     //   cursor: tasks.length ? tasks[tasks.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
     /*   hasMore: tasks.length
          ? tasks[tasks.length - 1].cursor !==
          allTasks[allTasks.length - 1].cursor
          : false,**/
    },
    taskById: async (_, { id }, { pgPool }) => {
        if(!id) {
            return;
        }

        const results = await pgPool.query(`select id, title, description, "taskStatus", "targetDate" from tasks where id =${id}`);
        const tasks = results.rows;

      /**
      const tasks = paginateResults({
        after,
        pageSize,
        results: allTasks,
      }); */

        return tasks && tasks.length > 0 ? tasks[0] : {};
     //   cursor: tasks.length ? tasks[tasks.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
     /*   hasMore: tasks.length
          ? tasks[tasks.length - 1].cursor !==
          allTasks[allTasks.length - 1].cursor
          : false,**/
    },
  },
  Mutation: {
    insert_task: async (_, { id, title, description, targetDate, taskStatus }, { pgPool }) => {
      let results;
      if(!id) {
        results = await pgPool.query(`insert into tasks(title, description, "taskStatus", "targetDate") values($1, $2, $3, $4) returning id;`, 
        [title, description, taskStatus, targetDate]);
      } else {
        results = await pgPool.query(`update tasks set title=$1, description=$2, "taskStatus"=$3, "targetDate"=$4 where id=$5 returning id`, 
          [title, description, taskStatus, targetDate, id]);
      }
      if(results) {
        const id = results.rows[0].id;
        const taskListResults = await pgPool.query(`select * from tasks`);
        const tasks = taskListResults.rows;
        return tasks;
      }  
    },
  },
};