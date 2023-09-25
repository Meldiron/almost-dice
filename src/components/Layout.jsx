import * as elements from "typed-html";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children, user }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Almost Dices</title>
        <script src="https://unpkg.com/htmx.org@1.9.6"></script>
        <script src="https://cdn.tailwindcss.com"></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body class="bg-stone-100" style="font-family: 'Exo', sans-serif;">
        <div class="min-h-screen flex flex-col">
          <div class="shrink-0">
            <Header isLoggedIn={user !== null} />
          </div>
          <main id="page" class="flex-1 h-full py-6 mx-auto max-w-5xl w-full">
            {children}
          </main>
          <div class="shrink-0">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
