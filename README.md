# Voight Website

Static website for Voight, a VS Code extension that surfaces AI-generated code in reviewable segments.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # Global styles
├── src/
│   └── main.ts        # TypeScript interactions
├── vite.config.ts     # Vite configuration
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment workflow
```

## Tech Stack

- HTML5
- CSS3
- TypeScript
- Vite
- GitHub Pages

## Design

The website uses a dark theme derived from VS Code's default dark theme with a minimal, professional aesthetic inspired by Linear, Zed, and Warp.

## License

ISC
