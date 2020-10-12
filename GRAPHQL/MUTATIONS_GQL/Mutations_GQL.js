const  {
    GraphQLInt, 
    GraphQLString, 
    GraphQLObjectType, 
    GraphQLID,
    GraphQLSchema, 
    GraphQLList
} = require("graphql")

//user
const UserType = require("../GQL_SCHEMAS/UserType")
const UserModel = require("../../DB/MONGODB_MODELS/UserModel")

//headache
const headacheDiaryType = require("../GQL_SCHEMAS/HeadAche_Schema")
const headDiaryModel = require("../../DB/MONGODB_MODELS/headacheDiaryModel")

const mutations = new GraphQLObjectType({
    name: "mutations", 
    fields: {
        //addUser
        addUser: {
            type: UserType,
            args: {
                email: {type: GraphQLString}, 
            }, 
       resolve(_, {email}){
           //check UserSchema file for static method
               return UserModel.addUser(email)
             
            }
        },
        //add user headache diary
        addUserHeadacheDiary: {
            type: headacheDiaryType, 
            args: {
                location: {type: GraphQLString},
                severity: {type: GraphQLString}, 
                trigger: {type: GraphQLString}, 
                duration: {type: GraphQLString},
                medication: {type: GraphQLString},
                improvement: {type: GraphQLString},
                //userID
                id: {type: GraphQLID}, 
                email: {type: GraphQLString}
            }, 
            async resolve(_, {email, id, location, severity,trigger, duration, medication, improvement}){
                //create headache Diary entry
                console.log({email, id, location, severity,trigger, duration, medication, improvement});
                const headache =  await headDiaryModel.create({location, severity, trigger, duration, medication, improvement})
                
                //find User


                const user = await UserModel.findById(id).exec()
                user.headacheDiaries.push(headache)
                user.save()
                console.log(headache);
                return headache

                
            }
        }
    }
})
module.exports = mutations