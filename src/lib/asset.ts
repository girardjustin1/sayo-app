/**
 * URL for a file in public/ that works at any base path. Locally the site is served
 * from "/", on GitHub Pages from "/sayo-app/", so root-absolute paths would 404 there.
 */
export const assetUrl = (path: string) => (path.startsWith('/') ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}` : path)
