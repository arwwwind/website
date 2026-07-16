/**
 * Lightweight crawler / preview-bot detection for skipping decorative motion.
 * Prefer the server `user-agent` header; fall back to navigator on the client.
 */
const BOT_UA =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|redditbot|baidu|yandex|sogou|linkedinbot|twitterbot|whatsapp|telegrambot|applebot|duckduckbot|semrush|ahrefs|mj12bot|dotbot|petalbot|bytespider|gptbot|claudebot|anthropic|google-extended|amazonbot|ia_archiver|pingdom|gtmetrix|lighthouse|chrome-lighthouse|headlesschrome|phantomjs|prerender/i;

export function isBotUserAgent(ua: string | null | undefined): boolean {
  if (!ua) return false;
  return BOT_UA.test(ua);
}

/** True when `<html data-crawl="1">` was set by the server layout. */
export function isCrawlMode(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.dataset.crawl === '1';
}

/** Skip cryptic / stream animations for bots or reduced-motion users. */
export function shouldSkipMotion(): boolean {
  if (typeof window === 'undefined') return false;
  if (isCrawlMode()) return true;
  if (isBotUserAgent(navigator.userAgent)) return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
