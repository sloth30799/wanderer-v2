import { NavLink, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../services/store"
import { useFetchProfileQuery } from "../api/mainApiSlice"

const styles = {
  navBar: `flex gap-6`,
  navLink: `no-underline text-purple`,
  activeLink: `no-underline font-bold text-purple`,
}

const Profile = () => {
  const user = useSelector(selectCurrentUser)
  const { isLoading } = useFetchProfileQuery()

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      <div>
        <h2>Welcome back {user!.userName}!</h2>
        <nav className={styles.navBar}>
          <NavLink
            to="trip"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Trips
          </NavLink>
          <NavLink
            to="gear"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Gears
          </NavLink>
          <NavLink
            to="post"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Blogs
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}

export default Profile
