import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';

const STEPS = ['Select device', 'Assign station', 'Configure routing', 'Review'];

const meta = {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MUI `Stepper` — communicates progress through a numbered sequence of steps, built from `Step` and `StepLabel`. ' +
          'Drive it with an `activeStep` index in state and advance it with Back / Next controls. ' +
          'Use it for multi-step setup flows such as onboarding a new KDS device. ' +
          'It supports `orientation="horizontal"` (default) and `"vertical"` layouts, plus an `alternativeLabel` mode that stacks labels beneath the step connector.',
      },
    },
  },
} satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;

/** A horizontal Stepper driven by Back / Next controls. */
function PlaygroundDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const last = STEPS.length - 1;
  return (
    <Box sx={{ width: 560 }}>
      <Stepper activeStep={activeStep}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveStep((s) => Math.min(s + 1, last))}
          disabled={activeStep === last}
        >
          {activeStep === last ? 'Done' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundDemo />,
};

/** A vertical Stepper with per-step content and inline controls. */
function VerticalDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const last = STEPS.length - 1;
  return (
    <Box sx={{ width: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Configure the “{label}” step for the new device.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((s) => s - 1)}
                >
                  Back
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setActiveStep((s) => Math.min(s + 1, last))}
                >
                  {activeStep === last ? 'Finish' : 'Continue'}
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export const Vertical: Story = {
  render: () => <VerticalDemo />,
  parameters: {
    docs: { description: { story: 'A vertical Stepper with `StepContent` beneath each label.' } },
  },
};

/** A horizontal Stepper with `alternativeLabel`, which centers labels below the connector. */
export const AlternativeLabel: Story = {
  render: () => (
    <Stepper activeStep={2} alternativeLabel sx={{ width: 560 }}>
      {STEPS.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  ),
  parameters: {
    docs: { description: { story: 'The `alternativeLabel` layout stacks each label under its step icon.' } },
  },
};
