const  {  
    GraphQLSchema, 

} = require("graphql")



module.exports = new GraphQLSchema({
    query: require("./QUERY_GQL/queryGQL"),
    mutation: require('./MUTATIONS_GQL/Mutations_GQL')

})