import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Input,
  InputAdornment,
  OutlinedInput,
  FormLabel,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
} from "@mui/material"
import BackpackOutlinedIcon from "@mui/icons-material/BackpackOutlined"
import { useDispatch } from "react-redux"
import { addBackpackingContent } from "../../services/features/profile/profileSlice"
import { useAddTripMutation } from "../../api/tripApiSlice"

const styles = {
  formLabel: `font-medium text-purple`,
  costLabel: `font-span text-black`,
}

type AddTripProps = {
  sideBarOpen: boolean
}

const AddTrip = ({ sideBarOpen }: AddTripProps) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [createTrip] = useAddTripMutation()

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  // fix error version
  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   const formData = new FormData(form);
  //   const searchParams = new URLSearchParams();
  //   for (const [key, value] of formData.entries()) {
  //     searchParams.append(key, value as string);
  //   }

  //   try {
  //     const { trip } = await createTrip(searchParams);
  //     if (trip) navigate(`/trip/${trip._id}`);
  //     setOpen(false);
  //     dispatch({
  //       type: "UPDATE_BACKPACKER",
  //       dataType: "trips",
  //       data: trip,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function addTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const formData = new URLSearchParams(data as any)

    try {
      const data: any = await createTrip(formData)
      const trip = data.trip
      setOpen(false)
      dispatch(addBackpackingContent({ category: "trips", content: trip }))
      navigate(`/trip/${trip._id}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: sideBarOpen ? "initial" : "center",
            px: 2.5,
          }}
          onClick={handleOpen}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: sideBarOpen ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <BackpackOutlinedIcon className="text-black" />
          </ListItemIcon>
          <ListItemText
            primary={"Start an adventure!"}
            sx={{ opacity: sideBarOpen ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle className="text-purple">Adventure awaits</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A brief overview of the itinerary for the trip
          </DialogContentText>
          <form
            method="POST"
            onSubmit={addTrip}
            className="flex flex-col gap-3 p-1"
          >
            <TextField
              variant="standard"
              id="destination"
              name="destination"
              label="Destination"
              required
            />
            <FormLabel
              htmlFor="outlined-adornment-amount"
              className={styles.formLabel}
            >
              Start Date
            </FormLabel>
            <OutlinedInput
              type="date"
              id="startDate"
              name="startDate"
              label="Start Date"
              required
            />
            <FormLabel
              htmlFor="outlined-adornment-amount"
              className={styles.formLabel}
            >
              End Date
            </FormLabel>
            <OutlinedInput
              type="date"
              id="endDate"
              name="endDate"
              label="End Date"
              required
            />
            <FormLabel
              htmlFor="outlined-adornment-amount"
              className={styles.formLabel}
            >
              Budget
            </FormLabel>
            <OutlinedInput
              type="number"
              id="budget"
              name="budget"
              label="Amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
            <FormLabel className={styles.formLabel}>Accommodations</FormLabel>
            <TextField
              variant="standard"
              id="name"
              name="accommodationName"
              label="Name"
              fullWidth
            />
            <FormLabel
              htmlFor="outlined-adornment-amount"
              className={styles.costLabel}
            >
              Cost
            </FormLabel>
            <Input
              type="number"
              id="cost"
              name="accommodationCost"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              fullWidth
            />

            <FormLabel className={styles.formLabel}>Transportation</FormLabel>
            <TextField
              variant="standard"
              id="name"
              name="transportationName"
              label="Name"
              fullWidth
            />
            <FormLabel
              htmlFor="outlined-adornment-amount"
              className={styles.costLabel}
            >
              Cost
            </FormLabel>
            <Input
              type="number"
              id="cost"
              name="transportationCost"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              fullWidth
            />
            <TextField
              id="note"
              name="note"
              label="Add some notes"
              multiline
              rows={4}
            />
            <DialogActions className="mt-3">
              <Button
                variant="outlined"
                className="text-purple border-purple"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                className="text-purple border-purple"
                type="submit"
              >
                Explore further
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddTrip
