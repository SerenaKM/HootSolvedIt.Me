import { useEffect, useState } from "react";
import MysteryCase from "../MysteryCase";
import CrimeScene from "../CrimeScene";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/game")({
  component: Game,
});

export default function Game() {
  const [mysteryCases, setCases] = useState([]);
  const [mysteryCase, setCase] = useState("");
  const [loading, setLoading] = useState(true);
  const [crimeScene, setCrimeScene] = useState({});

  async function fetchCrimeScene(caseId) {
    const crimeSceneRes = await fetch(`/api/crimescene/${caseId}`);
    const { crimeScene } = await crimeSceneRes.json();
    setCrimeScene(crimeScene);
    setLoading(false);
  }

  let selectedCase;

  if (!loading) {
    selectedCase = mysteryCases.find((mystery) => mystery.id === mysteryCase);
  }

  async function fetchMysteryCases() {
    const casesRes = await fetch("/api/cases");
    const casesJson = await casesRes.json();
    setCases(casesJson);
    setLoading(false);
  }

  useEffect(() => {
    fetchMysteryCases();
  }, []);

  function addCrimeScene() {
    fetchCrimeScene(selectedCase.id);
  }

  return (
    <div className="new-case">
      <h2>Select Mystery Case</h2>
      <form action={addCrimeScene}>
        <div>
          <div>
            <label htmlFor="case"></label>
            <select
              onChange={(e) => setCase(e.target.value)}
              name="case"
              value={mysteryCase}
            >
              {mysteryCases.map((mystery) => (
                // transform an array of objects into an array of React elements
                <option key={mystery.id} value={mystery.id}>
                  {mystery.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit">Choose</button>
        {loading || !selectedCase ? (
          <h1></h1>
        ) : (
          <div className="chosen-case">
            <MysteryCase
              name={selectedCase.name}
              background={selectedCase.background}
              image="client/src/assets/research.png"
            />
          </div>
        )}
        {loading || !crimeScene?.id ? (
          <h1></h1>
        ) : (
          <div className="crime-scene">
            <CrimeScene
              location={crimeScene.location}
              description={crimeScene.description}
              image="client/src/assets/police-line.png"
            />
            <Link to="/start">
              <img
                src="client/src/assets/dice.gif"
                className="dice-image"
              ></img>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
