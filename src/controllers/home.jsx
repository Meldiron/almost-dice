import { Layout } from "../Layout";

export function Home(app) {
  app.get("/", (c) => {
    return c.html(<Layout><h1>Works!</h1></Layout>);
  });
}
