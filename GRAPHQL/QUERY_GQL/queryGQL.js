const  {
    GraphQLInt, 
    GraphQLString, 
    GraphQLObjectType, 
    GraphQLID,
    GraphQLSchema, 
    GraphQLList
} = require("graphql")


const headacheDiaryType = require("../GQL_SCHEMAS/HeadAche_Schema")
const UserType = require("../GQL_SCHEMAS/UserType")

//DB Models
const UserModel = require("../../DB/MONGODB_MODELS/UserModel")


const headaches = [
    {id: "1",  userID: "1", location: "frontal", severity: "dont know", date: Date.now(), trigger: "tomatoes"},
    {id: "2",  userID: "2", location: "temporal", severity: "8", date: Date.now(), trigger: "N/A"},
    {id: "3",  userID: "1", location: "back", severity: "3", date: Date.now(), trigger: "light"}
]


const query= new GraphQLObjectType({
    name: "queryType", 
    fields: {
        headacheDiary: {
            type: headacheDiaryType, 
            args: {
                id: {type: GraphQLID}
            }, 
            resolve(_, {id}){
                console.log({id});
                return headaches.find(hd=> hd.id === id)
            }
        }, 
        UserHeadaches: {
            type: new GraphQLList(headacheDiaryType), 
            resolve(_, args){
                return headaches
            }
        }, 
        //UserType
        users: {
            type: new GraphQLList(UserType), 
            async resolve(parent, args){
                return await UserModel
                                .find({})
                                .populate("headacheDiaries")
                                .exec()
            }
        },

        //findUser
        findUser: {
            type: UserType, 
            args: {
                id: {type: GraphQLID}, 
                email: {type: GraphQLString}
            }, 
            async resolve(_, {id, email}){
                return  await UserModel.findById(id) ||  await UserModel.findOne({email: {$regex: new RegExp(`${email}`, "gi")}})
              
                   
            }
        },
        //user headache diary
        userHeadAcheDiary: {
            type: new GraphQLList(headacheDiaryType),
            args: {
                id: {type: GraphQLID}, 
            }, 
            resolve(parent, {id}){
                console.log(headaches.filter(hd => hd.userID === id));
                return headaches.filter(hd => hd.userID === id)
            }
        }
    }
})


module.exports = query