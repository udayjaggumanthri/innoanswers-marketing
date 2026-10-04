"use server";

import { headers } from "next/headers";
import type { ContactFieldErrors, ContactFormState } from "@/lib/contact-form-state";
import {
  honeypotTripped,
  readContactInput,
  validateContactFields,
} from "@/lib/contact-validation";
import { isMailConfigured } from "@/lib/mail";
import { consumeRateLimit } from "@/lib/rate-limit";

const HONEYPOT_FAILURE = "The message could not be sent.";
const FIELD_FAILURE = "Check the fields and try again.";
const RATE_FAILURE =
  "The message could not be sent because the rate limit was reached.";
const MAIL_FAILURE =
  "The message could not be sent because mail is not configured.";
const SUCCESS_MESSAGE = "Your message was received.";

type ContactGate =
  | { kind: "honeypot" }
  | { kind: "invalid"; fieldErrors: ContactFieldErrors }
  | { kind: "rate_limited" }
  | { kind: "mail_unset" }
  | { kind: "accepted" };

async function clientKey(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const forwardedIp = forwarded?.split(",")[0]?.trim();
  if (forwardedIp) {
    return forwardedIp;
  }
  const realIp = headerList.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

async function decide(formData: FormData): Promise<ContactGate> {
  const input = readContactInput(formData);

  if (honeypotTripped(input)) {
    consumeRateLimit(await clientKey());
    return { kind: "honeypot" };
  }

  const validated = validateContactFields(input);
  if (!validated.ok) {
    return { kind: "invalid", fieldErrors: validated.fieldErrors };
  }

  const limit = consumeRateLimit(await clientKey());
  if (!limit.allowed) {
    return { kind: "rate_limited" };
  }

  if (!isMailConfigured()) {
    return { kind: "mail_unset" };
  }

  return { kind: "accepted" };
}

function stateFromGate(gate: ContactGate): ContactFormState {
  switch (gate.kind) {
    case "honeypot":
      return { status: "error", message: HONEYPOT_FAILURE, fieldErrors: {} };
    case "invalid":
      return {
        status: "error",
        message: FIELD_FAILURE,
        fieldErrors: gate.fieldErrors,
      };
    case "rate_limited":
      return { status: "error", message: RATE_FAILURE, fieldErrors: {} };
    case "mail_unset":
      return { status: "error", message: MAIL_FAILURE, fieldErrors: {} };
    case "accepted":
      return { status: "success", message: SUCCESS_MESSAGE };
    default: {
      const unreachable: never = gate;
      return unreachable;
    }
  }
}

export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  return stateFromGate(await decide(formData));
}
