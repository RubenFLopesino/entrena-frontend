import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonType, ButtonProps } from "./button.atom";

describe("Button component", () => {
  const defaultProps: ButtonProps = {
    id: "test-button",
    text: "Click me",
  };

  it("should render the button with default type", () => {
    render(<Button {...defaultProps} />);

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("should render the button with a submit type", () => {
    render(<Button {...defaultProps} type={ButtonType.Submit} />);

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toHaveAttribute("type", "submit");
  });

  it("should call onClick when button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick if onClick is not provided", () => {
    render(<Button {...defaultProps} />);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
  });

  it("should render the button with the correct text", () => {
    render(<Button {...defaultProps} text="Submit" />);

    const button = screen.getByRole("button", { name: /submit/i });

    expect(button).toBeInTheDocument();
  });
});
