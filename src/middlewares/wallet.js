export function Wallet(app) {
  app.use("*", async (c, next) => {
    const user = c.get('user');

    if(!user) {
      c.set("wallet", null);
      return await next();
    }

    const userId = user.$id;

    const databases = c.get("sdkServerDatabases");

    try {
      const wallet = await databases.getDocument('main', 'wallets', userId);
    } catch (err) {
      console.log(err);
    }

    await next();
  });
}