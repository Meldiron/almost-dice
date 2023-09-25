export function requestFromContext(context) {
  const headers = new Headers();
  for (const header of Object.keys(context.req.headers)) {
    headers.set(header, context.req.headers[header]);
  }

  let body = context.req.bodyRaw;
  if (context.req.method === "GET" || context.req.method === "HEAD") {
    body = undefined;
  }

  const request = new Request(context.req.url, {
    method: context.req.method,
    body,
    headers,
  });

  return request;
}

export async function responseForContext(context, response) {
  const headers = {};
  for (const pair of response.headers.entries()) {
    headers[pair[0]] = pair[1];
  }

  return context.res.send(await response.text(), response.status, headers);
}
