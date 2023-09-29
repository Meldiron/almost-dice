export function Wallet(app) {
  app.use("*", async (c, next) => {
    const user = c.get("user");

    if (!user) {
      c.set("wallet", null);
      return await next();
    }

    const userId = user.$id;

    const databases = c.get("sdkServerDatabases");

    try {
      const wallet = await databases.getDocument("main", "wallets", userId);
      c.set("wallet", wallet);
    } catch (err) {
      if (err.type !== "document_not_found") {
        c.set("wallet", null);
        return await next();
      }

      try {
        const wallet = await databases.createDocument(
          "main",
          "wallets",
          userId,
          {
            balance: 1000,
          }
        );
        c.set("wallet", wallet);
      } catch (err) {
        c.set("wallet", null);
        return await next();
      }
    }

    await next();
  });
}
