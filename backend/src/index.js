const path = require("path")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("express-flash")
const logger = require("morgan")
const connectDB = require("./config/database")
const mainRoutes = require("./routes/main")
const authRoutes = require("./routes/auth")
const postsRoutes = require("./routes/posts")
const gearsRoutes = require("./routes/gears")
const tripsRoutes = require("./routes/trips")
const templatesRoutes = require("./routes/templates")

//Use .env file in config folder
require("dotenv").config({ path: "./src/config/.env" })

// Passport config
require("./config/passport")(passport)

//Connect To Database
connectDB()

//Static Folder
app.use(express.static("frontend/dist"))

//Body Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Logging
app.use(logger("dev"))

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.DB_STRING }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Use flash messages for errors, info, ect...
app.use(flash())

//Setup Routes For Which The Server Is Listening
app.use("/api", mainRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/post", postsRoutes)
app.use("/api/trip", tripsRoutes)
app.use("/api/gear", gearsRoutes)
app.use("/api/template", templatesRoutes)

app.use("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})

const PORT = process.env.PORT || 5000

//Server Running
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}, you better catch it!`)
})
