export type ContactField = "name" | "email" | "company" | "message";

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors: ContactFieldErrors };

export const initialContactFormState: ContactFormState = { status: "idle" };
