# Personal Website - Muhammed Shabith K

A modern, beautiful personal portfolio website built with React, TypeScript, and TailwindCSS.

## Features

- 🎨 Modern, responsive design with smooth animations
- 🌙 Dark mode support
- 📱 Mobile-friendly navigation
- ⚡ Fast performance with Vite
- 🎯 Smooth scrolling between sections
- 💼 Sections: Hero, About, Skills, Projects, Contact

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization

To personalize this website for yourself:

1. **Update personal information** in `src/App.tsx`:
   - Name, title, and description in the Hero section
   - About section content
   - Skills array
   - Projects array
   - Social media links (GitHub, LinkedIn, Email)

2. **Update meta tags** in `index.html`:
   - Title and description

3. **Customize colors** in `tailwind.config.js`:
   - Modify the primary color palette

## Project Structure

```
personal-website/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Dependencies
```

## License

MIT License - feel free to use this template for your own personal website!
