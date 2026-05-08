import type { Meta, StoryObj } from '@storybook/react';
import BrutalistDivider from './BrutalistDivider';

const meta: Meta<typeof BrutalistDivider> = {
  title: 'Brutalist/BrutalistDivider',
  component: BrutalistDivider,
  args: {
    weight: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof BrutalistDivider>;

export const Line: Story = {
  args: { label: undefined },
};

export const WithLabel: Story = {
  args: { label: 'SECTION BREAK' },
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-6">
      <BrutalistDivider weight="thin" label="Thin" />
      <BrutalistDivider weight="medium" label="Medium" />
      <BrutalistDivider weight="thick" label="Thick" />
    </div>
  ),
};
