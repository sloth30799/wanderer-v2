import { Link } from "react-router-dom"
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"

type LogoutBtnProps = {
  sideBarOpen: boolean
}

const LogoutBtn = ({ sideBarOpen }: LogoutBtnProps) => {
  return (
    <Link to="/logout" className="no-underline text-scarletRed">
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
            <LogoutOutlinedIcon className="text-scarletRed" />
          </ListItemIcon>
          <ListItemText
            primary={"Log Out"}
            sx={{ opacity: sideBarOpen ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}

export default LogoutBtn
