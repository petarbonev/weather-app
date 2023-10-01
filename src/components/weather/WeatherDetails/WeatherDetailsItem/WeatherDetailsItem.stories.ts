import type { Meta, StoryObj } from '@storybook/react';
import WeatherDetailsItem from './WeatherDetailsItem';

const meta: Meta<typeof WeatherDetailsItem> = {
  title: 'Components/WeatherDetailsItem',
  component: WeatherDetailsItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WeatherDetailsItem>;

export const Component: Story = {
  args: {
    dt: Math.floor(new Date().getTime() / 1000),
    main: {
        temp: 15,
        feels_like: 12,
        grnd_level: 0,
        humidity: 53,
        pressure: 21,
        sea_level: 0,
        temp_kf: 11,
        temp_max: 20,
        temp_min: 12
    },
    weather: [{ id: 1, description: 'Few clouds', main: 'Clouds', icon: '02n' }],
    dt_txt: '2023-10-01 15:00'
  },
};
