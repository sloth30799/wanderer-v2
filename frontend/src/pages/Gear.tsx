import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  TextField,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import GearDisplay from "../components/GearDisplay"
import LoadingCircle from "../components/utils/LoadingCircle"
import { useDispatch } from "react-redux"
import { deleteBackpackingContent } from "../services/features/profile/profileSlice"
import { useFetchGearQuery } from "../api/gearApiSlice"
import { useDeleteTemplateMutation } from "../api/templateApiSlice"

const Gear = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading, isError } = useFetchGearQuery(id)
  const [deleteGear] = useDeleteTemplateMutation()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (isLoading) return <LoadingCircle progress={data} />
  else if (isError) return <h2>Gear not found!</h2>

  const gear = data.gear

  // async function editName(event) {
  // 	event.preventDefault();
  // 	const name = await event.target.name.value;
  // 	setGear({
  //     ...gear,
  // 		name,
  // 	});
  // };

  // async function editNote(e) {
  //   e.preventDefault()
  //   const note = await e.target.note.value;
  //   setGear({
  //     ...gear,
  // 		 note,
  // 	});
  // }

  async function handleDelete() {
    await deleteGear(gear._id) // api call
    dispatch(deleteBackpackingContent({ category: "gears", id: gear._id }))
    navigate(-1)
  }

  return (
    <div className="container m-auto flex flex-col">
      <Link
        to="/profile/gear"
        relative="path"
        className="no-underline text-black"
      >
        &larr; <span>Back to Gears</span>
      </Link>
      <div className="flex flex-col items-center tracking-wide">
        <h1>{gear.name}</h1>
        <p>{gear.note}</p>
        <span>Created By {gear.createdBy}</span>
      </div>
      <div className="flex justify-end">
        <IconButton
          className="text-black"
          aria-label="edit"
          onClick={handleClickOpen}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          className="text-black"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>After editing, click save.</DialogTitle>
          <DialogContent>
            <form className="flex flex-col gap-3 p-1">
              <TextField variant="standard" label="Name" name="name" />
              <TextField
                variant="standard"
                label="Description"
                name="note"
                multiline
                rows={4}
              />
              <Button type="submit" variant="outlined" className="text-teal">
                Add
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <GearDisplay gearData={gear} />
    </div>
  )
}

export default Gear
