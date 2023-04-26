import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../api/authApiSlice"
import { logOutUser } from "../services/features/auth/authSlice"
import { useDispatch } from "react-redux"
import { toast } from "react-hot-toast"

// const msg = {
//   success: [
//     {
//       msg: "Successful Logout.",
//     },
//   ],
// }

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [postLogout] = useLogoutMutation()

  async function logout() {
    try {
      await postLogout().unwrap()
      dispatch(logOutUser({}))
      navigate("/")

      toast.success("Sad to see you go.")
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <main className="container m-6 m-auto">
      <p>Logging out...</p>
    </main>
  )
}

export default Logout
