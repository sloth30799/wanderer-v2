import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material"
import LoadingCircle from "./utils/LoadingCircle"
import { addBackpackingContent } from "../services/features/profile/profileSlice"
import { GearType, MessagesType } from "../types"
import {
  useAddTemplateMutation,
  useFetchAllTemplatesQuery,
} from "../api/templateApiSlice"
import { toast } from "react-hot-toast"

const styles = {
  button: `bg-brightGreen rounded-lg`,
  templateBox: `flex flex-col md:h-96 md:flex-wrap gap-3`,
  card: `md:w-1/2 rounded-lg shadow-md text-black bg-whiteSmoke hover:bg-tealBlue hover:text-white`,
}

type TemplatesBoxProps = {
  chooseTemplate: (template: GearType) => void
}

const TemplatesBox = ({ chooseTemplate }: TemplatesBoxProps) => {
  const { data, isLoading, isError } = useFetchAllTemplatesQuery()

  const templates = data?.templates
  const [addTemplate, { isSuccess }] = useAddTemplateMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  async function addNewTemplate() {
    try {
      const { gear } = (await addTemplate().unwrap()) as {
        gear: GearType
        messages: MessagesType
      }
      if (gear) navigate(`/gear/${gear._id}`)
      dispatch(addBackpackingContent({ category: "gears", content: gear }))
      if (isSuccess) toast.success("Template Created!")
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (isLoading) return <LoadingCircle progress={templates} />

  if (isError) return <h1>Something went Wrong!</h1>

  const templateCards = templates.map((template: GearType) => {
    return (
      <Card
        className={styles.card}
        key={template._id}
        onClick={() => chooseTemplate(template)}
      >
        <CardActionArea>
          <CardContent className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h3 className="m-0 font-pally">{template.name}</h3>
              <p>By {template.createdBy}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <span>Equipments: {template.equipments.length}</span>
              <span>Essentials: {template.essentials.length}</span>
              <span>Accessories: {template.accessories.length}</span>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  })

  return (
    <main>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className={styles.button}
      >
        Templates
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"lg"}>
        <DialogTitle className="">
          Start with existing template or Make Your Own
        </DialogTitle>
        <DialogContent className="flex flex-col gap-3">
          <div className={styles.templateBox}>{templateCards}</div>
          <Button
            variant="contained"
            onClick={addNewTemplate}
            className="bg-tealBlue"
          >
            Make Your Own!
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default TemplatesBox
