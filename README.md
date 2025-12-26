# Portfolio Website

A modern, responsive portfolio website built with React, featuring multi-language support (English/German), dark/light mode, and interactive content management.

## Features

✨ **Multi-language Support**: English and German with URL-based language switching (`/en/` and `/de/`)

🌓 **Dark/Light Mode**: Theme toggle with localStorage persistence

📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices

🎨 **Modern Design**: Clean, professional UI with smooth animations

🔧 **Easy Content Management**: Update content through JSON files

📦 **GitHub Pages Ready**: Configured for easy deployment

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **React i18next** - Internationalization
- **Framer Motion** - Animations
- **CSS Custom Properties** - Theming

## Project Structure

```
portfolio/
├── public/
│   └── images/          # Image assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Card/
│   │   ├── Layout/
│   │   ├── Modal/
│   │   └── SkillBar/
│   ├── contexts/        # React contexts
│   │   └── ThemeContext.jsx
│   ├── data/            # Content JSON files
│   │   ├── projects.json
│   │   ├── hobbyProjects.json
│   │   ├── achievements.json
│   │   ├── research.json
│   │   ├── skills.json
│   │   └── resume.json
│   ├── locales/         # Translation files
│   │   ├── en.json
│   │   └── de.json
│   ├── pages/           # Page components
│   │   ├── Hobbies/
│   │   ├── Home.jsx
│   │   ├── Skills.jsx
│   │   ├── Resume.jsx
│   │   ├── Projects.jsx
│   │   ├── HobbyProjects.jsx
│   │   ├── Achievements.jsx
│   │   └── Research.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── i18n.js
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:5173`

## Adding/Updating Content

All content is managed through JSON files in the `src/data/` directory. Each file supports both English and German content.

### Adding a New Project

Edit `src/data/projects.json`:

```json
{
  "en": [
    {
      "id": 4,
      "title": "Your Project Title",
      "description": "Short description",
      "image": "/portfolio/images/your-image.png",
      "technologies": ["React", "Node.js"],
      "link": "https://example.com",
      "detailedDescription": "Detailed description shown in popup"
    }
  ],
  "de": [
    {
      "id": 4,
      "title": "Ihr Projekttitel",
      "description": "Kurze Beschreibung",
      "image": "/portfolio/images/your-image.png",
      "technologies": ["React", "Node.js"],
      "link": "https://example.com",
      "detailedDescription": "Detaillierte Beschreibung im Popup angezeigt"
    }
  ]
}
```

### Adding a New Skill

Edit `src/data/skills.json`:

```json
{
  "en": {
    "categories": [
      {
        "name": "Your Category",
        "skills": [
          { "name": "Skill Name", "percentage": 85 }
        ]
      }
    ]
  }
}
```

### Other Content Files

- `hobbyProjects.json` - Hobby projects (7 items)
- `achievements.json` - Achievements (11 items)
- `research.json` - Research papers (6 items)
- `resume.json` - Work experience and education
- `skills.json` - Skills with percentage bars

## Building for Production

Build the production bundle:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deploying to GitHub Pages

1. Update the repository URL in `package.json` if needed

2. Deploy to GitHub Pages:

```bash
npm run deploy
```

This will build the project and push it to the `gh-pages` branch.

3. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

Your site will be live at `https://yourusername.github.io/portfolio/`

## Customization

### Changing the Base URL

If deploying to a custom domain or root domain, update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/', // Change this
})
```

### Updating Colors

Edit CSS custom properties in `src/index.css`:

```css
:root {
  --accent-primary: #6366f1;
  --accent-secondary: #8b5cf6;
  /* ... other colors */
}
```

### Adding Profile Image

Replace `/public/images/profile.png` with your photo.

### Adding Project Images

Add images to `/public/images/` and reference them in the JSON files:

```json
"image": "/portfolio/images/my-project.png"
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT License - feel free to use this template for your own portfolio!

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using React and Vite
