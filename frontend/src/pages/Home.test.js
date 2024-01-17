import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

test("renders Home component correctly", () => {
  // Render Home component
  const { container } = render(<Home />);

  // Compare rendered output with the existing snapshot
  expect(container).toMatchSnapshot();
});
