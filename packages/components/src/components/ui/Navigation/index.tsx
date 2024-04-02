import {
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import { useLocation } from 'react-use';

export type NavigateItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

export type NavigationProps = {
  items?: NavigateItem[];
};

const Navigation = ({ items = [] }: NavigationProps): JSX.Element => {
  const { pathname = '' } = useLocation();

  return (
    <Box component="nav">
      <List sx={{ width: 200 }}>
        {items.map((v) => (
          <ListItemButton
            key={v.path}
            component={Link}
            LinkComponent={Link}
            href={v.path}
            selected={pathname.startsWith(v.path)}
            sx={{
              // mb: 1,
              position: 'relative',
              '&.Mui-selected::after': {
                display: 'block',
                content: '""',
                position: 'absolute',
                width: 4,
                height: 1,
                left: 0,
                backgroundColor: 'primary.main',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
              }}
            >
              {v.icon}
            </ListItemIcon>
            <ListItemText primary={v.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Navigation;
