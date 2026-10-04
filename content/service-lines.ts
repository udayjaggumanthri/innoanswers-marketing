export type ServiceLine = {
  readonly id: string;
  readonly name: string;
};

export const serviceLines = [
  { id: "technology-services", name: "Technology Services" },
  { id: "business-services", name: "Business Services" },
  { id: "consulting", name: "Consulting" },
] as const satisfies readonly ServiceLine[];
