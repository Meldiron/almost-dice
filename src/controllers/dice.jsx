import * as elements from "typed-html";
import { Layout } from "../components/Layout";
import { Dice } from "../pages/Dice";

export function Dice(app) {
  app.get("/dice", (c) => {
    return c.html(
      <Layout user={c.get("user")} wallet={c.get("wallet")}>
        <Dice />
      </Layout>
    );
  });

  app.post("/dice", async (c) => {
    const wallet = c.get("wallet");

    wallet.balance -= 10;
    c.set("wallet", wallet);

    const databases = c.get("sdkServerDatabases");
    await databases.updateDocument("main", "wallets", wallet.$id, {
      balance: wallet.balance
    });

    return c.html(<p>OK</p>, 200, {
      "HX-Trigger": "reload-wallet",
    });
  });
}
