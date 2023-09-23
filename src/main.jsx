import * as elements from 'typed-html';

const setup = (context) => {
  context.res.html = (html, statusCode = 200, headers = {}) => {
    headers['Content-Type'] = 'text/html';
    return context.res.send(html, statusCode, headers);
  };
}

export default async (context) => {
  setup(context);
  
  return context.res.html(<h1>Hello World</h1>);
};
