import type { Meta, StoryObj } from '@storybook/react';
import BrutalistGrid from './BrutalistGrid';
import BrutalistCard from './BrutalistCard';
import BrutalistText from './BrutalistText';
import BrutalistTag from './BrutalistTag';

const meta: Meta<typeof BrutalistGrid> = {
  title: 'Brutalist/BrutalistGrid',
  component: BrutalistGrid,
  args: {
    columns: 3,
    gap: 'default',
    overlap: false,
    staggered: false,
    delayStart: 0,
  },
};

export default meta;
type Story = StoryObj<typeof BrutalistGrid>;

const items = Array.from({ length: 7 }).map((_, i) => (
  <BrutalistCard
    key={i}
    variant={i % 3 === 0 ? 'double-border' : i % 3 === 1 ? 'outlined' : 'inset'}
    hoverable
  >
    <div className="space-y-2">
      <BrutalistTag variant="outline">Item {String(i + 1).padStart(2, '0')}</BrutalistTag>
      <BrutalistText as="h3" size="lg" weight="extrabold" uppercase>
        Grid Block
      </BrutalistText>
      <BrutalistText color="secondary">Whitespace + offset rhythm.</BrutalistText>
    </div>
  </BrutalistCard>
));

export const Basic: Story = {
  render: (args) => <BrutalistGrid {...args}>{items}</BrutalistGrid>,
};

export const Overlap: Story = {
  args: { overlap: true },
  render: (args) => <BrutalistGrid {...args}>{items}</BrutalistGrid>,
};

export const Staggered: Story = {
  args: { staggered: true },
  render: (args) => <BrutalistGrid {...args}>{items}</BrutalistGrid>,
};

export const Responsive: Story = {
  args: {
    columns: 1,
    responsiveColumns: { sm: 2, lg: 3 },
  },
  render: (args) => <BrutalistGrid {...args}>{items}</BrutalistGrid>,
};
