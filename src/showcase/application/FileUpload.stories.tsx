import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import CloudUpload from '@mui/icons-material/CloudUpload';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';

const HiddenInput = styled('input')({ display: 'none' });

const meta = {
  title: 'Components/Forms/File Upload',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const FileUpload: Story = {
  render: () => (
    <Box sx={{ width: 380 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 4,
          textAlign: 'center',
          borderStyle: 'dashed',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <CloudUpload sx={{ fontSize: 40, color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary">
          Drag & drop files here, or
        </Typography>
        <Button component="label" variant="outlined" size="small">
          Browse
          <HiddenInput type="file" multiple />
        </Button>
      </Paper>
      <List>
        <ListItem>
          <ListItemIcon>
            <InsertDriveFile />
          </ListItemIcon>
          <ListItemText primary="menu-export.csv" secondary="uploading… 65%" />
        </ListItem>
      </List>
      <LinearProgress variant="determinate" value={65} />
    </Box>
  ),
};
