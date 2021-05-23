const fetch = require("node-fetch");
const app = require("express")();

app.get("/getToken", (_, res) => {
  const { INSTA_APP_ID, INSTA_APP_SECRET } = process.env;
  if (!INSTA_APP_ID || !INSTA_APP_SECRET) {
    res.json({
      error: {
        message:
          "kali-server error: Error getting app id and secret from the environment.",
      },
    });
    return;
  }
  const url = `https://graph.facebook.com/oauth/access_token?client_id=${INSTA_APP_ID}&client_secret=${INSTA_APP_SECRET}&grant_type=client_credentials`;
  fetch(url)
    .catch((err) => {
      console.error("Caught error calling graph API", err);
      res.json(err);
    })
    .then((data) => data.json())
    .then((json) => {
      console.log("Successfully fetched graph api token", json);
      res.json(json);
    });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
