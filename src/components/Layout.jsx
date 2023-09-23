import * as elements from "typed-html";
import { Header } from "./Header";

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Title</title>
        <script src="https://unpkg.com/htmx.org@1.9.6"></script>
      </head>
      <body>
        <Header />
        <hr />
        {children}
      </body>
    </html>
  );
}
