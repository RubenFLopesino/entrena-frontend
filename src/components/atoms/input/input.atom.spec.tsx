import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import Input, { InputType, InputProps, InputSize } from "./input.atom";
import { Form } from "react-bootstrap";

const renderInputWithForm = (props: Partial<InputProps> = {}) => {
  const Component = () => {
    const { register } = useForm();
    return (
      <Form>
        <Input
          name="test-input"
          register={register}
          validation={{ required: "This field is required" }}
          {...props}
        />
      </Form>
    );
  };

  return render(<Component />);
};

describe("Input component", () => {
  it("should render input with default type as text", () => {
    renderInputWithForm();

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("should render input with provided type", () => {
    renderInputWithForm({
      type: InputType.Password,
      placeholder: "Enter password",
    });

    const input = screen.getByPlaceholderText("Enter password");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  it("should apply the placeholder", () => {
    renderInputWithForm({ placeholder: "Enter your email" });

    const input = screen.getByPlaceholderText("Enter your email");

    expect(input).toBeInTheDocument();
  });

  it("should render the input with large size", () => {
    renderInputWithForm({ size: InputSize.Large });

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("form-control-lg");
  });

  it("should apply validation rules", async () => {
    renderInputWithForm({
      validation: { required: "Required field" },
    });

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("name", "test-input");
  });

  it("should be disabled if disabled prop is true", () => {
    renderInputWithForm({ disabled: true });

    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
  });

  it("should display invalid state when isInvalid is true", () => {
    renderInputWithForm({ isInvalid: true });

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("is-invalid");
  });
});
