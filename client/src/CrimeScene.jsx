const CrimeScene = (props) => {
  return (
    <div className="crime-scene">
      <h1>{props.location}</h1>
      <p>{props.description}</p>
      <img src={props.image} alt={props.name} className="crime-scene-icon" />
    </div>
  );
};

export default CrimeScene;
