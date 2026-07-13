import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Box, Button, MobileStepper, Paper, Typography } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const SLIDES = ['Grill', 'Fry', 'Cold', 'Beverage'];

function CarouselDemo() {
  const [step, setStep] = useState(0);
  const max = SLIDES.length;
  return (
    <Box sx={{ width: 360 }}>
      <Paper
        square
        elevation={0}
        sx={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover' }}
      >
        <Typography variant="h4">{SLIDES[step]}</Typography>
      </Paper>
      <MobileStepper
        variant="dots"
        steps={max}
        position="static"
        activeStep={step}
        nextButton={
          <Button size="small" onClick={() => setStep((s) => s + 1)} disabled={step === max - 1}>
            Next <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
            <KeyboardArrowLeft /> Back
          </Button>
        }
      />
    </Box>
  );
}

const meta = {
  title: 'Components/Media & Visuals/Carousel',
  component: CarouselDemo,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CarouselDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Carousel: Story = {};
