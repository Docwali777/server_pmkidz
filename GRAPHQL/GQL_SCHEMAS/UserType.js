const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = require("graphql");


const headacheDiaryType = require("./HeadAche_Schema");

const UserModel = require("../../DB/MONGODB_MODELS/UserModel");
const { hydrate } = require("../../DB/MONGODB_MODELS/UserModel");

const UserType = new GraphQLObjectType({
    name: "UserType", 
    fields: {
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        headacheDiaries: {
                type: new GraphQLList(headacheDiaryType), 
                async resolve({id}, args){
                   
                    const user =  await UserModel.findById(id).populate("headacheDiaries").exec()
                  return user.headacheDiaries
    
                }
        }
    }
})

module.exports = UserType