import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

vi.mock("next/image", () => ({
  default: (props: React.ComponentProps<"img">) => {
    return React.createElement("img", props);
  },
}));

vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}));
