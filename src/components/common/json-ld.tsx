/** Renders schema.org structured data. `<` is escaped so content can't close the script tag. */
export function JsonLd({ data }: { data: object[] }) {
  return data.map((schema, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  ));
}
