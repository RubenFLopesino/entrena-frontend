import { Form } from "react-bootstrap";
import Input, { InputProps } from "../../atoms/input/input.atom";

export interface FormGroupProps extends Omit<InputProps, "id"> {
  controlId: string;
  label: string;
  invalidMessage: string;
}

const FormGroup = ({
  controlId,
  label,
  invalidMessage,
  placeholder,
  type,
  size,
  isInvalid,
  disabled,
  name,
  register,
  validation,
}: FormGroupProps): JSX.Element => {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Input
        type={type}
        placeholder={placeholder}
        size={size}
        disabled={disabled}
        isInvalid={isInvalid}
        name={name}
        register={register}
        validation={validation}
      />
      <Form.Control.Feedback type="invalid">
        {invalidMessage}
      </Form.Control.Feedback>{" "}
    </Form.Group>
  );
};

export default FormGroup;
