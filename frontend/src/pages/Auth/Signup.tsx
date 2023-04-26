import { useEffect } from "react"
import {
  ActionFunctionArgs,
  Form,
  useActionData,
  useNavigate,
} from "react-router-dom"
import { Button, FormControl, InputAdornment, TextField } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import KeyIcon from "@mui/icons-material/Key"
import PersonPinIcon from "@mui/icons-material/PersonPin"
import { useDispatch } from "react-redux"
import { useSignupMutation } from "../../api/authApiSlice"
import { setUser } from "../../services/features/auth/authSlice"
import { toast } from "react-hot-toast"

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const credentials = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }

  return credentials
}

const Signup = () => {
  const credentials = useActionData()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [postSignup, { isLoading, isSuccess, isError }] = useSignupMutation()

  async function signup() {
    try {
      const data = await postSignup(credentials).unwrap()
      const { user, messages } = data

      if (isError) {
        toast.error("Network Error")
      }

      if (isSuccess) {
        if (messages.errors) {
          messages.errors.map((message: any) => {
            return toast.error(message.msg)
          })
        } else {
          toast.success("Sign up Successful!")
          dispatch(setUser({ user }))
          navigate("/profile")
        }
      }
      console.log(messages)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (credentials !== null) signup()
  }, [credentials])

  return (
    <main className="h-screen flex justify-center items-center bg-whiteSmoke">
      <div className="mx-6 p-6 shadow-md rounded-lg bg-white md:mx-0 md:w-1/2 md:p-12">
        <Form action="/signup" method="post">
          <FormControl className="flex flex-col gap-3 mb-6">
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonPinIcon className="text-goldenYellow" />
                  </InputAdornment>
                ),
              }}
              label="Username"
              name="userName"
            />
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon className="text-goldenYellow" />
                  </InputAdornment>
                ),
              }}
              name="email"
              type="email"
              label="Email address"
            />
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon className="text-goldenYellow" />
                  </InputAdornment>
                ),
              }}
              name="password"
              type="password"
              label="Password"
            />
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon className="text-goldenYellow" />
                  </InputAdornment>
                ),
              }}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />
            <Button
              variant="contained"
              type="submit"
              className=" w-full m-auto bg-goldenYellow"
              disabled={isLoading}
            >
              {isLoading ? "Creating New Account" : "Sign Up"}
            </Button>
          </FormControl>
        </Form>
      </div>
    </main>
  )
}

export default Signup
