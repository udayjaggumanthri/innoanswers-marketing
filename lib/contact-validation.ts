import type { ContactFieldErrors } from "@/lib/contact-form-state";

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  message: string;
  honeypot: string;
};

export type ValidationResult =
  | {
      ok: true;
      value: {
        name: string;
        email: string;
        company: string;
        message: string;
      };
    }
  | { ok: false; fieldErrors: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_COMPANY = 200;
const MAX_MESSAGE = 5000;

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function hasDisallowedControlCharacter(value: string): boolean {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value);
}

export function readContactInput(formData: FormData): ContactInput {
  return {
    name: readString(formData, "name"),
    email: readString(formData, "email"),
    company: readString(formData, "company"),
    message: readString(formData, "message"),
    honeypot: readString(formData, "leave_blank"),
  };
}

export function honeypotTripped(input: ContactInput): boolean {
  return input.honeypot.trim().length > 0;
}

export function validateContactFields(input: ContactInput): ValidationResult {
  const name = input.name.trim();
  const email = input.email.trim();
  const company = input.company.trim();
  const message = input.message.trim();
  const fieldErrors: ContactFieldErrors = {};

  if (name.length === 0) {
    fieldErrors.name = "Enter your name.";
  } else if (name.length > MAX_NAME || hasDisallowedControlCharacter(name)) {
    fieldErrors.name = "Enter a name of 100 characters or fewer.";
  }

  if (email.length === 0) {
    fieldErrors.email = "Enter your email.";
  } else if (
    email.length > MAX_EMAIL ||
    !EMAIL_PATTERN.test(email) ||
    hasDisallowedControlCharacter(email)
  ) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (company.length > MAX_COMPANY || hasDisallowedControlCharacter(company)) {
    fieldErrors.company = "Enter a company of 200 characters or fewer.";
  }

  if (message.length === 0) {
    fieldErrors.message = "Enter a message.";
  } else if (message.length > MAX_MESSAGE || hasDisallowedControlCharacter(message)) {
    fieldErrors.message = "Enter a message of 5000 characters or fewer.";
  }

  if (
    fieldErrors.name ||
    fieldErrors.email ||
    fieldErrors.company ||
    fieldErrors.message
  ) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    value: { name, email, company, message },
  };
}
