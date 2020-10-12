const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLScalarType,
    GraphQLInt
} = require("graphql");

const headacheDiaryType = new GraphQLObjectType({
    name: "headacheDiaryType", 
    fields: {
        location: {type: GraphQLString},
        severity: {type: GraphQLString}, 
        date: {type: GraphQLString}, 
        trigger: {type: GraphQLString}, 
        duration: {type: GraphQLString},
        medication: {type: GraphQLString},
        improvement: {type: GraphQLString},
        id: {type: GraphQLID}, 
        // useremail: {type: GraphQLString}
    }
})

module.exports = headacheDiaryType