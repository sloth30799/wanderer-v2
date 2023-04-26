import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { IconButton, Divider, FormControlLabel, Checkbox } from "@mui/material"
import GearDisplay from "../components/GearDisplay"
import DeleteIcon from "@mui/icons-material/Delete"
import Templates from "../components/TemplatesBox"
import LoadingCircle from "../components/utils/LoadingCircle"
import { GearType, TripType } from "../types"
import { timeFormat } from "../utils/formats"
import { dollarFormat } from "../utils/formats"
import { useDispatch } from "react-redux"
import { deleteBackpackingContent } from "../services/features/profile/profileSlice"
import {
  useCompletedTripMutation,
  useDeleteTripMutation,
  useFetchTripQuery,
} from "../api/tripApiSlice"
import { toast } from "react-hot-toast"

const styles = {
  timeText: `text-xs font-pally font-thin text-tealBlue`,
  incompleteTextColor: `text-purple`,
  completedTextColor: `text-brightGreen`,
}

const Trip = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading, isError, refetch } = useFetchTripQuery(id)
  const [completedTrip, { isSuccess: completedTripSuceess }] =
    useCompletedTripMutation()
  const [deleteTrip, { isSuccess: deleteSuccess }] = useDeleteTripMutation()

  const [gear, setGear] = useState<GearType>(data?.trip.gear)
  useEffect(() => {
    if (data !== null) setGear(data?.trip.gear)
  }, [data])

  if (isLoading) return <LoadingCircle progress={data} />
  else if (isError) return <h2>Trip not found!</h2>

  const trip: TripType = data.trip

  async function handleCompleted() {
    await completedTrip({
      id: trip._id,
      completed: trip.completed,
    })
    await refetch()
    if (completedTripSuceess) toast.success("Updated")
  }

  const handleDelete = async () => {
    await deleteTrip(trip._id) // api call
    dispatch(deleteBackpackingContent({ category: "trips", id: trip._id }))
    if (deleteSuccess) toast.success("Deleted")
    navigate(-1)
  }

  const chooseTemplate = (template: GearType) => {
    if (gear !== null)
      setGear((prevGear: GearType) => {
        return {
          ...prevGear,
          equipments: template.equipments || [],
          essentials: template.essentials || [],
          accessories: template.accessories || [],
        }
      })
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        <Link
          to="/profile/trip"
          relative="path"
          className="no-underline text-black"
        >
          &larr; <span>Back to Trips</span>
        </Link>
        <div className="flex flex-col">
          <h2 className="my-0">{trip.destination}</h2>
          <span className={styles.timeText}>
            {timeFormat(trip.startDate, "LL")} -{" "}
            {timeFormat(trip.endDate, "LL")}
          </span>
          <span
            className={`text-sm font-thin ${
              trip.completed
                ? styles.completedTextColor
                : styles.incompleteTextColor
            }`}
          >
            {trip.completed ? "Journey complete" : "Journey in progress"}
          </span>
        </div>
        <p className="text-lg tracking-wide my-3">
          <strong>Notes: </strong>
          {trip.note}
        </p>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <span className="font-medium">Budget</span>
            <span className="tracking-wide tracking-widest">
              {dollarFormat(trip.budget)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{trip.accommodations.name}</span>
            <span className="tracking-wide tracking-widest">
              {dollarFormat(trip.accommodations.cost)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{trip.transportation.name}</span>
            <span className="tracking-widest">
              {dollarFormat(trip.transportation.cost)}
            </span>
          </div>
          <Divider className="my-1" />
          <div className="flex justify-between">
            <span className="font-medium">Remaining</span>
            <span className="tracking-widest">
              {dollarFormat(
                trip.budget -
                  trip.accommodations.cost -
                  trip.transportation.cost
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <FormControlLabel
            control={<Checkbox />}
            label={"Completed"}
            onChange={handleCompleted}
            checked={trip.completed}
          />
          <IconButton
            aria-label="delete"
            className="place-self-end text-black"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col justify-between mt-3">
        <h3 className="text-center">Gear List</h3>
        <Templates chooseTemplate={chooseTemplate} />
        {gear && <GearDisplay gearData={gear} />}
      </div>
    </div>
  )
}

export default Trip
