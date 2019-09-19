# Summary

This repository contains a simple example of how Chrome may process headers on a request after it has been aborted when a Service Worker is in place. If the headers include a cookie that is used for authentication, this would essentially log the user back in.

The earliest known version of Chrome where this is easily reproducible is `79.0.3909.0` (Canary). This issue seems to have occurred in Chrome Stable as early as `76.0.3809.132`, but I am unable to reproduce it.

The included web server services the following requests:

| method | URL | behavior |
| ------ | --- | -------- |
| `GET` | `/` | Serves the `index.html` page and sets `CookieCreatedAfterAbort` HTTP cookie |
| `GET` | `/delayedApiResponse` | sets `CookieCreatedAfterAbort` HTTP cookie (response delayed by 5000ms) |
| `GET` | `/logout` | removes `CookieCreatedAfterAbort` cookie |

The default index page:

* Installs a `ServiceWorker` that merely logs requests on the `fetch` event (it does not cache or otherwise alter the response).
* Waits for the `ServiceWorker` to be activated, then makes a fetch request to `GET /delayedApiResponse`.
* After 2500ms, the request is aborted and `GET /login` is called to immediately remove the cookie.

The problem:

* After the `GET /delayedApiResponse` is aborted, the headers are processed by the browser when a response is received, which recreates the cookie.

# How to run

1. Install dependencies
   `yarn` or `npm i`

1. Start HTTP server
   `yarn start` or `npm start`

1. In Chrome Canary (specifically tested with `79.0.3915.0`), open the developer tools and go to https://localhost:3000
   - Immediately on page load, note that a `CookieCreatedAfterAbort` has been created
   - After about 2500ms, note the `GET /logout` and that there is no longer a `CookieCreatedAfterAbort` cookie
   - About 5000ms after the page is loaded, note that there are response headers listed for the aborted `GET /delayedApiResponse` request
   - Also note that the `CookieCreatedAfterAbort` has been recreated