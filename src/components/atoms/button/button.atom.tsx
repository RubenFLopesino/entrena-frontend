import { Button as BootstrapButton } from "react-bootstrap";

export const enum ButtonType {
  Submit = "submit",
  Reset = "reset",
  Button = "button",
}

export interface ButtonProps {
  id: string;
  text: string;
  type?: ButtonType;
  onClick?: () => void;
}

const Button = ({ id, text, type, onClick }: ButtonProps): JSX.Element => {
  return (
    <BootstrapButton
      id={id}
      type={type ?? ButtonType.Button}
      onClick={(event) => {
        if (!onClick) event.persist();
        else {
          event.preventDefault();
          onClick();
        }
      }}
      className="w-100"
    >
      {text}
    </BootstrapButton>
  );
};

export default Button;
