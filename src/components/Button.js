const Button = ({ title, disabled, onPress }) => {
  return (
    <button disabled={disabled} onClick={onPress}>
      {title}
    </button>
  );
};

export default Button;
