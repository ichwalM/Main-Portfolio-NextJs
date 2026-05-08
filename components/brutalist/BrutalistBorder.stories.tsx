import type { Meta, StoryObj } from '@storybook/react';
import BrutalistBorder from './BrutalistBorder';
import BrutalistText from './BrutalistText';

const meta: Meta<typeof BrutalistBorder> = {
  title: 'Brutalist/BrutalistBorder',
  component: BrutalistBorder,
  args: {
    position: 'bottom',
    weight: 3,
    color: 'primary',
    animated: false,
    animationType: 'pulse',
    width: 'w-full',
    height: 'h-auto',
  },
};

export default meta;
type Story = StoryObj<typeof BrutalistBorder>;

export const StandaloneLine: Story = {
  render: (args) => (
    <div className="w-full">
      <BrutalistBorder {...args} />
    </div>
  ),
};

export const WrappingContent: Story = {
  args: { position: 'all', weight: 4 },
  render: (args) => (
    <BrutalistBorder {...args} className="p-6">
      <BrutalistText as="h3" size="xl" weight="extrabold" uppercase>
        Border Wrapper
      </BrutalistText>
      <BrutalistText color="secondary">
        Thick, contrast border framing content.
      </BrutalistText>
    </BrutalistBorder>
  ),
};

export const Animated: Story = {
  args: { animated: true, animationType: 'pulse', position: 'all' },
  render: (args) => (
    <BrutalistBorder {...args} className="p-6">
      <BrutalistText as="h3" size="xl" weight="extrabold" uppercase>
        Animated Border
      </BrutalistText>
      <BrutalistText color="secondary">Linear pulse, no easing.</BrutalistText>
    </BrutalistBorder>
  ),
};
