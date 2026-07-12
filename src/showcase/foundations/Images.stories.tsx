import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Paper, Typography } from '@mui/material';

// Auto-discover every image copied into src/assets/images (from tf-fox-ds-v1).
// Vite resolves each to a correctly-based URL (works locally and on GitHub Pages).
const modules = import.meta.glob(
  '../../assets/images/**/*.{png,jpg,jpeg,webp,svg,gif,avif,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>;

type Img = { folder: string; name: string; url: string };

const images: Img[] = Object.entries(modules).map(([path, url]) => {
  const rel = path.split('/images/')[1] ?? path;
  const parts = rel.split('/');
  const folder = parts.length > 1 ? parts[0] : 'root';
  return { folder, name: parts[parts.length - 1], url };
});

const groups = images.reduce<Record<string, Img[]>>((acc, img) => {
  (acc[img.folder] ??= []).push(img);
  return acc;
}, {});
const folderNames = Object.keys(groups).sort();

function Thumb({ img }: { img: Img }) {
  return (
    <Paper variant="outlined" sx={{ width: 150, overflow: 'hidden' }}>
      <Box
        sx={{
          height: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'action.hover',
        }}
      >
        <Box
          component="img"
          src={img.url}
          alt={img.name}
          loading="lazy"
          sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </Box>
      <Typography variant="caption" noWrap sx={{ display: 'block', p: 0.75 }} title={img.name}>
        {img.name}
      </Typography>
    </Paper>
  );
}

function Gallery({ only }: { only?: string }) {
  const names = only ? folderNames.filter((f) => f === only) : folderNames;
  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="body2" color="text.secondary">
        {images.length} images imported from tf-fox-ds-v1 · <code>src/assets/images</code>
      </Typography>
      {names.map((folder) => (
        <Box key={folder}>
          <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
            {folder} <Typography component="span" variant="caption" color="text.secondary">({groups[folder].length})</Typography>
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {groups[folder].map((img) => (
              <Thumb key={img.url} img={img} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

const meta = {
  title: 'Foundations/Images',
  component: Gallery,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Gallery>;
export default meta;
type Story = StoryObj<typeof meta>;

export const AllImages: Story = { name: 'All Images' };
export const Logos: Story = { args: { only: 'root' } };
export const Store: Story = { args: { only: 'store' } };
export const Sagamore: Story = { args: { only: 'sagamore' } };
export const KettleHills: Story = { args: { only: 'kettleHills' } };
export const Events: Story = { args: { only: 'events' } };
