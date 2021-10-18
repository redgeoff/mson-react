// TODO:
//   - On mobile when using search bar, display title and search icon. When user clicks icon then
//     hides title and allows for search string to be entered.

import React, { Fragment } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import MuiToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from './icon';
import SearchBar from './search-bar';
import MuiSwitch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ResponsiveIconButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

function MenuButton(props) {
  const { responsive, onClick } = props;

  // TODO: instead, use the following after migrate to MUI 5:
  //   `<IconButton sx={responsive ? { display: { md: 'none' } } : null} />`
  const IButton = responsive ? ResponsiveIconButton : IconButton;

  return (
    <IButton color="inherit" aria-label="open drawer" onClick={onClick}>
      <Icon icon="Menu" />
    </IButton>
  );
}

function Title(props) {
  const { title } = props;
  return (
    <Typography variant="h6" color="inherit" noWrap>
      {title ? title : ''}
    </Typography>
  );
}

function ArchivedToggle(props) {
  const { showArchived, showArchivedToggle, onChange } = props;

  // A component must not switch from controlled to uncontrolled so we need to avoid setting
  // checked=undefined
  const showArchivedChecked = showArchived ? true : false;

  return (
    showArchivedToggle && (
      <Tooltip title={showArchived ? 'Show Active' : 'Show Deleted'}>
        <MuiSwitch onChange={onChange} checked={showArchivedChecked} />
      </Tooltip>
    )
  );
}

function MenuTitleArchived(props) {
  const {
    responsive,
    onMenuClick,
    title,
    showArchived,
    showArchivedToggle,
    onArchivedToggleChange,
  } = props;
  return (
    <Fragment>
      <MenuButton responsive={responsive} onClick={onMenuClick} />
      <Title title={title} />
      <ArchivedToggle
        showArchived={showArchived}
        showArchivedToggle={showArchivedToggle}
        onChange={onArchivedToggleChange}
      />
    </Fragment>
  );
}

const alignRight = {
  marginLeft: 'auto', // right align
};

const StyledSearchBar = styled(SearchBar)(alignRight);

function SearchBox(props) {
  const { fullWidth, showSearch, searchString, onChange, onSearch } = props;
  return (
    showSearch && (
      <StyledSearchBar
        fullWidth={fullWidth}
        searchString={searchString}
        onChange={onChange}
        onSearch={onSearch}
      />
    )
  );
}

const StyledIconButton = styled(IconButton)(alignRight);

function Toolbar(props) {
  const {
    onMobile,
    showSearchOnMobile,
    onToggleShowSearch,
    showSearch,
    searchString,
    onSearchChange,
    onSearch,
    onMenuClick,
    responsive,
    title,
    showArchived,
    showArchivedToggle,
    onArchivedToggleChange,
  } = props;

  if (onMobile) {
    if (showSearchOnMobile) {
      return (
        <Fragment>
          <IconButton
            color="inherit"
            aria-label="close search"
            onClick={onToggleShowSearch}
            size="large"
          >
            <Icon icon="ArrowBack" />
          </IconButton>
          <SearchBox
            fullWidth={true}
            showSearch={showSearch}
            searchString={searchString}
            onChange={onSearchChange}
            onSearch={onSearch}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <MenuTitleArchived
            responsive={responsive}
            onMenuClick={onMenuClick}
            title={title}
            showArchived={showArchived}
            showArchivedToggle={showArchivedToggle}
            onArchivedToggleChange={onArchivedToggleChange}
          />
          {showSearch && (
            <StyledIconButton
              color="inherit"
              aria-label="toggle search"
              onClick={onToggleShowSearch}
            >
              <Icon icon="Search" />
            </StyledIconButton>
          )}
        </Fragment>
      );
    }
  } else {
    return (
      <Fragment>
        <MenuTitleArchived
          responsive={responsive}
          onMenuClick={onMenuClick}
          title={title}
          showArchived={showArchived}
          showArchivedToggle={showArchivedToggle}
          onArchivedToggleChange={onArchivedToggleChange}
        />
        <SearchBox
          fullWidth={false}
          showSearch={showSearch}
          searchString={searchString}
          onChange={onSearchChange}
          onSearch={onSearch}
        />
      </Fragment>
    );
  }
}

export const DRAWER_WIDTH = 240;

// This is needed or else a "responsive" prop is passed to MuiAppBar, causing the error "Received
// `true` for a non-boolean attribute `responsive`"
const ResponsiveMuiAppBar = ({ responsive, ...otherProps }) => (
  <MuiAppBar {...otherProps} />
);

const StyledMuiAppBar = styled(ResponsiveMuiAppBar)(
  ({ theme, responsive }) => ({
    position: 'fixed',
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.up('md')]: responsive && {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
  })
);

export default function AppBar(props) {
  const {
    showSearchOnMobile,
    searchString,
    showSearch,
    showArchived,
    showArchivedToggle,
    title,
    onToggleShowSearch,
    onSearchChange,
    onSearch,
    onMenuClick,
    responsive,
    onArchivedToggleChange,
  } = props;

  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledMuiAppBar
      elevation={1} // tone down the elevation
      responsive={responsive}
    >
      <MuiToolbar>
        <Toolbar
          onMobile={onMobile}
          showSearchOnMobile={showSearchOnMobile}
          onToggleShowSearch={onToggleShowSearch}
          showSearch={showSearch}
          searchString={searchString}
          onSearchChange={onSearchChange}
          onSearch={onSearch}
          onMenuClick={onMenuClick}
          responsive={responsive}
          title={title}
          showArchived={showArchived}
          showArchivedToggle={showArchivedToggle}
          onArchivedToggleChange={onArchivedToggleChange}
        />
      </MuiToolbar>
    </StyledMuiAppBar>
  );
}
