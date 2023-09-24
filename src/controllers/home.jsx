import * as elements from "typed-html";
import { Layout } from "../components/Layout";
import { Games } from "../pages/Home";

export function Home(app) {
  app.get("/", (c) => {
    return c.html(<Layout><Games /></Layout>);
  });
}
