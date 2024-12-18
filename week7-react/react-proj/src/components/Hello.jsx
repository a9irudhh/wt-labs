const Hello = (props) => {
  return (
    <div>
      <h1> Hello, {props.name}!. {props.message}</h1>
    </div>
  );
};

export default Hello;