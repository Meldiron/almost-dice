import { Hono } from "hono";
import { Home } from "./controllers/home";

const app = new Hono();

Home(app);

export default async function (context) {
  const request = requestFromContext(context);
  const response = await app.request(request);

  const headers = {};
  for (const pair of response.headers.entries()) {
    headers[pair[0]] = pair[1];
  }

  return context.res.send(await response.text(), response.status, headers);
}