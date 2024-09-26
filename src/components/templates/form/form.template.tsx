import { Form as BootstrapForm } from "react-bootstrap";
import Button, { ButtonProps } from "../../atoms/button/button.atom";
import Input, { InputProps } from "../../atoms/input/input.atom";
import FormGroup, {
  FormGroupProps,
} from "../../molecules/form-group/form-group.molecule";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

export const enum ControlType {
  Input,
  Button,
  FormGroup,
}

export interface FormInput<T extends ControlType = ControlType> {
  type: T;
  props: T extends ControlType.Input
    ? InputProps
    : T extends ControlType.Button
      ? ButtonProps
      : FormGroupProps & { required: boolean };
}

interface FormProps {
  id: string;
  inputs: FormInput[];
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: SubmitHandler<any>;
}
const Form = ({
  id,
  inputs,
  handleSubmit,
  onSubmit,
}: FormProps): JSX.Element => {
  const mappedInputs = inputs.map<JSX.Element>((input, index) => {
    switch (input.type) {
      case ControlType.Button:
        const buttonProps = input.props as ButtonProps;
        return (
          <div key={`${id}-${index}-${buttonProps.id}`} className="mb-5">
            <Button
              id={`${id}-${index}-${buttonProps.id}`}
              text={buttonProps.text}
              type={buttonProps.type}
              onClick={buttonProps.onClick}
            />
          </div>
        );
      case ControlType.FormGroup:
        const formGroupProps = input.props as unknown as FormGroupProps;
        return (
          <div
            key={`${id}-${index}-${formGroupProps.controlId}`}
            className="mb-5"
          >
            <FormGroup
              controlId={`${id}-${index}-${formGroupProps.controlId}`}
              label={formGroupProps.label}
              invalidMessage={formGroupProps.invalidMessage}
              type={formGroupProps.type}
              placeholder={formGroupProps.placeholder}
              size={formGroupProps.size}
              disabled={formGroupProps.disabled}
              isInvalid={formGroupProps.isInvalid}
              name={formGroupProps.name}
              validation={formGroupProps.validation}
              register={formGroupProps.register}
            />
          </div>
        );
      default:
        const inputProps = input.props as InputProps;
        return (
          <div key={`${id}-${index}-${inputProps.id}`} className="mb-5">
            <Input
              key={`${id}-${index}-${inputProps.id}`}
              id={`${id}-${index}-${inputProps.id}`}
              type={inputProps.type}
              placeholder={inputProps.placeholder}
              size={inputProps.size}
              disabled={inputProps.disabled}
              isInvalid={inputProps.isInvalid}
              name={inputProps.name}
              validation={inputProps.validation}
              register={inputProps.register}
            />
          </div>
        );
    }
  });
  return (
    <BootstrapForm onSubmit={handleSubmit(onSubmit)}>
      {mappedInputs.map((input) => input)}
    </BootstrapForm>
  );
};

export default Form;
