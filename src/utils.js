export function setup(context) {
  context.res.html = (html, statusCode = 200, headers = {}) => {
    headers["Content-Type"] = "text/html";
    return context.res.send(html, statusCode, headers);
  };
}
