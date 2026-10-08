export const Head = () => {
  const siteUrl = "https://www.beyondacres.in";
  const altDomain = "https://code-unstoppable.com";
  const title = "Riverine by Beyond Acres | Riverside Living by the Kaveri, Srirangapatna";
  const description =
    "Riverine by Beyond Acres: a 21-acre riverside neighbourhood beside the River Kaveri in Srirangapatna. 2,000+ native trees, 35% open green, biodiversity parks and riverfront terraces. Plots from ₹56 Lakhs. 90 mins from Bengaluru. RERA Approved. Grand launch this Dussehra.";

  // UTM Tracker Codes
  const trackerCodes = [
    'AA68a807180b46a',
    'AA6a43b8494f4a2',
    'AA6a43b865acf8c',
    'AA6a43b87cd6cf3',
    'AA6a43b895c4a60',
    'AA6a43b8cd3cd68',
    'AA6a43b8fdafd79',
    'AA6a6358a8a5c7d',
  ];

  const keywords = [
    // Brand
    "Riverine",
    "Riverine Beyond Acres",
    "Riverine Srirangapatna",
    "Riverine Mysuru",
    "Riverine plots",
    "Beyond Acres Riverine",
    "Beyond Acres",
    "beyondacres.in",
    "Beyond Acres 2.0",
    "Codename Unstoppable",
    "Codename Unstoppable 2.0",
    "Unstoppable 2.0",
    "Code Unstoppable",
    "code-unstoppable.com",
    "beyond acres unstoppable",
    "Codename Unstoppable 2.0 Riverine",
    "beyond acres plots",
    // Location + product
    "plots near Bangalore",
    "villa plots near Bangalore",
    "gated community plots near Bangalore",
    "investment plots near Bangalore",
    "plots on Bangalore Mysore Highway",
    "plots on Bengaluru Mysuru Expressway",
    "riverfront plots near Bangalore",
    "riverfront plots Mysore",
    "riverside living near Bangalore",
    "nature living near Bengaluru",
    "plots near River Kaveri",
    "eco friendly plots near Mysore",
    "premium villa plots near Mysore Road",
    "plots for sale near Bangalore",
    "best plots for investment",
    "plots in Mandya",
    "plots in Srirangapatna",
    "plots in Srirangapatnam",
    "RERA approved plots Karnataka",
    "pre launch plots Mysuru",
    "pre launch plots Mysore",
    "affordable plots near Bengaluru",
    "plotted development Mysore Road",
    "plotted development Srirangapatna",
    "river facing plots Karnataka",
    "Kaveri riverfront plots",
    "biodiversity township Karnataka",
    "eco engineered township",
    "3099 psf plots Mysore",
    "plots below 4000 psf near Bangalore",
    "NA plots near Bangalore",
    "residential plots Bengaluru Mysuru Expressway",
    "Rohit Tandon Beyond Acres",
    "Purple Brick Estates plots",
    "sustainable plotted development India",
    // Long-tail / transactional
    "buy plots near Bangalore 2025",
    "low cost plots near Mysore road",
    "RERA plots Srirangapatna",
    "gated community plots Mysore road",
    "river view villa plots Karnataka",
    "plotted development investment Bengaluru",
    "Beyond Acres Srirangapatna",
    "Beyond Acres Mysore",
    "Beyond Acres Karnataka",
    "pre launch riverfront plots India",
  ].join(", ");

  const ogImage = "https://static.wixstatic.com/media/cef78c_678b49a9a2824a54acad7f3a9663fc52~mv2.png";

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${siteUrl}/#listing`,
        name: "Riverine — Beyond Acres",
        alternateName: "Codename Unstoppable 2.0",
        description:
          "21-acre riverside plotted neighbourhood beside River Kaveri, Srirangapatna, Mysuru. Karnataka's first eco-engineered biodiversity township, with 2,000+ native trees, 35% open green and riverfront terraces. RERA Approved.",
        url: siteUrl,
        image: ogImage,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: "5600000",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "5600000",
            priceCurrency: "INR",
            description: "Starting price for 1,454 – 2,000+ sq ft plots",
          },
          availability: "https://schema.org/LimitedAvailability",
          seller: {
            "@type": "Organization",
            name: "Beyond Acres",
            url: siteUrl,
          },
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Srirangapatna",
          addressLocality: "Mysuru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "12.4248",
          longitude: "76.7035",
        },
        numberOfRooms: "330+",
        floorSize: {
          "@type": "QuantitativeValue",
          value: "1454",
          minValue: "1454",
          maxValue: "2939",
          unitCode: "FTK",
          unitText: "sq ft",
        },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Biodiversity Park", value: true },
          { "@type": "LocationFeatureSpecification", name: "Riverfront Terrace", value: true },
          { "@type": "LocationFeatureSpecification", name: "Clubhouse", value: true },
          { "@type": "LocationFeatureSpecification", name: "Sports Arena", value: true },
          { "@type": "LocationFeatureSpecification", name: "Wellness Grove", value: true },
          { "@type": "LocationFeatureSpecification", name: "RERA Approved", value: true },
          { "@type": "LocationFeatureSpecification", name: "Underground Utilities", value: true },
          { "@type": "LocationFeatureSpecification", name: "Rainwater Harvesting", value: true },
        ],
        permitNumber: "PRM/KA/RERA/1267/374/PR/230626/008745",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Beyond Acres",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: "https://static.wixstatic.com/media/cef78c_dab6f418d455446ebbb520dc3f38e1fa~mv2.png",
        },
        sameAs: [siteUrl, altDomain],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-98869-26767",
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["English", "Kannada", "Hindi"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Riverine by Beyond Acres",
        description,
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is Riverine the same project as Codename Unstoppable 2.0?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Codename Unstoppable 2.0 was the pre-launch name; Riverine is the project's permanent identity. The land, masterplan, RERA registration and developer are unchanged.",
            },
          },
          {
            "@type": "Question",
            name: "Where is Riverine located?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Riverine is in Srirangapatna, Mysuru, beside River Kaveri, just off the Bengaluru–Mysuru Expressway — approximately 90 minutes from Bengaluru.",
            },
          },
          {
            "@type": "Question",
            name: "Is Riverine by Beyond Acres RERA approved?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, it is fully RERA approved. RERA Registration No: PRM/KA/RERA/1267/374/PR/230626/008745.",
            },
          },
          {
            "@type": "Question",
            name: "What plot sizes are available at Riverine?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Plots of 1,454 sq ft to 2,000+ sq ft are available, starting from ₹56 Lakhs: 9×15m (1,454 sq ft), 12×18m (2,325 sq ft), and river-facing plots up to 2,939 sq ft. The 1,163 sq ft plots are sold out.",
            },
          },
          {
            "@type": "Question",
            name: "How far is Riverine from Bengaluru?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Riverine by Beyond Acres is approximately 90 minutes from Bengaluru via the Bengaluru–Mysuru Expressway, and about 20 minutes from Mysuru Palace.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* ── Primary SEO ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Beyond Acres" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={siteUrl} />

      {/* ── Open Graph / Facebook ── */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Riverine by Beyond Acres – Riverside Plots by the Kaveri, Srirangapatna" />
      <meta property="og:site_name" content="Riverine by Beyond Acres" />
      <meta property="og:locale" content="en_IN" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Riverine by Beyond Acres – Riverside Plots by the Kaveri, Srirangapatna" />

      {/* ── Favicon ── */}
      <link rel="icon" type="image/png" href="https://static.wixstatic.com/media/cef78c_dab6f418d455446ebbb520dc3f38e1fa~mv2.png" />
      <link rel="apple-touch-icon" href="https://static.wixstatic.com/media/cef78c_dab6f418d455446ebbb520dc3f38e1fa~mv2.png" />

      {/* ── Sitemap discovery ── */}
      <link rel="sitemap" type="application/xml" href={`${siteUrl}/sitemap.xml`} />

      {/* ── Preload hero OG image for LCP ── */}
      <link rel="preload" as="image" href={ogImage} />

      {/* ── Geo / Local SEO ── */}
      <meta name="geo.region" content="IN-KA" />
      <meta name="geo.placename" content="Srirangapatna, Mysuru, Karnataka, India" />
      <meta name="geo.position" content="12.4248;76.7035" />
      <meta name="ICBM" content="12.4248, 76.7035" />

      {/* ── Additional signals ── */}
      <meta name="theme-color" content="#003539" />
      <meta name="rating" content="general" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="category" content="Real Estate, Plotted Development, Investment" />

      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
      />

      {/* ── Google Ads Global Site Tag (gtag.js) ── */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18105572030"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18105572030');
          `,
        }}
      />

      {/* ── UTM Tracker Codes ── */}
      {trackerCodes.map((code, index) => (
        <meta key={`tracker-${index}`} name={`tracker-code-${index}`} content={code} />
      ))}

      {/* ── Fonts — DM Sans (headings + numbers) + Roboto (body) ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,300;1,9..40,400;1,9..40,500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        :root {
          --font-heading: 'DM Sans', Roboto, sans-serif;
          --font-number:  'DM Sans', Roboto, sans-serif;
          --font-body:    Roboto, sans-serif;
        }
      `}</style>
    </>
  );
};
