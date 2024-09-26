import { Form } from "react-bootstrap";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

export const enum InputSize {
  Small = "sm",
  Large = "lg",
}

// This enum can be extended to all the types used by Form.Control
export enum InputType {
  Text = "text",
  Password = "password",
  Email = "email",
}

export interface InputProps {
  id?: string;
  name: string;
  register: UseFormRegister<any>;
  validation: RegisterOptions;
  disabled?: boolean;
  isInvalid?: boolean;
  type?: InputType;
  placeholder?: string;
  size?: InputSize;
  errorMessage?: string;
}

const Input = ({
  id,
  name,
  validation,
  disabled,
  placeholder,
  type,
  size,
  isInvalid,
  register,
  errorMessage,
}: InputProps): JSX.Element => {
  return (
    <>
      <Form.Control
        id={id}
        disabled={disabled}
        type={type ?? InputType.Text}
        placeholder={placeholder}
        size={size}
        isInvalid={isInvalid}
        {...register(name, validation)} // Input register on react-hook-form
      />
      {isInvalid && (
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      )}
    </>
  );
};

export default Input;
