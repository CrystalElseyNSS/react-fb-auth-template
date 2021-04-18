const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const cors = require("cors")({ origin: true });
const gardeners = admin.firestore().collection("gardeners");

exports.registerNewGardener = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let gardener = request.body
        let resp = {}
        if (gardener !== "undefined") {
            const newGardener = {
                firstName: gardener.firstName,
                lastName: gardener.lastName,
                email: gardener.email,
                phone: gardener.phone,
                plot: gardener.plot,
                firebaseUserId: gardener.firebaseUserId
            }
            gardeners.add(newGardener)
            resp = newGardener
        } else {
            resp = { errorMsg: "missing required information"}
        }
        return response.status(200).send(resp)
    })
})