import { render, screen } from "@testing-library/react";
import Loader from "./loader.atom";

describe("Loader component", () => {
  it("should render the loader", () => {
    render(<Loader />);

    const loader = screen.getByTestId("loader");

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("loader");
  });
});
