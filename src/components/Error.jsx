import * as elements from "typed-html";
export function Error({ message }) {
  return (
    <div class="bg-red-200 rounded-md p-2 w-full">
      <p class="text-red-700">{message}</p>
    </div>
  );
}
