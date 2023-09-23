import * as elements from 'typed-html';

export default async (context) => {
  return context.res.send(<h1>Hello World</h1>);
};
