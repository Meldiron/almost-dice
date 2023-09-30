import * as elements from "typed-html";
import { Layout } from "../components/Layout";
import { Login } from "../pages/Login";
import { Error as ErrorComponent } from "../components/Error";
import axios from "axios";
import { deleteCookie } from "hono/cookie";
import { Register } from "../pages/Register";
import { Header } from "../components/Header";
import { GuestsOnly, UsersOnly } from "../middlewares/user";

export function Auth(app) {
  app.get("/auth/header", (c) => {
    const user = c.get("user");
    return c.html(
      <Header balance={c.get("wallet").balance} isLoggedIn={user !== null} />
    );
  });

  app.get("/auth/login", GuestsOnly, (c) => {
    return c.html(
      <Layout user={c.get("user")} wallet={c.get("wallet")}>
        <Login />
      </Layout>,
    );
  });

  app.post("/auth/login", GuestsOnly, async (c) => {
    const body = await c.req.parseBody();
    const { email, password } = body;

    try {
      const response = await axios.post(
        "https://cloud.appwrite.io/v1/account/sessions/email",
        {
          email,
          password,
        },
        {
          headers: {
            "x-appwrite-project": process.env.APPWRITE_FUNCTION_PROJECT_ID,
          },
        },
      );

      let host = c.req.header("host").split(":")[0];
      host = host === "localhost" ? host : "." + host;

      const cookiesArray = response.headers["set-cookie"].map((cookie) => {
        return cookie.split(".cloud.appwrite.io").join(host);
      });

      return c.html(<Login />, 200, {
        "Set-Cookie": cookiesArray.join(", "),
        "HX-Trigger": "reload-header",
        "HX-Location": "/"
      });
    } catch (err) {
      return c.html(
        <Login>
          <ErrorComponent message={err.message} />
        </Login>,
      );
    }
  });

  app.get("/auth/register", GuestsOnly, (c) => {
    return c.html(
      <Layout user={c.get("user")} wallet={c.get("wallet")}>
        <Register />
      </Layout>,
    );
  });

  app.post("/auth/register", GuestsOnly, async (c) => {
    const body = await c.req.parseBody();
    const { email, password, password2 } = body;

    try {
      if (password !== password2) {
        throw Error("Passwords do not match.");
      }

      const registerResponse = await axios.post(
        "https://cloud.appwrite.io/v1/account",
        {
          userId: "unique()",
          email,
          password,
        },
        {
          headers: {
            "x-appwrite-project": process.env.APPWRITE_FUNCTION_PROJECT_ID,
          },
        },
      );

      const response = await axios.post(
        "https://cloud.appwrite.io/v1/account/sessions/email",
        {
          email,
          password,
        },
        {
          headers: {
            "x-appwrite-project": process.env.APPWRITE_FUNCTION_PROJECT_ID,
          },
        },
      );

      let host = c.req.header("host").split(":")[0];
      host = host === "localhost" ? host : "." + host;

      const cookiesArray = response.headers["set-cookie"].map((cookie) => {
        return cookie.split(".cloud.appwrite.io").join(host);
      });

      return c.html(<Register />, 200, {
        "Set-Cookie": cookiesArray.join(", "),
          "HX-Trigger": "reload-header",
          "HX-Location": "/"
      });
    } catch (err) {
      return c.html(
        <Register>
          <ErrorComponent message={err.message} />
        </Register>,
      );
    }
  });

  app.post("/auth/logout", UsersOnly, async (c) => {
    const client = c.get("sdkClientAccount");

    await client.deleteSession("current");

    const cookieNames = [
      "a_session_" + process.env.APPWRITE_FUNCTION_PROJECT_ID.toLowerCase(),
      "a_session_" +
        process.env.APPWRITE_FUNCTION_PROJECT_ID.toLowerCase() +
        "_legacy",
    ];

    deleteCookie(c, cookieNames[0]);
    deleteCookie(c, cookieNames[1]);

    return c.html(<p>OK</p>, 200, {
      "HX-Trigger": "reload-header",
      "HX-Location": "/"
    });
  });
}
