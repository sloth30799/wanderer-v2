import { useState } from "react"
import { Outlet } from "react-router-dom"
import MuiDrawer from "@mui/material/Drawer"
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { Box, Toolbar, List, Divider, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined"
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined"
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import OneList from "./OneList"
import AddTrip from "./AddTrip"
import AddGear from "./AddGear"
import AddBlog from "./AddBlog"
import LogoutBtn from "./LogoutBtn"

const styles = {
  logo: `text-xl font-extrabold tracking-tighter text-black cursor-default`,
  drawerLogo: `text-xl font-extrabold tracking-tighter text-black cursor-default`,
  activeNavbar: `no-underline text-purple`,
  inactiveNavbar: `no-underline text-black`,
  logoutBtn: `text-scarletRed border-scarletRed rounded-lg`,
}

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

export default function SideBar() {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const renderLinks = [
    {
      text: "Profile",
      icon: <FolderSharedOutlinedIcon className="text-black" />,
      link: "profile",
    },
    {
      text: "Feed",
      icon: <FeedOutlinedIcon className="text-black" />,
      link: "feed",
    },
    {
      text: "Explore",
      icon: <TravelExploreOutlinedIcon className="text-black" />,
      link: "explore",
    },
    {
      text: "Favorite",
      icon: <FavoriteBorderOutlinedIcon className="text-black" />,
      link: "favorite",
    },
  ].map((list) => (
    <OneList
      key={list.text}
      text={list.text}
      icon={list.icon}
      link={list.link}
      sideBarOpen={open}
    />
  ))

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar className="bg-white">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon className="text-black" />
          </IconButton>
          <span className={open ? "hidden" : `${styles.logo}`}>#Wanderer</span>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <span className={open ? `${styles.drawerLogo}` : "hidden"}>
            #WANDERER
          </span>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{renderLinks}</List>
        <Divider />
        <List>
          <AddTrip sideBarOpen={open} />
          <AddGear sideBarOpen={open} />
          <AddBlog sideBarOpen={open} />
        </List>
        <Divider />
        <LogoutBtn sideBarOpen={open} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
}
