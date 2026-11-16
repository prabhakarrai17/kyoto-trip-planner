**Live prototype: <https://kyoto-trip-planner-brown.vercel.app>** (opens with no login, no install and no setup)

# Kyoto trip planner

A chat-style search prototype. A guest types a trip idea like "Kyoto weekend plan". Instead of an empty results page, they get three starting points: a place to stay, something to do and somewhere to eat. They don't have to set a single filter first.

This is the prototype for the spec sheet "Building Airbnb's Kyoto trip planner before Thursday's guest test". It's a concept prototype, not an official Airbnb product.

**How to fire the error trigger:** end any message with `/fail`. For example, type `Kyoto weekend plan /fail` and press Enter to see the error bubble with Try again. Screenshots: [error bubble](docs/error-bubble.png) and [three cards after Try again](docs/cards-after-retry.png).

## Moderated session checklist

These are the rules from "Moderated Session Prototype Requirements: Trip-Planner Chat", checked on the live link above with nothing logged in. Every tick links to a screenshot that shows it.

| Rule | Real phone | Safari 390px | Phone 390px | Laptop 1440px | Evidence |
| --- | :---: | :---: | :---: | :---: | --- |
| The link is the production `*.vercel.app` domain, not a preview link | ✅ | ✅ | ✅ | ✅ | [Real phone address bar](docs/session/real-phone/1-landing.jpg), [Safari address bar](docs/session/safari/1-start-iphone-size.jpg) |
| Opens with no install, no login and no configuration | ✅ | ✅ | ✅ | ✅ | [Real phone, first open](docs/session/real-phone/1-landing.jpg), [laptop](docs/session/laptop-0-thinking.png), [Safari, private window](docs/session/safari/1-start-iphone-size.jpg) |
| Visible note that the trips are sample data and nothing is booked | ✅ | ✅ | ✅ | ✅ | Under the message box in every shot, e.g. [real phone](docs/session/real-phone/1-landing.jpg), [phone](docs/session/phone-1-cards.png), [laptop](docs/session/laptop-1-cards.png), [Safari](docs/session/safari/1-start-iphone-size.jpg) |
| One typed request ("Kyoto weekend plan") shows a thinking state first | ✅ | ✅ | ✅ | ✅ | [Real phone](docs/session/real-phone/2-thinking.jpg), [phone](docs/session/phone-0-thinking.png), [laptop](docs/session/laptop-0-thinking.png), [Safari](docs/session/safari/2-thinking.jpg) |
| 3 of 3 cards appear: stay, Experience and food | ✅ | ✅ | ✅ | ✅ | [Real phone](docs/session/real-phone/3-cards-stay.jpg) ([2](docs/session/real-phone/5-cards-experience-food.jpg)), [phone](docs/session/phone-1-cards.png), [laptop](docs/session/laptop-1-cards.png), [Safari](docs/session/safari/3-cards-stay.jpg) ([2](docs/session/safari/4-cards-experience-food.jpg)) |
| The three cards look clearly different, not one layout with the text swapped | ✅ | ✅ | ✅ | ✅ | [Laptop, side by side](docs/session/laptop-1-cards.png), [phone, stacked](docs/session/phone-1-cards.png), [Safari](docs/session/safari/4-cards-experience-food.jpg) |
| At phone width nothing is cut off and nothing needs sideways scrolling | ✅ | ✅ | ✅ | n/a | [Real phone](docs/session/real-phone/4-cards-stay-experience.jpg), [phone, whole thread](docs/session/phone-1-cards.png), [Safari](docs/session/safari/3-cards-stay.jpg) |
| The forced failure (`/fail`) shows a friendly message with Try again inside the assistant bubble | ✅ | ✅ | ✅ | ✅ | [Real phone](docs/session/real-phone/8-error-bubble.jpg), [phone](docs/session/phone-2-error-bubble.png), [laptop](docs/session/laptop-2-error-bubble.png), [Safari](docs/session/safari/5-error-bubble.jpg) |
| 0 blank-chat moments: at the failure, when Try again is pressed, and after it | ✅ | Not captured yet | ✅ | ✅ | Thinking dots right after Try again: [real phone](docs/session/real-phone/9-thinking-after-try-again.jpg), [phone](docs/session/phone-2b-thinking-after-retry.png), [laptop](docs/session/laptop-2b-thinking-after-retry.png) |
| Try again brings the three cards back | ✅ | Not captured yet | ✅ | ✅ | [Real phone](docs/session/real-phone/10-cards-after-try-again.jpg), [phone](docs/session/phone-3-cards-after-retry.png), [laptop](docs/session/laptop-3-cards-after-retry.png) |

**Setups:**

- **Real phone:** an Android phone in Chrome, run by hand on the live link. Chrome blocks screenshots in Incognito tabs, so the Try again shots were taken in a normal tab. The app has no login and saves nothing, so a normal tab shows exactly what a private one does. The doc's phone setup is an iPhone 14 in Safari, covered as closely as possible by the Safari run below.
- **Safari 390px:** Safari on a Mac, in a private window, run by hand on the live link in Responsive Design Mode at iPhone size (390 × 844, 3x). It's the same browser family as iPhone Safari at iPhone size, but not a physical iPhone, so the iPhone's own keyboard and touch handling aren't covered. The moment after Try again hasn't been captured in Safari yet.
- **Phone 390px and Laptop 1440px:** a script drove a fresh incognito Chrome window on the live link. The phone setup used Chrome's iPhone 14 emulation (390px, Safari user agent, touch). The script typed the request, clicked Try again and recorded every change to the reply bubble: thinking → cards on the happy path, and thinking → error bubble → thinking → cards on the error path, with no moment where the chat was empty. The page was exactly as wide as the window, with nothing past the right edge.

### Session screenshots

| | Phone 390px | Laptop 1440px |
| --- | --- | --- |
| Thinking state | ![Phone: thinking dots after sending the request](docs/session/phone-0-thinking.png) | ![Laptop: thinking dots after sending the request](docs/session/laptop-0-thinking.png) |
| Three cards | ![Phone: the Stay, Experience and Food cards stacked](docs/session/phone-1-cards.png) | ![Laptop: the Stay, Experience and Food cards side by side](docs/session/laptop-1-cards.png) |
| Error bubble | ![Phone: the error bubble with Try again](docs/session/phone-2-error-bubble.png) | ![Laptop: the error bubble with Try again](docs/session/laptop-2-error-bubble.png) |
| Right after Try again | ![Phone: thinking dots right after Try again](docs/session/phone-2b-thinking-after-retry.png) | ![Laptop: thinking dots right after Try again](docs/session/laptop-2b-thinking-after-retry.png) |
| Cards after Try again | ![Phone: the three cards after Try again](docs/session/phone-3-cards-after-retry.png) | ![Laptop: the three cards after Try again](docs/session/laptop-3-cards-after-retry.png) |

### Real phone screenshots

Android phone, Chrome, dark mode, on the live link.

<p>
<img src="docs/session/real-phone/1-landing.jpg" width="160" alt="Real phone: the chat on first open, with the sample-data note">
<img src="docs/session/real-phone/2-thinking.jpg" width="160" alt="Real phone: thinking dots with the message box locked">
<img src="docs/session/real-phone/3-cards-stay.jpg" width="160" alt="Real phone: the Stay card">
<img src="docs/session/real-phone/4-cards-stay-experience.jpg" width="160" alt="Real phone: the end of the Stay card and the Experience card">
<img src="docs/session/real-phone/5-cards-experience-food.jpg" width="160" alt="Real phone: the end of the Experience card and the Food card">
<img src="docs/session/real-phone/6-cards-food-budget.jpg" width="160" alt="Real phone: the Food card and the budget line">
<img src="docs/session/real-phone/7-typing-fail.jpg" width="160" alt="Real phone: typing Kyoto weekend plan /fail">
<img src="docs/session/real-phone/8-error-bubble.jpg" width="160" alt="Real phone: the error bubble with Try again">
<img src="docs/session/real-phone/9-thinking-after-try-again.jpg" width="160" alt="Real phone: thinking dots right after Try again">
<img src="docs/session/real-phone/10-cards-after-try-again.jpg" width="160" alt="Real phone: the cards back after Try again">
</p>

### Safari screenshots

Safari on a Mac, private window, Responsive Design Mode at iPhone size (390 × 844), on the live link.

<p>
<img src="docs/session/safari/0-laptop-width-private.jpg" width="320" alt="Safari private window at laptop width, opening straight into the chat">
<img src="docs/session/safari/1-start-iphone-size.jpg" width="320" alt="Safari Responsive Design Mode at 390 by 844 showing the chat start page">
</p>
<p>
<img src="docs/session/safari/2-thinking.jpg" width="200" alt="Safari at iPhone size: thinking dots with the box locked">
<img src="docs/session/safari/3-cards-stay.jpg" width="160" alt="Safari at iPhone size: the Stay card">
<img src="docs/session/safari/4-cards-experience-food.jpg" width="160" alt="Safari at iPhone size: the end of the Experience card and the Food card">
<img src="docs/session/safari/5-error-bubble.jpg" width="160" alt="Safari at iPhone size: the error bubble with Try again">
</p>

**Still open:** the Safari shots after Try again, and a run on a physical iPhone, which Hannah does at the dry run.

## Team message

To post in **#search-trip-planner** on Slack:

> Hi Hannah, Tomás, Priya and Daniel. The Kyoto trip-planner prototype is ready for Thursday's dry run (13 March) and the first guest sessions on 1 April: https://kyoto-trip-planner-brown.vercel.app
>
> Open it in a private window. No login is needed.
>
> Happy path: type "Kyoto weekend plan".
>
> Error path: type "Kyoto weekend plan /fail", then tap Try again.
>
> Worth watching: which card guests open first, or whether they keep typing instead, and whether they tap Try again without help.
>
> All trips are sample data. Nothing is booked.

## Screenshots

The thread after sending "Kyoto weekend plan": the understood-intent chips, then the Stay, Experience and Food cards side by side, and the budget line.

![The chat thread after asking for a Kyoto weekend plan, showing the Stay, Experience and Food cards side by side](docs/kyoto-thread.png)

Image file: [`docs/kyoto-thread.png`](docs/kyoto-thread.png)

### Error bubble

The reply bubble after sending "Kyoto weekend plan /fail", when the answer can't be turned into cards.

![The error bubble: "We couldn't put your plan together." with a Try again button inside the reply bubble](docs/error-bubble.png)

Image file: [`docs/error-bubble.png`](docs/error-bubble.png)

### Three cards after Try again

The same bubble after clicking **Try again**: the thinking dots run again, then the Stay, Experience and Food cards arrive.

![The Stay, Experience and Food cards shown after clicking Try again](docs/cards-after-retry.png)

Image file: [`docs/cards-after-retry.png`](docs/cards-after-retry.png)

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Then type a trip idea, or click **Try "Kyoto weekend plan"**.

To open straight to a reply, which is handy for testers, use <http://localhost:3000/?q=Kyoto%20weekend%20plan>.

## What happens when you send a message

1. Your message appears as a bubble on the right.
2. The message box and send button lock, and pulsing dots show in the reply bubble for 1.8 seconds.
3. The reply arrives. It shows what was understood (Kyoto, Fri 11 – Sun 13 Apr, 2 guests), then three cards, then how much of the $600 weekend budget the three picks use.
4. The message box unlocks and gets focus back, ready for the next message.

Every message gets the same Kyoto reply, because this stage uses a fixed mock response.

## Forcing the error

**To fire the trigger, add `/fail` to the end of any message, for example `Kyoto weekend plan /fail`, or open <http://localhost:3000/?q=Kyoto%20weekend%20plan%20%2Ffail>.**

What happens:

1. Your message appears without the `/fail` part, and the box locks while the thinking dots run.
2. The mock server answers with broken sample data: the stay card has no headline and its items aren't a list, the experience card's type is misspelled, and the food card is missing ([`lib/mockServer.ts`](lib/mockServer.ts)).
3. The app checks every reply before showing it ([`lib/parseReply.ts`](lib/parseReply.ts)). This one fails the check, so the reply bubble becomes the error bubble.
4. **Try again** sends the same message without the trigger. The same bubble shows the thinking dots, then the three cards.

The error bubble follows the Assistant Bubble Error Message Guidelines:

- **Wording:** a lead line of 8 words or fewer, one sentence on what happens next, no blame, no exclamation marks, and none of the banned words or status codes.
- **Action:** one button, "Try again", inside the bubble. No toasts, pop-ups or modals.
- **Look:** same shape and position as a normal reply (shared classes in [`components/bubbleClasses.ts`](components/bubbleClasses.ts)), neutral colours only, no red, and no warning icon.
- **Accessibility:** the thread is a polite live region that's on the page before the message appears, the button has a visible focus ring and is 44px tall, and the text meets AA contrast.

The bubble is built with Tailwind CSS in [`components/ErrorBubble.tsx`](components/ErrorBubble.tsx).

## The three cards

Each card has its own color, its own image box position and its own largest text, so they look different even with the words covered.

| Card | Color | Image box | Largest text |
| --- | --- | --- | --- |
| Stay | Indigo | Wide photo, under the headline. Price and rating sit on the photo. | Listing title |
| Experience | Green | None | Start time (14:00) |
| Food | Saffron | Small square photo, right of the headline | Place name |

### See all

Each card's button opens a sheet over the conversation with every row from that sheet of the content pack. The trip's place, dates and guests are shown as the filters applied. The pick from the reply is marked **In your plan**, and the sold-out Fushimi Inari walk is listed separately under **Sold out on your dates**.

Close the sheet with **Back to chat**, the Escape key or a click outside it. The conversation stays exactly as it was. The sheet slides in from the right on wide screens and fills the screen on phones.

## Photos

The content pack has no listing photos because image rights aren't cleared. The cards and lists use **sample photos** instead: CC0 or public-domain images from Wikimedia Commons that show the area or the kind of thing, not the actual listing. The Stay card labels its photo "Sample photo" so testers don't mistake it for the real place.

No free photo fit S3 (a flat off Sanjo Street) or E2 (the Nishiki Market walk), so those two keep a "Photo soon" placeholder. That also shows what a listing without a photo looks like.

| Row | Photo | Author | License |
| --- | --- | --- | --- |
| S1 | [Streets of Gion, Kyoto](https://commons.wikimedia.org/wiki/File:Streets_of_Gion,_Kyoto_-_Gion7708.jpg) | lumoplank | CC0 |
| S2 | [Kyoto Kamogawa Noryo-Yuka](https://commons.wikimedia.org/wiki/File:Kyoto_Kamogawa_Noryo-Yuka.jpg) | MaedaAkihiko | CC0 |
| S4 | [Washitsu in Toki-ke house](https://commons.wikimedia.org/wiki/File:Washitsu_in_Toki-ke_house.jpg) | 妖精書士 | CC0 |
| E1 | [The Chanoyu, or Japanese tea ceremony](https://commons.wikimedia.org/wiki/File:The_Chanoyu,_or_Japanese_tea_ceremony_-_DPLA_-_e9f081159c1b2718cd00b211a41071c9.jpg) | Unknown (via DPLA) | Public domain |
| E3 | [Fushimi Inari Torii](https://commons.wikimedia.org/wiki/File:20181110_Fushimi_Inari_Torii_10.jpg) | Balon Greyjoy | CC0 |
| E4 | [Openwork Hexagonal Ko-Kiyomizu Ware Bowl](https://commons.wikimedia.org/wiki/File:Openwork_Hexagonal_Ko-Kiyomizu_Ware_Bowl,_c._1731-1752,_Japan,_artist_unknown,_stoneware_with_overglaze_enamels_-_Art_Institute_of_Chicago_-_DSC00215.JPG) | Daderot | CC0 |
| F1 | [Ramen and Chahan](https://commons.wikimedia.org/wiki/File:Ramen_and_Chahan.jpg) | Akahito Yamabe | CC0 |
| F2 | [Japanese tofu](https://commons.wikimedia.org/wiki/File:Japanese_tofu_001.jpg) | Ocdp | CC0 |
| F3 | [Yakitori](https://commons.wikimedia.org/wiki/File:YakitoriM0826.jpg) | Fg2 | Public domain |
| F4 | [Kaiseki-style set meal](https://commons.wikimedia.org/wiki/File:IMG-2023-12-2-kaisekifuuteishoku.jpg) | Htheword | CC0 |

None of these licenses require credit, but it's listed here anyway. To swap a photo, replace the file in `public/images/` and its entry in [`data/photos.ts`](data/photos.ts).

## Where the content comes from

The mock reply uses one row from each sheet of **Kyoto Weekend Prototype Content Pack.xlsx**, copied into [`data/contentPack.ts`](data/contentPack.ts):

| Sheet | Row | Pick |
| --- | --- | --- |
| Stays | S1 | Restored machiya townhouse near Gion, $366 for 2 nights |
| Experiences | E4 | Throw a tea bowl in a Kiyomizu pottery studio, $144 for 2 |
| Food | F2 | Sagano Yudofu-tei, about $64 for 2 |

These three come to $574 of the $600 reference budget.

E4 has no host name and F2 has no booking note. Empty cells become filler text ("Host to be confirmed", "Booking details to be confirmed"), shown in muted italics with a dotted underline so testers can tell it isn't real content. To change the picks or the filler wording, edit `PICKED_ROWS` and `FILLER` in [`lib/mockReply.ts`](lib/mockReply.ts).

The reply follows the spec's response shape. `cards` is always ordered stay, experience, food, and every card has the same fields: `card_type`, `header_label`, `headline`, `items`, `tags` and `cta`. See [`lib/types.ts`](lib/types.ts).

## Project layout

```text
app/
  layout.tsx              Fonts and page metadata
  page.tsx                Renders the chat page
  globals.css             Color tokens (light and dark) and base styles
components/
  ChatPage.tsx            Header, scrolling thread, locking message box
  ThinkingDots.tsx        Pulsing dots shown while the reply loads
  ErrorBubble.tsx         Error bubble with Try again (Tailwind CSS)
  bubbleClasses.ts        Shape classes shared by every assistant bubble
  TripReplyView.tsx       Understood-intent chips, the three cards, budget line
  ResultsSheet.tsx        "See all" sheet listing every row for one card
  cards/
    StayCard.tsx          Stay card and its layout
    ExperienceCard.tsx    Experience card and its layout
    FoodCard.tsx          Food card and its layout
    cardBase.module.css   Frame, header strip and button shared by all cards
    Filler.tsx            Styles filler text for empty content pack cells
data/contentPack.ts       Rows from the content pack workbook
data/photos.ts            Sample photo for each row, with credits
public/images/            The sample photos
lib/mockReply.ts          Builds the reply and the See all lists from the rows
lib/mockServer.ts         Stands in for the search API, including the /fail trigger
lib/parseReply.ts         Checks a reply can become the three cards
lib/types.ts              Reply shape from the spec
```

Most styling is CSS Modules, one file per component. The assistant bubbles, including the error bubble, use Tailwind CSS. Tailwind reads the app's colour tokens, so its classes follow light and dark mode too.

## Not in this stage

- The spec's other error cases (unclear place, low availability, one card failing, offline)
- Editing the understood-intent chips
- Opening a single listing from the See all list
- Follow-up messages that refine the cards
