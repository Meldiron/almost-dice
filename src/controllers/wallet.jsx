import * as elements from "typed-html";

export function Wallet(app) {
  app.get("/api/wallet", (c) => {
    const wallet = c.get("wallet");
    return c.html(<p>{wallet ? wallet.balance : 0} 🍪</p>);
  });
}
