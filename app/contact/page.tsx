import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { StillFrame } from "@/components/still-frame";
import { siteStandIn } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact form.",
};

export default function ContactPage() {
  return (
    <div data-chamber="contact">
      <h1 id="contact-heading">Contact Us</h1>
      <p>
        {siteStandIn.contactLead}{" "}
        <a href={`mailto:${siteStandIn.contactEmail}`}>{siteStandIn.contactEmail}</a>.
      </p>
      <ContactForm />
      <StillFrame beat="still" />
    </div>
  );
}
