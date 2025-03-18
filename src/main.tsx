
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Check for system dark mode preference or saved mode
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches || 
                   localStorage.getItem('theme') === 'dark';

// Set initial dark mode class on the html element
if (isDarkMode) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
