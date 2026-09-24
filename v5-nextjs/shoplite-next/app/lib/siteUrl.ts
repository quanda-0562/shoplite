const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  ?? (productionHost ? `https://${productionHost}` : undefined);
