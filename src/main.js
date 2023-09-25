import { Hono } from "hono";
import { Home } from "./controllers/home";
import { requestFromContext, responseForContext } from "./utils";
import { Dice } from "./controllers/dice";
import { Auth } from "./controllers/auth";
import { Appwrite } from "./middlewares/appwrite";
import { User } from "./middlewares/user";

const app = new Hono();

// Middlewares
Appwrite(app);
User(app);

// Controllers
Home(app);
Dice(app);
Auth(app);

export default async function (context) {
  const request = requestFromContext(context);
  const response = await app.request(request);
  return await responseForContext(context, response);
}
