# Kyoto trip planner

A chat-style search prototype. A guest types a trip idea like "Kyoto weekend plan". Instead of an empty results page, they get three starting points: a place to stay, something to do and somewhere to eat. They don't have to set a single filter first.

This is the prototype for the spec sheet "Building Airbnb's Kyoto trip planner before Thursday's guest test". It's a concept prototype, not an official Airbnb product.

## Screenshot

The thread after sending "Kyoto weekend plan": the understood-intent chips, then the Stay, Experience and Food cards side by side, and the budget line.

![The chat thread after asking for a Kyoto weekend plan, showing the Stay, Experience and Food cards side by side](docs/kyoto-thread.png)

Image file: [`docs/kyoto-thread.png`](docs/kyoto-thread.png)

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
lib/types.ts              Reply shape from the spec
```

Styling is plain CSS Modules, one file per component, with no UI library.

## Not in this stage

- Error bubbles and the `/fail` test switch from the spec
- Editing the understood-intent chips
- Opening a single listing from the See all list
- Follow-up messages that refine the cards
