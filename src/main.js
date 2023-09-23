import { Hono } from "hono";
import { Home } from "./controllers/home";
import { requestFromContext, responseForContext } from './utils';

const app = new Hono();

Home(app);

export default async function (context) {
  const request = requestFromContext(context);
  const response = await app.request(request);
  return await responseForContext(context, response);
}