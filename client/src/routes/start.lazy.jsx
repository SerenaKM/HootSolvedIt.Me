import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/start")({
  component: Start,
});

function Start() {
  return (
    <div className="game-board">
      <p className="dice-roll-outcome">You rolled a ...</p>
      <p className="reveal">This is what you found...</p>
      <div className="board-tile">
        <h3 className="tile-type">Crime Scene</h3>
        <span className="tile-number">1</span>
      </div>
      <div className="board-tile">
        <h3 className="tile-type">Suspect</h3>
        <span className="tile-number">2</span>
      </div>
      <div className="board-tile">
        <h3 className="tile-type">Clue</h3>
        <span className="tile-number">3</span>
      </div>
      <div className="board-tile">
        <h3 className="tile-type">Suspect</h3>
        <span className="tile-number">4</span>
      </div>
      <div className="board-tile">
        <h3 className="tile-type">Clue</h3>
        <span className="tile-number">5</span>
      </div>
      <div className="board-tile">
        <h3 className="tile-type">Clue</h3>
        <span className="tile-number">6</span>
      </div>
      <div className="board-tile">
        <h3 className="tile-type">Clue</h3>
        <span className="tile-number">7</span>
      </div>
      <div className="board-tile">
        <h3 className="tile-type">Clue</h3>
        <span className="tile-number">8</span>
      </div>
      <div className="board-tile">
        <h3 className="tile-type">Suspect</h3>
        <span className="tile-number">9</span>
      </div>
      <div className="board-tile">
        <h3 className="tile-type">Crime Scene</h3>
        <span className="tile-number">10</span>
      </div>
    </div>
  );
}
