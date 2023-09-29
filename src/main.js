import { Hono } from "hono";
import { Home } from "./controllers/home";
import {
  requestFromContext,
  responseForContext,
  throwIfMissing,
} from "./utils";
import { Dice } from "./controllers/dice";
import { Auth } from "./controllers/auth";
import { Appwrite } from "./middlewares/appwrite";
import { User } from "./middlewares/user";
import { Wallet as WalletController } from "./controllers/wallet";
import { Wallet } from "./middlewares/wallet";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

// Middlewares
Appwrite(app);
User(app);
Wallet(app);

// Controllers
Home(app);
Dice(app);
Auth(app);
WalletController(app);
app.use("/*", serveStatic({ root: "./src/static" }));

export default async function (context) {
  throwIfMissing(process.env, ["APPWRITE_API_KEY"]);

  const request = requestFromContext(context);
  const response = await app.request(request);
  return await responseForContext(context, response);
}
