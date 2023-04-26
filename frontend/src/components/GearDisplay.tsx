import { useState, FormEvent, SyntheticEvent } from "react"
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
} from "@mui/material"
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { useEffect } from "react"
import { GearCategory, GearType, ItemType } from "../types"
import { useUpdateGearMutation } from "../api/gearApiSlice"
import { toast } from "react-hot-toast"

type OneItemProps = {
  item: ItemType
  category: GearCategory
  checkGear: (
    e: SyntheticEvent<Element, Event>,
    category: GearCategory,
    id: string
  ) => void
  removeGear: (category: GearCategory, id: string) => void
}

type AddItemProps = {
  category: GearCategory
  addGear: (e: FormEvent<HTMLFormElement>) => void
}

type GearDisplayProps = {
  gearData: GearType
}

const styles = {
  listsBox: `flex flex-col items-center rounded-lg p-3 gap-3 md:shadow-xl md:border-2 md:border-solid md:border-black md:w-1/3`,
  listTitle: `text-tealBlue`,
}

const OneItem = ({ item, category, checkGear, removeGear }: OneItemProps) => {
  const { name, completed } = item

  return (
    <FormGroup className="flex w-full flex-row justify-between">
      <FormControlLabel
        control={<Checkbox color="secondary" />}
        label={name}
        onChange={(e: SyntheticEvent<Element, Event>) =>
          checkGear(e, category, item._id)
        }
        checked={completed}
      />
      <IconButton
        onClick={() => removeGear(category, item._id)}
        aria-label="delete"
        color="inherit"
        size="small"
      >
        <RemoveCircleOutlineIcon className="text-sm" />
      </IconButton>
    </FormGroup>
  )
}

const AddItem = ({ category, addGear }: AddItemProps) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <main>
      <Button
        variant="outlined"
        className="text-brightGreen border-brightGreen"
        onClick={handleClickOpen}
      >
        Add {category}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add {category}</DialogTitle>
        <DialogContent>
          <form onSubmit={addGear} className="flex flex-col gap-3 p-1">
            <TextField variant="standard" label="Gear" name={`${category}`} />
            <Button
              variant="outlined"
              className="text-brightGreen border-brightGreen"
              type="submit"
            >
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}

const GearDisplay = ({ gearData }: GearDisplayProps) => {
  const [gear, setGear] = useState(gearData)
  const { equipments, accessories, essentials } = gear
  const [updateGearList, { isLoading, isSuccess }] = useUpdateGearMutation()

  useEffect(() => {
    setGear(gearData)
  }, [gearData])

  // actions
  function addGear(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const category = formData.get("category") as GearCategory
    const item = formData.get("item") as string
    const itemList = gear[category]

    setGear((prevGear) => {
      return {
        ...prevGear,
        [category]: [
          ...itemList,
          {
            name: item,
            completed: false,
          },
        ],
      }
    })
  }

  function checkGear(
    e: SyntheticEvent<Element, Event>,
    category: GearCategory,
    id: string
  ) {
    const checkbox = e.target as HTMLInputElement
    const itemStatus = checkbox.checked
    const itemList = gear[category]

    const newList = itemList.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          completed: itemStatus,
        }
      }
      return item
    })

    setGear((prevGear) => {
      return { ...prevGear, [category]: newList }
    })
  }

  function removeGear(category: GearCategory, id: string) {
    const itemList = gear[category]

    const filteredList = itemList.filter((item: ItemType) => item._id !== id)

    setGear((prevGear) => {
      return {
        ...prevGear,
        [category]: filteredList,
      }
    })
  }

  function resetGear() {
    setGear((prevGear) => {
      return {
        ...prevGear,
        equipments: [],
        essentials: [],
        accessories: [],
      }
    })
  }

  async function updateGear() {
    await updateGearList({ id: gear._id, gear: gear })
    if (isLoading) toast.loading("Updating")
    if (isSuccess) toast.success("Updated!")
  }

  const equipmentsLists = equipments.map((item) => {
    return (
      <OneItem
        key={item.name}
        item={item}
        category={"equipments"}
        checkGear={checkGear}
        removeGear={removeGear}
      />
    )
  })

  const accessoriesLists = accessories.map((item) => {
    return (
      <OneItem
        key={item.name}
        item={item}
        category={"accessories"}
        checkGear={checkGear}
        removeGear={removeGear}
      />
    )
  })

  const essentialsLists = essentials.map((item) => {
    return (
      <OneItem
        key={item.name}
        item={item}
        category={"essentials"}
        checkGear={checkGear}
        removeGear={removeGear}
      />
    )
  })

  return (
    <main className="flex flex-col gap-3 mt-6 m-auto">
      <div className="flex flex-col md:flex-row gap-3">
        <div className={styles.listsBox}>
          <h2 className={styles.listTitle}>Equipments</h2>
          {equipmentsLists}
          <AddItem category={"equipments"} addGear={addGear} />
        </div>
        <div className={styles.listsBox}>
          <h2 className={styles.listTitle}>Accessories</h2>
          {accessoriesLists}
          <AddItem category={"accessories"} addGear={addGear} />
        </div>
        <div className={styles.listsBox}>
          <h2 className={styles.listTitle}>Essentials</h2>
          {essentialsLists}
          <AddItem category={"essentials"} addGear={addGear} />
        </div>
      </div>
      <div className="flex flex-row gap-3 place-self-end mr-6">
        <Button
          variant="text"
          startIcon={<SettingsBackupRestoreIcon />}
          color="error"
          className="hover:bg-scarletRed hover:text-white"
          onClick={resetGear}
        >
          Reset
        </Button>
        <Button variant="contained" color="success" onClick={updateGear}>
          Save
        </Button>
      </div>
    </main>
  )
}

export default GearDisplay
