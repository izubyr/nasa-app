# 🌌 COSMOS

A responsive astronomy picture app for exploring NASA’s Astronomy Picture of the Day, browsing recent images, choosing a date, and saving favorites.

---

## 🪐 Overview

**COSMOS** uses NASA’s public APOD Basic feed to bring a new view of the universe to your browser. Explore the featured picture, read its explanation, revisit recent entries, and keep a personal collection of saved pictures.

The interface uses a dark, space-inspired design with cyan highlights, large astronomy images, and layouts for desktop and mobile screens.

### 🌟 Key Features

- **Picture of the day:** Shows NASA’s latest astronomy picture and explanation.
- **Date selection:** Choose a past date to view that day’s APOD.
- **Recent pictures:** Browse recent entries in Explore.
- **Favorites:** Save and remove pictures from your collection.
- **Persistent collection:** Favorites are stored in the browser using `localStorage`.
- **Picture details:** Shows the title, date, image, explanation, and available credit.
- **Fallback states:** Handles loading, unavailable pictures, and empty favorites.
- **Responsive design:** Adapts the layout for narrow and wide screens.
- **Separate pages:** Today, Explore, and Favorites use the Next.js App Router.

---

## 🧰 Built With

- **Next.js** — app framework, pages, and API route.
- **React** — reusable interface components and interactions.
- **TypeScript** — types for APOD data and shared components.
- **Tailwind CSS v4** — CSS processing through the Next.js Turbopack integration.
- **NASA APOD Basic feed** — picture metadata and image URLs.
- **Browser `localStorage`** — saves favorites on the current browser.

---

## 📂 Project Structure

```text
NASA-project/
├── app/
│   ├── api/
│   │   └── apod/
│   │       └── route.ts
│   ├── explore/
│   │   └── page.tsx
│   ├── favorites/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   └── components/
│       ├── apod.ts
│       ├── CosmosPage.tsx
│       ├── FeaturedPicture.tsx
│       ├── PictureCard.tsx
│       ├── PictureGrid.tsx
│       ├── SiteHeader.tsx
│       └── types.ts
├── package.json
└── README.md
```

---

## 🚀 Run Locally

### Requirements

- Node.js
- npm

### Setup

1. Open the project folder in a terminal.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the **Local** URL printed in the terminal, usually `http://localhost:3000`.

No `.env.local` file or NASA API key is needed for the APOD Basic feed.

### Available Commands

```bash
npm run dev      # Start the development server
npm run lint     # Check the code with ESLint
npm run build    # Create a production build
npm start        # Run the production build locally
```

Run `npm run build` before `npm start`.

---

## 🔑 NASA Feed Notes

COSMOS uses NASA’s public APOD Basic feed, so it does not send an API key. The browser requests the feed directly and the local `/api/apod` route is used as a fallback when needed.

---

## ⚠️ Known Limitations

- Favorites are stored in one browser and do not sync across devices.
- Clearing browser storage removes saved favorites.
- The app has no user accounts or database.
- Picture availability depends on NASA’s feed and the network connection.

---

## 🙏 Credits

Astronomy pictures and descriptions are provided by [NASA’s Astronomy Picture of the Day](https://science.nasa.gov/astrophotography/).

---

## 📸 Screenshots and Demo

Add a screenshot and deployed URL here when you publish the app.

- **Live demo:** Add your deployment URL
- **GitHub repository:** Add your repository URL
