import { organizationSchema, websiteSchema } from "@/lib/seo";

/**
 * Sitewide JSON-LD structured data (Organization + WebSite). Rendered once
 * in the root layout so it's present on every page.
 */
export default function StructuredData() {
  const schemas = [organizationSchema(), websiteSchema()];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
