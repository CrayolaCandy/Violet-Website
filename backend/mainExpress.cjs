const express = require("express")
const app = express()
app.use(express.static("pages"))

app.use(express.static("images"))
app.use(express.static("styles"))
app.use(express.static("skins"))
app.use(express.static("script"))
app.use(express.static("backend/frontendServer"))

app.use(express.urlencoded({extended:true}))
app.use(express.json());

//User Session
const sessionMiddleware = require('./routes/session.cjs'); 
app.use(sessionMiddleware);
// Database
const loginRoute = require('./database/users/loginTable.cjs')
app.post('/user/login', loginRoute);
const signupRoute = require('./database/users/signupTable.cjs')
app.post('/user/signup', signupRoute);

const page = require('./routes/pageURL.cjs')
app.use('/', page)

//const profileImage = require('./database/users/profileImage.cjs')
//app.use('/', profileImage)

const displayProfileImage = require("./database/users/displayImage.cjs")
app.use('/', displayProfileImage)

const getProfile = require('./database/users/profileTable.cjs')
app.post('/user/userInfo', getProfile)
const updateProfile = require('./database/users/updateInfo.cjs')
app.post('/user/updateUserInfo', updateProfile)
const uploadImage = require('./database/users/uploadImage.cjs')
app.use('/', uploadImage)

//Insert Order
const statOrder = require('./database/orderTables/statOrderTable.cjs')
app.post('/user/statOrder', statOrder)
const currencyOrder = require('./database/orderTables/currencyOrderTable.cjs')
app.post('/user/currencyOrder', currencyOrder)
const bountyOrder = require('./database/orderTables/bountyOrderTable.cjs')
app.post('/user/bountyOrder', bountyOrder)
//Get Order
const getOrder = require('./routes/getOrder.cjs')
app.use('/', getOrder)
//Delete Order
const deleteOrder = require('./routes/deleteOrder.cjs')
app.delete('/user/deleteOrder', deleteOrder)

const fetchSkin = require('./routes/fetchSkin.cjs')
app.use('/', fetchSkin)


const profile = require('./routes/security.cjs')
app.use(`/`, profile)
const userStatus = require('./routes/userStatus.cjs')
app.use('/', userStatus)
const checkLog = require('./routes/loggedIn.cjs')
app.use('/', checkLog.router)
const logout = require('./routes/logout.cjs')
app.use('/', logout)

const fetchChat = require('./database/users/chatTitle.cjs')
app.use('/', fetchChat)

const fetchMessage = require('./database/users/chatMessage.cjs')
app.use('/', fetchMessage)
const insertMessage = require('./database/users/insertMessage.cjs')
app.post('/user/insertMessage', insertMessage)
const deleteMessage = require("./database/users/deleteMessage.cjs")
app.use('/', deleteMessage)
const updateMessage = require("./database/users/updateMessage.cjs")
app.use('/', updateMessage)
const chatImage = require('./database/users/chatImage.cjs')
app.use('/', chatImage);
app.listen(3000);