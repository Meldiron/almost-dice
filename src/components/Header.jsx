import * as elements from "typed-html";
export function Header({ isLoggedIn }) {
  return (
    <div>
      <div class="bg-amber-400  p-1">
        <div class="mx-auto max-w-5xl text-center">
          <p class="uppercase text-stone-900 font-bold">
            Gambling leads to addictions with serious consequences!
          </p>
        </div>
      </div>
      <header class="border-b-2 border-stone-200 py-4">
        <div class="mx-auto max-w-5xl flex items-center justify-between space-x-4">
          <div hx-boost="true">
            <a href="/" class="font-bold text-xl text-stole-900 tracking-wide">
              Almost Dices
            </a>
          </div>
          {isLoggedIn ? (
            <div class="flex items-center space-x-3">
              <button
                hx-swap="none"
                hx-post="/logout"
                type="button"
                class="bg-white rounded-xl text-stone-900 px-6 font-semibold py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div hx-boost="true" class="flex items-center space-x-3">
              <a
                href="/register"
                class="bg-amber-400 rounded-xl text-stone-900 px-6 font-semibold py-2"
              >
                Register
              </a>
              <a
                href="/login"
                class="bg-white rounded-xl text-stone-900 px-6 font-semibold py-2"
              >
                Login
              </a>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
