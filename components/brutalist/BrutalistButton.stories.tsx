import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight } from 'lucide-react';
import BrutalistButton from './BrutalistButton';

const meta: Meta<typeof BrutalistButton> = {
  title: 'Brutalist/BrutalistButton',
  component: BrutalistButton,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    borderWeight: 'thick',
    fullWidth: false,
    isLoading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof BrutalistButton>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Accent: Story = {
  args: { variant: 'accent' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const WithIcon: Story = {
  args: { icon: <ArrowRight size={14} strokeWidth={2.5} />, iconPosition: 'right' },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-center">
      <BrutalistButton {...args} size="sm">
        Small
      </BrutalistButton>
      <BrutalistButton {...args} size="md">
        Medium
      </BrutalistButton>
      <BrutalistButton {...args} size="lg">
        Large
      </BrutalistButton>
    </div>
  ),
};
