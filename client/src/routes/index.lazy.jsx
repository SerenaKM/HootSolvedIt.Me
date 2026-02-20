import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <div className="index-brand">
        <h1>Play Game</h1>
      </div>
      <ul>
        <button className="play-button">
          <Link to="/game">Play!</Link>
        </button>
      </ul>
    </div>
  );
}
