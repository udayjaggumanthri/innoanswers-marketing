"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/app/contact/actions";
import {
  initialContactFormState,
  type ContactField,
  type ContactFieldErrors,
  type ContactFormState,
} from "@/lib/contact-form-state";
import { readContactInput, validateContactFields } from "@/lib/contact-validation";

function serverMessage(state: ContactFormState): string | null {
  switch (state.status) {
    case "idle":
      return null;
    case "success":
    case "error":
      return state.message;
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

function serverFieldErrors(state: ContactFormState): ContactFieldErrors {
  switch (state.status) {
    case "idle":
    case "success":
      return {};
    case "error":
      return state.fieldErrors;
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Sending" : "Send message"}
    </button>
  );
}

type FieldProps = {
  id: string;
  name: ContactField;
  label: string;
  autoComplete: string;
  maxLength: number;
  required?: boolean;
  error?: string;
  type?: "text" | "email";
  multiline?: boolean;
};

function Field({
  id,
  name,
  label,
  autoComplete,
  maxLength,
  required,
  error,
  type = "text",
  multiline = false,
}: FieldProps) {
  const errorId = `${id}-error`;
  const invalid = error ? true : undefined;
  const describedBy = error ? errorId : undefined;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          autoComplete={autoComplete}
          maxLength={maxLength}
          required={required}
          rows={6}
          aria-invalid={invalid}
          aria-describedby={describedBy}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          maxLength={maxLength}
          required={required}
          inputMode={type === "email" ? "email" : undefined}
          spellCheck={type === "email" ? false : undefined}
          aria-invalid={invalid}
          aria-describedby={describedBy}
        />
      )}
      {error ? (
        <p id={errorId} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialContactFormState);
  const [clientMessage, setClientMessage] = useState<string | null>(null);
  const [clientFieldErrors, setClientFieldErrors] = useState<ContactFieldErrors>({});
  const statusRef = useRef<HTMLParagraphElement>(null);
  const skipFocus = useRef(true);

  useEffect(() => {
    if (skipFocus.current) {
      skipFocus.current = false;
      return;
    }
    statusRef.current?.focus();
  }, [state, clientMessage]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const nativeValid = form.checkValidity();
    const validated = validateContactFields(readContactInput(new FormData(form)));

    if (!nativeValid) {
      event.preventDefault();
      form.reportValidity();
    }

    if (!validated.ok) {
      event.preventDefault();
      setClientFieldErrors(validated.fieldErrors);
      setClientMessage("Check the fields and try again.");
      return;
    }

    setClientFieldErrors({});
    setClientMessage(null);
  }

  const message = clientMessage ?? serverMessage(state);
  const isError = clientMessage !== null || state.status === "error";
  const fieldErrors = clientMessage ? clientFieldErrors : serverFieldErrors(state);

  return (
    <form className="contact-form" action={formAction} onSubmit={onSubmit} aria-labelledby="contact-heading">
      {message ? (
        <p
          ref={statusRef}
          tabIndex={-1}
          className="form-status"
          role={isError ? "alert" : "status"}
        >
          {isError ? `Error: ${message}` : message}
        </p>
      ) : null}
      <Field
        id="name"
        name="name"
        label="Name (required)"
        autoComplete="name"
        maxLength={100}
        required
        error={fieldErrors.name}
      />
      <Field
        id="email"
        name="email"
        label="Email (required)"
        type="email"
        autoComplete="email"
        maxLength={254}
        required
        error={fieldErrors.email}
      />
      <Field
        id="company"
        name="company"
        label="Company (optional)"
        autoComplete="organization"
        maxLength={200}
        error={fieldErrors.company}
      />
      <Field
        id="message"
        name="message"
        label="Message (required)"
        autoComplete="off"
        maxLength={5000}
        required
        multiline
        error={fieldErrors.message}
      />
      <div className="honeypot" aria-hidden="true" inert>
        <label htmlFor="leave_blank">Leave blank</label>
        <input id="leave_blank" name="leave_blank" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <SubmitButton />
    </form>
  );
}
