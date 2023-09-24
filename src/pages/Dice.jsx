import * as elements from "typed-html";
export function Dice() {
  return (
    <div>
      <h1 class="text-stone-900 font-bold text-3xl mb-3 tracking-wide mb-6">
        Dices
      </h1>

      <div class="w-full grid grid-cols-12 gap-6">
        <div class="col-span-4 bg-white rounded-lg p-6">
          <form class="h-full flex flex-col space-y-8">
            <div class="shrink-0">
              <label class="font-semibold">Bet amount</label>
              <input
                type="number"
                class="mt-2 w-full p-2 bg-white border border-stone-300 rounded-md"
              />

              <div class="flex items-center space-x-2 mt-2">
                <button class="p-1 w-full bg-white text-stone-900 border border-stone-200 rounded-md">
                  1/2
                </button>
                <button class="p-1 w-full bg-white text-stone-900 border border-stone-200 rounded-md">
                  2x
                </button>
                <button class="p-1 w-full bg-white text-stone-900 border border-stone-200 rounded-md">
                  Max
                </button>
              </div>
            </div>

            <div class="shrink-0">
              <label class="font-semibold">Profit on win</label>
              <p>12</p>
            </div>

            <div class="h-full flex-1 flex items-end">
              <button class="w-full bg-amber-400 rounded-md text-stone-900 px-6 font-semibold py-2">
                Place bet
              </button>
            </div>
          </form>
        </div>
        <div class="col-span-8">
          <div class="h-full flex-1 bg-white rounded-lg p-6">
            <div class="flex justify-center">
              <div class="border border-stone-200 rounded-md p-6 text-2xl font-bold">
                ?
              </div>
            </div>
          </div>

          <div class="shrink-0 mt-6 bg-white rounded-lg p-6">
            <p>Bet options</p>
          </div>
        </div>
      </div>
    </div>
  );
}
