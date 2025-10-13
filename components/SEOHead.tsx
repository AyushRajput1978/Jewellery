export default function SEOHead({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="jewelry, rings, gemstones, gold" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: title,
            description,
          }),
        }}
      />
    </head>
  );
}
