interface ToolJsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function ToolJsonLd({ data }: ToolJsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
