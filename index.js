const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const { graphqlHTTP } = require("express-graphql")

const schema = require("./GRAPHQL")

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
}))


io.on("connection", socket=>{
   console.log("IO connected");
})

require("./DB")


http.listen(8080, ()=>{
    console.log("server connect");
} )