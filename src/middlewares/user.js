import * as elements from "typed-html";

export function User(app) {
  console.log("Define2");
  app.use("*", async (c, next) => {
    console.log("Get2");
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