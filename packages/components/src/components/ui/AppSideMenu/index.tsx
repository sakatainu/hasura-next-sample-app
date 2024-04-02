import { DoubleArrowRounded as DoubleArrowRoundedIcon } from '@mui/icons-material';
import {
  Button,
  ButtonBaseProps,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  SvgIconProps,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useToggle } from 'react-use';
import AppHeaderPlaceHolder from '~/components/ui/AppHeaderPlaceHolder';
import Link from '~/components/ui/Link';
import Row from '~/components/ui/Row';
import { hideElement } from '~/utils/ui';

const defaultSidebarWidth = 80;
const expandSubMenuButtonWidth = 32;

export type AppMenuItem = {
  name: string;
  label?: React.ReactNode;
  Icon?: React.ElementType<SvgIconProps>;
  path?: string;
} & ButtonBaseProps<'div'>;

export type SubMenuProps = {
  width?: number;
};

export type AppSideMenuProps = {
  selectedMenu?: string;
  appMenu?: AppMenuItem[];
  subMenu?: React.ReactNode;
  subMenuWidth?: number;
  disabledHeaderMargin?: boolean;
};

const AppSideMenu = ({
  selectedMenu: selected,
  appMenu = [],
  subMenu = null,
  subMenuWidth: ownerSubMenuWidth = 0,
  disabledHeaderMargin = false,
}: AppSideMenuProps) => {
  const openSubMenu = Boolean(subMenu);
  const [toggleSideMenu, toggleOpenSideMenu] = useToggle(true);
  const subMenuWidth = openSubMenu ? ownerSubMenuWidth : 0;

  // TODO: ナビゲーションとサブメニューを分離する
  const sidebarWidth = useMemo(() => {
    if (!openSubMenu) return defaultSidebarWidth;
    const sidebarWithExpand = defaultSidebarWidth + expandSubMenuButtonWidth;

    if (toggleSideMenu) {
      return sidebarWithExpand + subMenuWidth;
    }
    return sidebarWithExpand;
  }, [openSubMenu, subMenuWidth, toggleSideMenu]);

  useEffect(() => {
    toggleOpenSideMenu(true);
  }, [selected, toggleOpenSideMenu]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        maxWidth: sidebarWidth,
        width: sidebarWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          maxWidth: sidebarWidth,
          width: sidebarWidth,
          boxSizing: 'content-box',
          backgroundColor: '#f0f8f9',
          color: '#3b3b3b',
          overflow: 'visible',
        },
      }}
    >
      {disabledHeaderMargin || <AppHeaderPlaceHolder />}
      <Row
        sx={{
          flex: 1,
          minHeight: 0,
          position: 'relative',
        }}
      >
        <List
          sx={{
            maxWidth: defaultSidebarWidth,
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 auto',
            gap: 1,
          }}
        >
          {appMenu.map(({ name, path, Icon, label, ...buttonProps }) => (
            <ListItem
              key={name}
              disablePadding
              sx={{
                position: 'relative',
                ...(selected === name && {
                  backgroundColor: ({ palette }) => palette.action.selected,
                  ...(selected.includes('ai') && {
                    background:
                      'linear-gradient(142deg, rgba(0, 219, 255, 0.30) 0%, rgba(204, 0, 255, 0.00) 126.98%)',
                  }),
                }),
                '::after': {
                  display: selected === name ? 'block' : 'none',
                  content: '""',
                  position: 'absolute',
                  width: 8,
                  height: 1,
                  backgroundColor: ({ palette }) => palette.primary.main,
                },
              }}
            >
              <ListItemButton
                {...buttonProps}
                {...(path && {
                  component: Link,
                  LinkComponent: Link,
                  href: path,
                })}
                sx={{
                  flexDirection: 'column',
                  // TODO: クエリとも比較する
                  // pointerEvents: selected === name ? 'none' : 'auto',
                }}
              >
                {!!Icon && (
                  <Icon
                    sx={{
                      fontSize: 36,
                    }}
                  />
                )}
                {label && (
                  <Typography
                    variant="caption"
                    fontSize={11}
                    textAlign="center"
                    mt="4px"
                  >
                    {label}
                  </Typography>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Row
          sx={{
            ...hideElement(!subMenu),
            position: 'relative',
            minWidth: 32,
            flex: 1,
            backgroundColor: 'white',
          }}
        >
          {toggleSideMenu && subMenu}
          <Button
            sx={{
              flexShrink: 0,
              width: expandSubMenuButtonWidth,
              minWidth: expandSubMenuButtonWidth,
              alignItems: 'start',
            }}
            onClick={() => toggleOpenSideMenu(!toggleSideMenu)}
          >
            <DoubleArrowRoundedIcon
              sx={{
                mt: 2,
                transform: toggleSideMenu ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </Button>
        </Row>
      </Row>
    </Drawer>
  );
};

export default AppSideMenu;
