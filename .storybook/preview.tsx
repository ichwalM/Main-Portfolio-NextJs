import type { Preview } from '@storybook/nextjs';
import type { Decorator } from '@storybook/react';
import React from 'react';
import '../app/globals.css';
import { ThemeProvider } from '../lib/context/ThemeContext';

const withTheme: Decorator = (Story, context) => {
  const selectedTheme = (context.globals.theme ?? 'dark') as 'dark' | 'light';

  if (typeof document !== 'undefined') {
    if (selectedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem('theme', selectedTheme);
  }

  return (
    <ThemeProvider key={selectedTheme}>
      <div className="min-h-screen bg-background text-foreground p-6">
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
