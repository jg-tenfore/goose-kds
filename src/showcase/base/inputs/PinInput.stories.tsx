import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { Box, TextField } from '@mui/material';

function PinInputDemo({ length = 4 }: { length?: number }) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handle = (i: number, v: string) => {
    const digit = v.replace(/\D/g, '').slice(-1);
    const next = [...values];
    next[i] = digit;
    setValues(next);
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  };

  return (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      {values.map((val, i) => (
        <TextField
          key={i}
          value={val}
          onChange={(e) => handle(i, e.target.value)}
          inputRef={(el) => {
            refs.current[i] = el;
          }}
          slotProps={{ htmlInput: { maxLength: 1, style: { textAlign: 'center', fontSize: 24 } } }}
          sx={{ width: 56 }}
        />
      ))}
    </Box>
  );
}

const meta = {
  title: 'Base Components/Inputs/Pin Input',
  component: PinInputDemo,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PinInputDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const PinInput: Story = { args: { length: 4 } };
