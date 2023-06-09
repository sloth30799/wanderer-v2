import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Login, { action as loginAction } from "./pages/Login"
import Signup, { action as signupAction } from "./pages/Signup"
import Feed, { loader as feedLoader } from "./pages/Feed"
import ErrorPage from "./pages/ErrorPage"
import HomePage from "./pages/HomePage"
import Logout from "./pages/Logout"
import AuthRequired from "./components/AuthRequired"
import SideBar from "./components/sidebar/SideBar"
import Profile from "./pages/Profile"
import ProfileTrips from "./pages/ProfileTrips"
import ProfileGears from "./pages/ProfileGears"
import ProfileBlogs from "./pages/ProfileBlogs"
import Explore from "./pages/Explore"
import Favorite from "./pages/Favorite"
import Trip from "./pages/Trip"
import Gear from "./pages/Gear"
import Blog from "./pages/Blog"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="signup" element={<Signup />} action={signupAction} />
      <Route path="logout" element={<Logout />} />

      <Route element={<AuthRequired />}>
        <Route element={<SideBar />}>
          <Route path="profile" element={<Profile />}>
            <Route path="trip" element={<ProfileTrips />} />
            <Route path="gear" element={<ProfileGears />} />
            <Route path="post" element={<ProfileBlogs />} />
          </Route>
          <Route path="feed" element={<Feed />} loader={feedLoader} />
          <Route path="explore" element={<Explore />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="trip/:id" element={<Trip />} />
          <Route path="gear/:id" element={<Gear />} />
          <Route path="post/:id" element={<Blog />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
