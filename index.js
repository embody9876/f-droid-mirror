addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/repo/')) {
    return new Response('Not found', { status: 404 });
  }

  const upstream = new URL(request.url);
  upstream.hostname = 'f-droid.org';
  upstream.protocol = 'https:';

  const newHeaders = new Headers(request.headers);
  newHeaders.set('Host', upstream.host);

  const upstreamRequest = new Request(upstream, {
    method: request.method,
    headers: newHeaders,
    body: request.body,
    redirect: 'follow',
  });

  const upstreamResp = await fetch(upstreamRequest);
  const cacheControl = cacheControlForPath(upstream.pathname);
  const resp = new Response(upstreamResp.body, upstreamResp);
  if (cacheControl) {
    resp.headers.set('Cache-Control', cacheControl);
  }
  return resp;
}

function cacheControlForPath(path) {
  if (path.endsWith('index-v1.jar') || path.endsWith('index-v1.xml.gz')) {
    return 'public, max-age=3600, stale-while-revalidate=1800';
  }
  if (path.endsWith('.apk')) {
    return 'public, max-age=604800, immutable';
  }
  if (path.match(/\.(json|png|svg)$/i)) {
    return 'public, max-age=86400';
  }
  return null;
}
