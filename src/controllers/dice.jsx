import * as elements from "typed-html";
import { Layout } from "../components/Layout";
import { Dice } from "../pages/Dice";

export function Dice(app) {
  app.get("/dice", (c) => {
    return c.html(
      <Layout user={c.get("user")}>
        <Dice />
      </Layout>,
    );
  });
}
