import type { Meta, StoryObj } from '@storybook/react';

import { StatusIcon } from '../StatusIcon/StatusIcon.component';
import { Selector } from './Selector.component';

const meta: Meta<typeof Selector> = {
  title: 'Shared/Selector',
  component: Selector,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    size: { control: 'radio', options: ['large', 'small'] },
    options: { control: false },
    OptionRenderer: { control: false }
  }
};

export default meta;
type Story = StoryObj<typeof Selector>;

const commonArgs = {
  options: [
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' }
  ]
};

export const Large: Story = {
  args: {
    ...commonArgs,
    size: 'large',
    placeholder: 'Choose status'
  }
};

export const Small: Story = {
  args: {
    ...commonArgs,
    size: 'small',
    placeholder: 'Status'
  }
};

export const SmallSelected: Story = {
  args: {
    ...commonArgs,
    size: 'small',
    placeholder: 'Status',
    value: 'alive'
  }
};

export const WithCustomOptionRenderer: Story = {
  args: {
    ...commonArgs,
    placeholder: 'Choose status',
    value: 'dead',
    OptionRenderer: ({ option }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <StatusIcon status={option.value as 'alive' | 'dead' | 'unknown'} />
        <span>{option.label}</span>
      </div>
    )
  }
};
