export function User(app) {
  app.use("*", async (c, next) => {
    const account = c.get("sdkClientAccount");

    try {
      const user = await account.get();
      c.set("user", user);
    } catch (err) {
      c.set("user", null);
    }

    await next();
  });
}
