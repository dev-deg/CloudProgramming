import Express from "express";
import cors from "cors";
import https from "https";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const PORT = 80;
const SECRET_MANAGER_CERT =
  "projects/578170717869/secrets/PublicKey/versions/latest";
const SECRET_MANAGER_PK =
  "projects/578170717869/secrets/PrivateKey/versions/latest";
const SECRET_MANAGER_GET_OUT_PDF =
  "projects/578170717869/secrets/GetOutPDF/versions/latest";

const sm = new SecretManagerServiceClient({
  projectId: "pftc0000001",
  keyFilename: "./key.json",
});

const startServerEncrypted = async () => {
  const [pub] = await sm.accessSecretVersion({
    name: SECRET_MANAGER_CERT,
  });

  const [prvt] = await sm.accessSecretVersion({
    name: SECRET_MANAGER_PK,
  });

  const sslOptions = {
    key: prvt.payload.data.toString(),
    cert: pub.payload.data.toString(),
  };

  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log("Secure Server Listening on port:" + PORT);
  });
};

const startServer = () => {
  app.listen(PORT, () => console.log("Server Listening on port: " + PORT));
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Express();
//enabled http -> https redirection
//app.enable("trust proxy");

//serve static files
app.use(Express.static(path.join(__dirname, "../frontend/public")));

//allow cross-origin reqs
app.use(cors());

//redirect to https
// app.use((req, res, next) => {
//   req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
// });

//Delivering index.html;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

startServer();
//startServerEncrypted();
