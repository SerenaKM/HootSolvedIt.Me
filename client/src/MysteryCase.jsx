const MysteryCase = (props) => {
  return (
    <div className="mystery-case">
      <h1>{props.name}</h1>
      <p>{props.background}</p>
      <img src={props.image} alt={props.name} className="mystery-case-icon" />
    </div>
  );
};

export default MysteryCase;
