# React Image Carousel

A reusable and accessible image carousel built with React and Vite.

## Features

- Auto-play with configurable interval
- Pause on hover and touch
- Previous and next navigation buttons
- Indicator dots
- Keyboard arrow navigation
- Swipe support for mobile devices
- Lazy loading of images
- Accessible with ARIA attributes and live announcements
- Fully reusable via props

## Props

- `images`
- `autoPlay`
- `interval`
- `showDots`
- `showArrows`

## Accessibility Decisions

- `tabIndex="0"` to make the carousel focusable
- Arrow key navigation
- `aria-label` on buttons
- `aria-current="true"` on the active dot
- `aria-live="polite"` to announce slide changes
- Visible focus outlines

## Tech Stack

- React
- Vite
- CSS

## Deployment

- GitHub Repository: YOUR_REPOSITORY_URL
- Live Demo: YOUR_VERCEL_URL