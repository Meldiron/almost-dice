document.addEventListener("alpine:init", () => {
  Alpine.data("dice", () => ({
    maxBet: 999,
    bet: 1,
    separator: 52,
    multiplier: 2,
    winChance: 48,
    direction: "over",

    setMultiplier(event) {
      const multiplier = +event.target.value;

      this.multiplier = multiplier;

      this.winChance = 1/this.multiplier*100;
      this.winChance -= this.winChance * 0.04;
      this.winChance = Math.floor(this.winChance);

      if(this.direction === "over") {
        this.separator = 100 - this.winChance;
      } else {
        this.separator = this.winChance;
      }
    },

    setWinChance(event) {
      const winChance = +event.target.value;

      this.winChance = winChance;

      this.multiplier = 100/this.winChance;
      this.multiplier -= this.multiplier * 0.04;
      this.multiplier = Math.floor(this.multiplier);

      if(this.direction === "over") {
        this.separator = 100 - this.winChance;
      } else {
        this.separator = this.winChance;
      }
    },

    toggleDirection() {
      this.direction = this.direction === 'over' ? 'under' : 'over';

      if(this.direction === "over") {
        this.separator = 100 - this.winChance;
      } else {
        this.separator = this.winChance;
      }

    }
  }));
});
