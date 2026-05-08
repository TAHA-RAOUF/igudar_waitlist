# Igudar Waitlist

Single-page waitlist for the Igudar showcase booth. Built with Nuxt and the Vue Composition API.

## Setup

```bash
npm install
```

Create a `.env` file in the project root:

```bash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=waitlist@yourdomain.com
RESEND_TO_EMAIL=team@yourdomain.com
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Notes

- The waitlist form posts to `/api/waitlist`, which sends an email via Resend.
- For Vercel, add the same environment variables in the project settings.
