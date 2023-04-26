import { CircularProgress } from "@mui/material"

const LoadingCircle = ({ progress }: any) => {
  return (
    <div className="flex items-center justify-center h-full">
      <CircularProgress variant="determinate" value={progress} />
    </div>
  )
}

export default LoadingCircle
