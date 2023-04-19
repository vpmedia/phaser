export class RequestAnimationFrame {
  constructor(game) {
    this.game = game;
    this.rafId = 0;
    this.updateBinded = this.update.bind(this);
  }

  start() {
    this.rafId = requestAnimationFrame(this.updateBinded);
  }

  stop() {
    cancelAnimationFrame(this.rafId);
  }

  update(rafTime) {
    this.game.update(rafTime);
    this.rafId = requestAnimationFrame(this.updateBinded);
  }
}
