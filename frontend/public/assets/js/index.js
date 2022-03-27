let signInButton = document.getElementById("signIn");
let signOutButton = document.getElementById("signOut");

const authenticateReq = async (token) => {
  const url = `https://dev-deg.me/auth?token=${token}`;
  const headers = {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  };
  const response = await axios.post(url, headers);
  const name = response.data.name;
  const email = response.data.email;
  const picture = response.data.picture;
  const expiry = response.data.expiry;
  signInButton.hidden = true;
  signOutButton.hidden = false;
  document.cookie = `token=${token};expires=${expiry}`;
  console.log(`${name} signed in successfully.`);
};

async function loadGoogleLogin() {
  let session = document.cookie.split("token=")[1].split(";")[0];
  console.log(session);
  if (session) {
    authenticateReq(session);
  }

  const signOut = () => {
    var auth2 = gapi.auth2.getAuthInstance();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    auth2
      .signOut()
      .then(() => {
        signOutButton.hidden = true;
        signInButton.hidden = false;
        console.log("User signed out.");
      })
      .catch((error) => alert(error));
  };

  signOutButton.addEventListener("click", () => signOut());

  gapi.load("auth2", () => {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    let auth2 = gapi.auth2.init({
      client_id:
        "578170717869-2lhitb57p9b5vj11u63vu6or2os38a7f.apps.googleusercontent.com",
      cookiepolicy: "single_host_origin",
      scope: "profile",
    });

    auth2.attachClickHandler(
      signInButton,
      {},
      function (googleUser) {
        authenticateReq(googleUser.getAuthResponse().id_token);
      },
      function (error) {
        alert(
          "Error: " + JSON.parse(JSON.stringify(error, undefined, 2)).error
        );
      }
    );
  });
}
