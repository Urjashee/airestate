## Installation Guide

### Install react with vite

```
 npm create vite@latest client
 cd client
 npm install
```

### Install tailwind CSS with vite

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Change tailwind.config.js

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```


### Change index.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Start the project

```
npm run dev
```

