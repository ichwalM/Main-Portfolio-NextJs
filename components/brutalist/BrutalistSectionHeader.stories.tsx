import type { Meta, StoryObj } from '@storybook/react';
import BrutalistSectionHeader from './BrutalistSectionHeader';

const meta: Meta<typeof BrutalistSectionHeader> = {
  title: 'Brutalist/BrutalistSectionHeader',
  component: BrutalistSectionHeader,
  args: {
    number: '01',
    label: 'Overview',
    title: 'Brutalist',
    accentTitle: 'Sections',
    subtitle: 'Staggered entrance, sharp typography, and thick dividers.',
    align: 'left',
  },
};

export default meta;
type Story = StoryObj<typeof BrutalistSectionHeader>;

export const Left: Story = {};

export const Center: Story = {
  args: { align: 'center' },
};
