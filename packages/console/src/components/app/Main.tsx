import NiceModal from '@ebay/nice-modal-react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import '@fontsource/josefin-sans';
import '@fontsource/roboto';
import {
  Inbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  GlobalStyles,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { SnackbarProvider } from 'notistack';
import { RecoilRoot } from 'recoil';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from '~/components/app/AppFooter';
import { globalStyles, theme } from '~/configs';
import HistoryProvider from '~/contexts/HistoryContext';
import ClientProvider from '~/contexts/client';

export type MainProps = {
  children: JSX.Element;
  emotionCache: EmotionCache;
};
const drawerWidth = 240;

const Main = ({ children, emotionCache }: MainProps) => (
  <HistoryProvider>
    <RecoilRoot>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <ClientProvider>
            <NiceModal.Provider>
              <ModalProvider>
                <SnackbarProvider
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <AppBar
                    position="static"
                    sx={{
                      width: `calc(100% - ${drawerWidth}px)`,
                      ml: `${drawerWidth}px`,
                    }}
                  >
                    <Toolbar>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                      >
                        News
                      </Typography>
                      <Button color="inherit">Login</Button>
                    </Toolbar>
                  </AppBar>
                  <Drawer
                    sx={{
                      width: drawerWidth,
                      flexShrink: 0,
                      '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                      },
                    }}
                    variant="permanent"
                    anchor="left"
                  >
                    <Toolbar />
                    <Divider />
                    <List>
                      {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                        (text, index) => (
                          <ListItem key={text} disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                              </ListItemIcon>
                              <ListItemText primary={text} />
                            </ListItemButton>
                          </ListItem>
                        )
                      )}
                    </List>
                    <Divider />
                    <List>
                      {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Drawer>
                  <Box
                    component="main"
                    sx={{ flex: 1, ml: `${drawerWidth}px` }}
                  >
                    {children}
                  </Box>
                </SnackbarProvider>
              </ModalProvider>
            </NiceModal.Provider>
          </ClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </RecoilRoot>
  </HistoryProvider>
);

export default Main;
