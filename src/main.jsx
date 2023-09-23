import * as elements from 'typed-html';
import { Layout } from './Layout';
import { setup } from './utils';

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
      <p>Orders</p>
    );
  }

  if(context.req.path === '/home') {
    return context.res.html(
      <h1>Home</h1>
    );
  }
  
  return context.res.empty();
};
