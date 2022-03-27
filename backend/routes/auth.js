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
  client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .catch((error) => {
      console.log(error);
      res.send({ status: "401" });
    })
    .then((ticket) => {
      const payload = ticket.getPayload();
      if (email == payload.email) {
        res.send({
          status: "200",
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          token: token,
        });
        console.log(`${payload.name} has logged in.`);
      } else {
        res.send({ status: "401" });
      }
    });
});
