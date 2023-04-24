export class RequestAnimationFrame {
  /**
   * TBD.
   * @param {Game} game - TBD.
   */
  constructor(game) {
    this.game = game;
    this.rafId = 0;
    this.updateBinded = this.update.bind(this);
  }

  /**
   * TBD.
   */
  start() {
    this.rafId = requestAnimationFrame(this.updateBinded);
  }

  /**
   * TBD.
   */
  stop() {
    cancelAnimationFrame(this.rafId);
  }

  /**
   * TBD.
   * @param {number} rafTime - TBD.
   */
  update(rafTime) {
    this.game.update(rafTime);
    this.rafId = requestAnimationFrame(this.updateBinded);
  }
}
