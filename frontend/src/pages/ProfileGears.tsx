import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectGears } from "../services/store"
import { GearType } from "../types"

const styles = {
  container: `container my-6 m-auto flex flex-col justify-center`,
  row: `flex space-between text-whit border-solid border-0 border-b border-black text-purple hover:bg-whiteSmoke`,
  name: `w-1/2 md:w-1/4 text-center m-0 p-1 font-bold`,
  mobileColumn: `w-1/2 text-center m-0 p-1 md:hidden`,
  column: `hidden w-1/2 text-center m-0 p-1 md:w-1/4 md:block`,
}

const ProfileGears = () => {
  const gears: GearType[] = useSelector(selectGears)

  if (gears === undefined) return null
  else if (gears === null) return <h2>Make Your Own Gear List!</h2>

  const gearsRender = gears.map((gear: GearType) => {
    return (
      <Link to={`/gear/${gear._id}`} key={gear._id} className="no-underline">
        <div className={styles.row}>
          <p className={styles.name}>{gear.name}</p>
          <p className={styles.mobileColumn}>
            {gear.equipments.length +
              gear.essentials.length +
              gear.accessories.length}
          </p>
          <p className={styles.column}>{gear.equipments.length}</p>
          <p className={styles.column}>{gear.essentials.length}</p>
          <p className={styles.column}>{gear.accessories.length}</p>
        </div>
      </Link>
    )
  })

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <p className={styles.name}></p>
        <p className={styles.mobileColumn}>Gears</p>
        <p className={styles.column}>Equipments</p>
        <p className={styles.column}>Essentials</p>
        <p className={styles.column}>Accessories</p>
      </div>
      {gearsRender}
    </div>
  )
}

export default ProfileGears
