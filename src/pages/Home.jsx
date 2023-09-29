import * as elements from "typed-html";
export function Games() {
  return (
    <div class="w-full grid grid-cols-12 gap-6">
      <div class="col-span-8">
        <Game
          title="Dice"
          description="Fully configurable game to guess range in which randomly generated number will land. Make it as risky or safe as you want."
          playable={true}
          url="/dice"
        />
      </div>
      <div class="col-span-4">
        <Game
          title="Crash"
          description="Guess when growing vector randomly crashes."
          playable={false}
        />
      </div>
      <div class="col-span-4">
        <Game
          title="Slide"
          description="Game to guess multiplier of the slide. You win when multiplier passes your guess."
          playable={false}
        />
      </div>
      <div class="col-span-4">
        <Game
          title="Mines"
          description="Casino game based on classic game Minesweeper but without indication where mines are."
          playable={false}
        />
      </div>
      <div class="col-span-4">
        <Game
          title="Roulette"
          description="Bet on which red, black or green numbered slots a small ball will land."
          playable={false}
        />
      </div>
    </div>
  );
}

function Game({ title, description, playable, url }) {
  return (
    <div class="bg-white rounded-3xl p-6">
      <h1 class="text-stone-900 font-bold text-2xl mb-3 tracking-wide">
        {title}
      </h1>
      <p class="text-stone-700 text-lg mb-6">{description}</p>

      {playable ? (
        <div hx-boost="true">
          <a href={url}>
            <button class="bg-amber-400 text-stone-900 px-4 font-semibold py-2 rounded-xl flex items-center justify-center space-x-4">
              <span>Play now</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-stone-900"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </a>
        </div>
      ) : (
        <button
          disabled={true}
          class="bg-stone-100 text-stone-600 px-4 font-semibold py-2 rounded-xl flex items-center justify-center space-x-4"
        >
          <span>Play soon</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-stone-300"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
