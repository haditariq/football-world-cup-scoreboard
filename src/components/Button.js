const Button = ({ title, disabled, onPress, className }) => {
  return (
    <button disabled={disabled} onClick={onPress} className={className}>
      {title}
    </button>
  );
};

export default Button;
