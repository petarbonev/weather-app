import type { Meta, StoryObj } from '@storybook/react';
import Error from './Error';

const meta: Meta<typeof Error> = {
  title: 'Components/Error',
  component: Error,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Error>;

export const Component: Story = {
  args: {
    error: 'Your error goes here'
  },
};
