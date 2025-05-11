# Math Equation Solver

A web-based math equation solver with OCR capabilities, supporting various mathematical notations and EU standards.

## Features

- Image upload and OCR processing
- Math expression parsing and solving
- Detailed step-by-step solutions
- Support for various equation types
- EU standards compliance
- Real-time equation preview
- Responsive design

## Development Setup

1. Install Node.js (v16 or higher) from [nodejs.org](https://nodejs.org/)

2. Clone the repository:
```bash
git clone <repository-url>
cd math-equation-solver
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Development Notes

- The application uses Vite as the development server and build tool
- KaTeX is used for math rendering
- Math.js handles mathematical computations
- The application is built with vanilla JavaScript and modern ES modules
- CSS variables are used for theming and styling

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT 