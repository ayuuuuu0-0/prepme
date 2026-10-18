import { chromium, Browser, Page } from "playwright";
import * as cheerio from "cheerio";

const USER_AGENT = "PrepMe-Bot/1.0 (+https://github.com/prepme)";
const TIMEOUT_MS = 30_000;
const MAX_TEXT_CHARS = 6_000;

export interface BrowserFetchResult {
  ok: boolean;
  url: string;
  text: string;
  title: string;
  links: string[];
  error: string | null;
}

let browserInstance: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browserInstance || !browserInstance.isConnected()) {
    browserInstance = await chromium.launch({
      headless: true,
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
  }
  return browserInstance;
}

export async function closeBrowser(): Promise<void> {
  if (browserInstance && browserInstance.isConnected()) {
    await browserInstance.close();
    browserInstance = null;
  }
}

/**
 * Fetch a page using Playwright browser to handle JavaScript rendering.
 * Use this when the static HTML fetch returns empty/minimal content.
 */
export async function browserFetch(url: string): Promise<BrowserFetchResult> {
  let page: Page | null = null;

  try {
    const browser = await getBrowser();
    page = await browser.newPage({
      userAgent: USER_AGENT,
      viewport: { width: 1280, height: 720 },
    });

    // Set timeout
    page.setDefaultTimeout(TIMEOUT_MS);

    // Navigate and wait for network to be idle
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: TIMEOUT_MS,
    });

    // Wait a bit more for any lazy-loaded content
    await page.waitForTimeout(2000);

    // Get the fully rendered HTML
    const html = await page.content();
    const finalUrl = page.url();

    // Extract text and links using cheerio
    const $ = cheerio.load(html);

    // Remove script and style tags
    $('script, style, noscript').remove();

    // Get title
    const title = $('title').text().trim() || '';

    // Get text content
    let text = $('body').text()
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, MAX_TEXT_CHARS);

    // Get links
    const links: string[] = [];
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (href) {
        try {
          const absoluteUrl = new URL(href, finalUrl).toString();
          if (absoluteUrl.startsWith('http')) {
            links.push(absoluteUrl);
          }
        } catch {
          // Invalid URL, skip
        }
      }
    });

    await page.close();

    return {
      ok: true,
      url: finalUrl,
      text,
      title,
      links: [...new Set(links)],
      error: null,
    };

  } catch (error: any) {
    if (page) {
      try {
        await page.close();
      } catch {
        // Ignore close errors
      }
    }

    return {
      ok: false,
      url,
      text: '',
      title: '',
      links: [],
      error: error.message || 'Browser fetch failed',
    };
  }
}

/**
 * Detect if HTML content is mostly empty (JS-rendered site).
 * Returns true if the page needs browser rendering.
 */
export function needsBrowserRendering(html: string): boolean {
  const $ = cheerio.load(html);

  // Remove script, style, noscript tags
  $('script, style, noscript, link, meta').remove();

  // Get body text
  const bodyText = $('body').text().trim();

  // Check for common SPA patterns
  const hasReactRoot = $('#root, #__next, #app, [data-reactroot]').length > 0;
  const hasVueApp = $('#app, [data-v-app], [data-vue]').length > 0;
  const hasEmptyBody = bodyText.length < 200;

  // If body is mostly empty and has SPA markers, needs rendering
  if (hasEmptyBody && (hasReactRoot || hasVueApp)) {
    return true;
  }

  // If body text is very short relative to HTML size, likely JS-rendered
  const textRatio = bodyText.length / html.length;
  if (textRatio < 0.05 && html.length > 10000) {
    return true;
  }

  return false;
}
