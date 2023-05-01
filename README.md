# visual-regression-testing

## Goal

Setup a small project to demonstrate how to set up visual regression testing with [BackstopJS](https://github.com/garris/BackstopJS) and [Talkback](https://github.com/ijpiantanida/talkback):

* `BackstopJS` is a tool for visual regression testing
* `Talkback` is a proxy that records and playbacks HTTP requests made to the backend

This combination allows for static and therefore stable visual tests, with little overhead for setting up a mock backend.

## Setup

### Backend

* Python project
* dependencies managed by `poetry`
* API implemented with `fastapi`

Install requirements via `poetry install`.
Run the server locally via `poetry run uvicorn app.main:app --reload`

### Frontend

* Angular project
* dependencies managed by `npm`

Install requirements via `npm install`
Run frontend locally via `ng serve` or `npm run start`

### BackstopJS

`BackstopJS` is installed globally, following the recommendations in their readme.
Run `npm install -g backstopjs` to install it.

### Visual Regression Testing

#### Talkback

From inside the `frontend` directory, run `node talkbackServer.js`.  
If no existing tapes are present under `frontend/tapes`, a new one will be created for each request.  
A name generator function was defined to create the new files under `tapes/<URL>/<METHOD>/tape-<NUMBER>.json5`.  
If you want to record replace existing tapes, either record new ones or set the `record` option to `OVERWRITE`.  
If you made manual changes to the tapes, you have to restart the Talkback server for the changes to take effect.


#### BackstopJS

`BackstopJS` was initialized via: `backstop init`.

Workflow:

* Create or overwrite reference images: `backstop reference`
* Run tests against the reference images: `backstop test`
* If deviations are OK and the newly captured images should replace the previous reference images, run `backstop approve`

## Learnings

### Talkback

* The default tape names are useless, a `tapeNameGenerator` should be used.
* With default settings, a request with sent by the frontend when simply refreshing the window with F5 will not be matched against a request that is sent with CTRL+F5, because the header of the latter includes extra entries (`pragma: 'no-cache', 'cache-control': 'no-cache'`). This can be solved by always adding these headers to requests.
* In general the headers that are used for matching the request are problematic, as the ones sent when running `BackstopJS` are different from the ones sent by "real" browsers. These headers should be blacklisted and removed from the request.

### BackstopJS

* All test images are stored locally and never (?) deleted. The folder `backstop_data/bitmaps_test` (or better the contents) should therefore be added to `.gitignore`.
* If multiple (click) selectors are used, a delay between each interaction can (and should) be used by defining `scenarios[n].postInteractionWait`.
* The `Puppeteer` engine apparently has problems with dynamic contents like dropdowns. An opened dropdown had "ghosting", and the options were shown multiple times on the screen. `Playwright` works fine.
