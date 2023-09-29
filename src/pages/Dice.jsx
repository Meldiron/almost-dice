import * as elements from "typed-html";
export function Dice() {
  return (
    <div>
      <h1 class="text-stone-900 font-bold text-3xl mb-3 tracking-wide mb-6">
        Dices
      </h1>

      <div x-data="{ maxBet: 999, bet: 1, separator: 52, multiplier: 2, winChance: 48, direction: 'over' }" class="w-full grid grid-cols-12 gap-6">
        <div class="col-span-4 bg-white rounded-lg p-6">
          <div class="h-full flex flex-col space-y-8">
            <div class="shrink-0">
              <label class="font-semibold">Bet amount</label>
              <input
                x-model="bet"
                type="number"
                class="mt-2 w-full p-2 bg-white border border-stone-300 rounded-md"
              />

              <div class="flex items-center space-x-2 mt-2">
                <button x-on:click="bet = Math.min(maxBet, bet/2)" class="p-1 w-full bg-white text-stone-900 border border-stone-200 rounded-md">
                  1/2
                </button>
                <button x-on:click="bet = Math.min(maxBet, bet*2)" class="p-1 w-full bg-white text-stone-900 border border-stone-200 rounded-md">
                  2x
                </button>
                <button x-on:click="bet = maxBet" class="p-1 w-full bg-white text-stone-900 border border-stone-200 rounded-md">
                  Max
                </button>
              </div>
            </div>

            <div class="shrink-0">
              <label class="font-semibold">Profit on win</label>
              <p x-text="bet * multiplier"></p>
            </div>

            <div class="h-full flex-1 flex items-end">
              <button class="w-full bg-amber-400 rounded-md text-stone-900 px-6 font-semibold py-2">
                Place bet
              </button>
            </div>
          </div>
        </div>
        <div class="col-span-8 flex flex-col">
          <div class="h-full flex-1 bg-white rounded-lg p-6">
            <div class="flex justify-center items-center h-full">
              <div class="border border-stone-200 rounded-md p-6 px-12 text-2xl font-bold">
                ?
              </div>
            </div>
          </div>

          <div class="shrink-0 mt-6 bg-white rounded-lg p-6">
            <div class="w-full grid grid-cols-12 gap-6">
              <div class="col-span-4">
                <label class="font-semibold">Multiplier</label>
                <input
                  x-bind:value="multiplier"
                  type="number"
                  class="mt-2 w-full p-2 bg-white border border-stone-300 rounded-md"
                />
              </div>
              <div class="col-span-4">
                <label class="font-semibold">Roll <span x-text="direction === 'over' ? 'Over' : 'Under'"></span></label>
                <div class="mt-2 flex items-center justify-center space-x-2">
                  <button x-on:click="direction = direction === 'over' ? 'under' : 'over'" class="p-2 bg-white text-stone-900 border border-stone-200 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      />
                    </svg>
                  </button>
                  <input
                    x-bind:value="separator"
                    type="number"
                    disabled={true}
                    class="w-full p-2 bg-stone-200 border border-stone-300 rounded-md"
                  />
                </div>
              </div>
              <div class="col-span-4">
                <label class="font-semibold">Win Chance</label>
                <input
                  x-bind:value="winChance"
                  type="number"
                  class="mt-2 w-full p-2 bg-white border border-stone-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
