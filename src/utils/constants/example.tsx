import { z } from "zod";

export const examples = [
  {
    label: "Example1",
    value: "example1",
    color: "#555555",
  },
  {
    label: "Example2",
    value: "example2",
    color: "#000000",
  },
];

export const ZExamples = z.enum(["example1", "example2"]);
