import type { Meta, StoryObj } from '@storybook/react-vite';
import { Step, StepLabel, Stepper } from '@mui/material';

const STEPS = ['Received', 'In prep', 'Ready', 'Handed off'];

const meta = {
  title: 'Application Components/Progress Steps',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressSteps: Story = {
  render: () => (
    <Stepper activeStep={2} sx={{ width: 520 }}>
      {STEPS.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  ),
};
