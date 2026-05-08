import type { Meta, StoryObj } from '@storybook/react';
import BrutalistText from './BrutalistText';

const meta: Meta<typeof BrutalistText> = {
  title: 'Brutalist/BrutalistText',
  component: BrutalistText,
  args: {
    children: 'Brutalist typography: bold, high contrast, sharp rhythm.',
    as: 'p',
    color: 'primary',
    leading: 'relaxed',
  },
};

export default meta;
type Story = StoryObj<typeof BrutalistText>;

export const Body: Story = {};

export const Heading: Story = {
  args: {
    as: 'h2',
    children: 'Sharp Heading',
    uppercase: true,
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-3">
      <BrutalistText as="h1" uppercase>
        H1 — Brutalist
      </BrutalistText>
      <BrutalistText as="h2" uppercase>
        H2 — Brutalist
      </BrutalistText>
      <BrutalistText as="h3" uppercase>
        H3 — Brutalist
      </BrutalistText>
      <BrutalistText as="p" color="secondary">
        Paragraph — secondary color to keep contrast harsh but readable.
      </BrutalistText>
      <BrutalistText as="label" uppercase tracking="wider">
        Label
      </BrutalistText>
    </div>
  ),
};
