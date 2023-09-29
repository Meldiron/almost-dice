import * as elements from "typed-html";
export function Register({ children }) {
  return (
    <div class="flex flex-col items-center">
      <h1 class="text-stone-900 text-center font-bold text-3xl mb-3 tracking-wide mb-6">
        Register
      </h1>
      <div class="w-full max-w-lg bg-white rounded-lg p-6">
        <form
          id="register-form"
          hx-swap="outerHTML"
          hx-select="#register-form"
          hx-post="/auth/register"
          class="h-full flex flex-col space-y-8"
        >
          <div>
            <label class="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required={true}
              class="mt-2 w-full p-2 bg-white border border-stone-300 rounded-md"
            />
          </div>

          <div>
            <label class="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              required={true}
              class="mt-2 w-full p-2 bg-white border border-stone-300 rounded-md"
            />
          </div>

          <div>
            <label class="font-semibold">Password Again</label>
            <input
              type="password"
              name="password2"
              required={true}
              class="mt-2 w-full p-2 bg-white border border-stone-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-amber-400 rounded-md text-stone-900 px-6 font-semibold py-2"
          >
            Sign Up
          </button>

          {children}
        </form>
      </div>
    </div>
  );
}
