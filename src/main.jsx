import * as elements from 'typed-html';
import { Layout } from './Layout';

const setup = (context) => {
  context.res.html = (html, statusCode = 200, headers = {}) => {
    headers['Content-Type'] = 'text/html';
    return context.res.send(html, statusCode, headers);
  };
}

export default async (context) => {
  setup(context);

  if(context.req.path === '/') {
    return context.res.html(
      <Layout>
        <h1>Homepage</h1>
      </Layout>
    );
  }

  if(context.req.path === '/orders') {
    return context.res.html(
      <Layout>
        <p>Orders</p>
      </Layout>
    );
  }
  
  return context.res.empty();
};
