import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Play Game</h1>
        <p>
          HootSolvedIt is a murder mystery snakes-and-ladders style game where
          you progress using dice rolls and passing "DnD"-style checks to gain
          valuable information regarding the crime scene, suspects and further
          clues.
        </p>
        <img
          src="/client/src/images/Owlwoofy.png"
          alt="mascot-image"
          className="mascot-image"
        />
        <p>
          My name is Owlwoofy and I will be your guide today. 🦉 Press Play to
          begin!
        </p>
        <button className="button">
          <Link to="/game">Play!</Link>
        </button>
      </div>
    </div>
  );
}
