import { serviceLines } from "@/content/service-lines";

export function ServiceNameLinks({
  hrefFor,
}: {
  hrefFor: (id: string) => string;
}) {
  return (
    <ul className="service-list">
      {serviceLines.map((line) => (
        <li key={line.id}>
          <a href={hrefFor(line.id)}>{line.name}</a>
        </li>
      ))}
    </ul>
  );
}
