const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const cors = require("cors")({ origin: true });
const users = admin.firestore().collection("users");

exports.registerNewUser = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let user = request.body
        let resp = {}
        if (user !== "undefined") {
            const newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                firebaseUserId: user.firebaseUserId
            }
            users.add(newUser)
            resp = newUser
        } else {
            resp = { errorMsg: "missing required information"}
        }
        return response.status(200).send(resp)
    })
})

exports.getUserById = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        console.log(request.body)
        const user = users.where('firebaseUserId', '==', request.body)
        user.get().then((snap) => {
            if (snap.empty) {
                return response.status(404).send("user not found")
            } else {
                snap.forEach(doc => {
                    return response.status(200).send(doc.data())
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    })
})

exports.getAllUsers = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const allUsers = await users.get()
        const data = []
        allUsers.forEach((doc) => {
            data.push(doc.data())
        })
        response.send(data)
    })
})