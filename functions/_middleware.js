/**
 * HTTP Basic Auth for the whole site.
 *
 * Runs on Cloudflare's edge before any page or image is served, so nothing
 * reaches the browser until the password is accepted. That is the difference
 * from a client-side password gate, where the content ships first and a script
 * hides it — anyone can read the source or open DevTools.
 *
 * The password comes from the SITE_PASSWORD environment variable set in the
 * Cloudflare Pages project. It is deliberately NOT in this file: a password in
 * the repo is a password in every clone and every fork.
 *
 * Username is ignored; any value works. One shared password, as agreed.
 */

const REALM = 'SCB Easy Knowledge Library';

/** Constant-time compare, so a wrong password cannot be guessed by timing. */
function equal(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function unauthorised() {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
    },
  });
}

export const onRequest = async (context) => {
  const expected = context.env.SITE_PASSWORD;

  // Fail closed. An unset password must not mean an open site.
  if (!expected) {
    return new Response(
      'SITE_PASSWORD is not set on this Cloudflare Pages project. Refusing to serve.',
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const header = context.request.headers.get('Authorization') ?? '';
  if (!header.startsWith('Basic ')) return unauthorised();

  let decoded;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorised();
  }

  // "user:password" — the username is ignored.
  const password = decoded.slice(decoded.indexOf(':') + 1);
  if (!equal(password, expected)) return unauthorised();

  const response = await context.next();

  // Private content should not be cached by proxies on the way back.
  const out = new Response(response.body, response);
  out.headers.set('Cache-Control', 'private, no-store');
  out.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return out;
};
