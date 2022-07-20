import * as admin from "firebase-admin";

const serviceAccount = JSON.parse(
  String(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
);
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
};
if (!admin.apps.length) admin.initializeApp(firebaseConfig);

const auth = admin.auth();

export { auth };
