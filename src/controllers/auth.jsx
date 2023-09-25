import * as elements from "typed-html";
import { Layout } from "../components/Layout";
import { Login } from "../pages/Login";
import { Error as ErrorComponent } from "../components/Error";
import axios from "axios";
import { deleteCookie } from "hono/cookie";
import { Register } from "../pages/Register";

export function Auth(app) {
  app.get("/login", (c) => {
    return c.html(
      <Layout user={c.get("user")}>
        <Login />
      </Layout>,
    );
  });

  app.post("/login", async (c) => {
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

      return c.html(<Login />, {
        headers: {
          "Set-Cookie": cookiesArray.join(", "),
        },
      });
    } catch (err) {
      return c.html(
        <Login>
          <ErrorComponent message={err.message} />
        </Login>,
      );
    }
  });

  app.get("/register", (c) => {
    return c.html(
      <Layout user={c.get("user")}>
        <Register />
      </Layout>,
    );
  });

  app.post("/register", async (c) => {
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

      return c.html(<Register />, {
        headers: {
          "Set-Cookie": cookiesArray.join(", "),
        },
      });
    } catch (err) {
      console.log(err);
      console.log(err.message);
      return c.html(
        <Register>
          <ErrorComponent message={err.message} />
        </Register>,
      );
    }
  });

  app.post("/logout", async (c) => {
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

    return c.html(<p>OK</p>);
  });
}
