import * as elements from "typed-html";

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

export async function UsersOnly(c, next) {
  const user = c.get("user");

  if(user === null) {
    c.res.headers.append('HX-Redirect', '/');
    return c.redirect('/');
  }

  await next();
}

export async function GuestsOnly(c, next) {
  const user = c.get("user");

  if(user !== null) {
    c.res.headers.append('HX-Redirect', '/');
    return c.redirect('/');
  }

  await next();
}