import { CardActionArea, CardActions, CardContent, Card } from "@mui/material"
import { Link } from "react-router-dom"
import { timeFormat } from "../../utils/formats"
import { useSelector } from "react-redux"
import { selectTrips } from "../../services/store"

const styles = {
  container: `container my-6 m-auto flex flex-wrap justify-center gap-6`,
  card: `w-60 bg-purple rounded-lg shadow-lg text-whiteSmoke hover:bg-palePurple`,
  timeText: `text-xs font-pally text-tealBlue`,
  completedText: `text-sm text-brightGreen`,
  inCompletedText: `text-sm text-goldenYellow`,
}

const ProfileTrips = () => {
  const trips = useSelector(selectTrips)

  if (trips === undefined) return null
  else if (trips === null) return <h2>Data not found!</h2>

  if (trips.length < 1) return <h2>Start an adventure!</h2>

  const tripsRender = trips.map((trip) => {
    return (
      <Link to={`/trip/${trip._id}`} key={trip._id} className="no-underline">
        <Card className={styles.card}>
          <CardActionArea>
            <CardContent className="flex flex-col gap-6">
              <h2 className="my-0 font-pally">{trip.destination}</h2>
              <span className={styles.timeText}>
                {timeFormat(trip.startDate, "LL")} -{" "}
                {timeFormat(trip.endDate, "LL")}
              </span>
            </CardContent>
          </CardActionArea>
          <CardActions className="flex justify-between p-3">
            <span
              className={
                trip.completed ? styles.completedText : styles.inCompletedText
              }
            >
              {trip.completed ? "Journey complete" : "Journey in progress"}
            </span>
          </CardActions>
        </Card>
      </Link>
    )
  })

  return <main className={styles.container}>{tripsRender}</main>
}

export default ProfileTrips
