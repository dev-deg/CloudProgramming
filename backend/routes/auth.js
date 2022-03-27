import Express from "express";
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID =
  "578170717869-2lhitb57p9b5vj11u63vu6or2os38a7f.apps.googleusercontent.com";
const auth = Express.Router();
const client = new OAuth2Client(CLIENT_ID);

export default auth;

auth.route("/").post((req, res) => {
  const email = req.query.email;
  const token = req.query.token;
  console.log(`Auth request by ${email} with token ${token}`);
  verify(token)
    .then((r) => {
      console.log(r);
      res.send("Token valid!");
    })
    .catch((error) => {
      console.log(error);
      res.send("Token invalid!");
    });
});

const verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  console.log(payload);
  console.log(userid);
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
};
