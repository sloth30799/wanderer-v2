import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { NavLink } from "react-router-dom"

const styles = {
  activeNavbar: `no-underline text-purple`,
  inactiveNavbar: `no-underline text-black`,
}

type OneListProps = {
  text: string
  icon: React.ReactNode
  link: string
  sideBarOpen: boolean
}

const OneList = ({ text, icon, link, sideBarOpen }: OneListProps) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive ? styles.activeNavbar : styles.inactiveNavbar
      }
    >
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: sideBarOpen ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: sideBarOpen ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: sideBarOpen ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  )
}

export default OneList
