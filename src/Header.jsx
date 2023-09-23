import * as elements from "typed-html";
export function Header() {
  return (
    <header>
      <button hx-get="/home" hx-target="#page">
        Home
      </button>
      <button hx-get="/orders" hx-target="#page">
        Orders
      </button>
    </header>
  );
}
