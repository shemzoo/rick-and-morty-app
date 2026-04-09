import type { Meta, StoryObj } from '@storybook/react';

import { SearchIcon } from '@/assets';

import { TextInput } from './TextInput.component';

const meta: Meta<typeof TextInput> = {
  title: 'Shared/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['underlined', 'bordered']
    },
    icon: {
      control: false
    },
    value: {
      control: 'text'
    },
    placeholder: {
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Underlined: Story = {
  args: {
    variant: 'underlined',
    placeholder: 'Placeholder text...'
  }
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    placeholder: 'Search something...'
  }
};

export const WithIcon: Story = {
  args: {
    variant: 'bordered',
    placeholder: 'Search something...',
    icon: <SearchIcon />
  }
};

export const WithValue: Story = {
  args: {
    variant: 'underlined',
    placeholder: 'Placeholder text...',
    value: 'Some value'
  }
};
