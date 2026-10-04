import { legalStandIn, privacyStandIn } from "@/content/legal";

const footerLinks = [
  { href: "/contact", label: "Join the team" },
  { href: "/legal", label: legalStandIn.title },
  { href: "/privacy", label: privacyStandIn.title },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer relative z-10 border-t border-foreground bg-background px-5 py-4">
      <ul>
        {footerLinks.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
