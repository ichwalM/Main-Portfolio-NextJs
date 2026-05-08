import type { Meta, StoryObj } from '@storybook/react';
import BrutalistCard from './BrutalistCard';
import BrutalistText from './BrutalistText';
import BrutalistTag from './BrutalistTag';
import BrutalistButton from './BrutalistButton';

const meta: Meta<typeof BrutalistCard> = {
  title: 'Brutalist/BrutalistCard',
  component: BrutalistCard,
  args: {
    variant: 'outlined',
    borderWeight: 'thick',
    borderColor: 'primary',
    hoverable: true,
  },
};

export default meta;
type Story = StoryObj<typeof BrutalistCard>;

export const Outlined: Story = {
  render: (args) => (
    <BrutalistCard {...args}>
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <BrutalistTag variant="outline">Featured</BrutalistTag>
          <BrutalistText as="h3" size="xl" weight="extrabold" uppercase>
            Brutalist Card
          </BrutalistText>
          <BrutalistText color="secondary" leading="relaxed">
            Multiple borders, sharp corners, and abrupt interaction states.
          </BrutalistText>
        </div>
        <BrutalistButton size="sm" variant="outline">
          Action
        </BrutalistButton>
      </div>
    </BrutalistCard>
  ),
};

export const DoubleBorder: Story = {
  args: { variant: 'double-border' },
  render: (args) => (
    <BrutalistCard {...args}>
      <BrutalistText as="h3" size="xl" weight="extrabold" uppercase>
        Double Border
      </BrutalistText>
      <BrutalistText color="secondary">
        Outer + inner border to create a harsh frame.
      </BrutalistText>
    </BrutalistCard>
  ),
};

export const Inset: Story = {
  args: { variant: 'inset' },
  render: (args) => (
    <BrutalistCard {...args}>
      <BrutalistText as="h3" size="xl" weight="extrabold" uppercase>
        Inset
      </BrutalistText>
      <BrutalistText color="secondary">
        Inner border inset for depth without softness.
      </BrutalistText>
    </BrutalistCard>
  ),
};

export const Filled: Story = {
  args: { variant: 'filled' },
  render: (args) => (
    <BrutalistCard {...args}>
      <BrutalistText as="h3" size="xl" weight="extrabold" uppercase>
        Filled
      </BrutalistText>
      <BrutalistText color="secondary">
        Solid surface with thick border.
      </BrutalistText>
    </BrutalistCard>
  ),
};
