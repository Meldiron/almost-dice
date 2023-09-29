import { Account, Client } from "appwrite";
import { Databases as ServerDatabases, Client as ServerClient } from "node-appwrite";
import { getCookie } from "hono/cookie";

export function Appwrite(app) {
  // Client SDK
  app.use("*", async (c, next) => {
    const sessionNames = [
      "a_session_" + process.env.APPWRITE_FUNCTION_PROJECT_ID.toLowerCase(),
      "a_session_" +
        process.env.APPWRITE_FUNCTION_PROJECT_ID.toLowerCase() +
        "_legacy",
    ];

    let hash = getCookie(c, sessionNames[0]);

    if (!hash) {
      hash = getCookie(c, sessionNames[1]);
    }

    if (!hash) {
      hash = "";
    }

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID);

    const authCookies = {};
    authCookies["a_session_" + process.env.APPWRITE_FUNCTION_PROJECT_ID] = hash;
    client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies);

    const account = new Account(client);

    c.set("sdkClientAccount", account);
    await next();
  });

  // Server SDK
  app.use("*", async (c, next) => {
    const client = new ServerClient()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new ServerDatabases(client);

    c.set("sdkServerDatabases", databases);
    await next();
  });
}
