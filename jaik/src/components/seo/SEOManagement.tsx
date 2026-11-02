"use client";

import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  author?: string;
  publisher?: string;
  useDefaults?: boolean;
}

const SEOManagement = ({
  title,
  description,
  keywords,
  image,
  canonical,
  noIndex,
  noFollow,
  author,
  publisher,
  useDefaults = true,
}: SEOProps) => {
  const metaTitle = title || (useDefaults ? "Default Meta Title" : "");
  const metaDescription = description || (useDefaults ? "Default description of your site" : "");
  const metaKeywords = keywords || (useDefaults ? "default, keywords, website" : "");
  const metaImage = image || (useDefaults ? "/default-image.jpg" : "");

  const metaCanonical =
    canonical ||
    (typeof window !== "undefined" ? window.location.href : "");

  const robotsContent = `${noIndex ? "noindex" : "index"}, ${
    noFollow ? "nofollow" : "follow"
  }`;

  return (
    <Head>
      {metaTitle && <title>{metaTitle}</title>}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <meta name="robots" content={robotsContent} />
      {author && <meta name="author" content={author} />}
      {publisher && <meta name="publisher" content={publisher} />}
      {metaCanonical && (
        <link rel="canonical" href={metaCanonical} />
      )}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaCanonical} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default SEOManagement;
