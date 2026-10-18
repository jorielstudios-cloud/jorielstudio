# Joriel Studios

Photography studio website for Joriel Studios, Kitengela, Kenya.

## Run on Windows, macOS, or Linux

1. Install Node.js 20.19 or newer from https://nodejs.org/
2. Open Command Prompt or PowerShell inside this `joriel-studios` folder.
3. Install the packages:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local address shown in the terminal, normally:

```text
http://localhost:5173
```

The project is standalone and does not need `PORT`, `BASE_PATH`, Replit, or any API keys for local development.

## Other commands

```bash
npm run build
npm run serve
npm run typecheck
npm run optimize:images
```

Before adding full-resolution photos under `public/assets`, keep a separate copy of
the originals. `npm run optimize:images` resizes supported images to at most
2400 × 2400 pixels and recompresses them in place to reduce website download size.