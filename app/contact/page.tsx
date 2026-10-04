import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <h1 id="contact-heading">Contact Us</h1>
      <ContactForm />
    </>
  );
}
