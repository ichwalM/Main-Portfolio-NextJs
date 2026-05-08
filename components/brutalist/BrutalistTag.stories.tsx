import type { Meta, StoryObj } from '@storybook/react';
import BrutalistTag from './BrutalistTag';

const meta: Meta<typeof BrutalistTag> = {
  title: 'Brutalist/BrutalistTag',
  component: BrutalistTag,
  args: {
    children: 'Tag',
    variant: 'outline',
    size: 'xs',
  },
};

export default meta;
type Story = StoryObj<typeof BrutalistTag>;

export const Outline: Story = {};

export const Solid: Story = {
  args: { variant: 'solid' },
};

export const Accent: Story = {
  args: { variant: 'accent' },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <BrutalistTag {...args} size="xs">
        XS
      </BrutalistTag>
      <BrutalistTag {...args} size="sm">
        SM
      </BrutalistTag>
    </div>
  ),
};
