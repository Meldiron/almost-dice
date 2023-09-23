import * as elements from "typed-html";
export function Header() {
  return (
    <header>
      <button hx-post="/home" hx-target="#page">
        Home
      </button>
      <button hx-post="/orders" hx-target="#page">
        Orders
      </button>
    </header>
  );
}
