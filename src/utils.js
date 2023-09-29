/**
 * Throws an error if any of the keys are missing from the object
 * @param {*} obj
 * @param {string[]} keys
 * @throws {Error}
 */
export function throwIfMissing(obj, keys) {
  const missing = [];
  for (let key of keys) {
    if (!(key in obj) || !obj[key]) {
      missing.push(key);
    }
  }
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
}

/**
 * Convert Open Runtimes context to JavaScript native Request
 */
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

/**
 * Convert native JavaScript Response to Open Runtimes context response
 */
export async function responseForContext(context, response) {
  const headers = {};
  for (const pair of response.headers.entries()) {
    headers[pair[0]] = pair[1];
  }

  return context.res.send(await response.text(), response.status, headers);
}
