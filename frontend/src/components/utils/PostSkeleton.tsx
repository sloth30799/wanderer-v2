import { Card, CardContent, CardHeader, Skeleton } from "@mui/material"

const PostSkeleton = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Skeleton
            animation="pulse"
            variant="circular"
            width={40}
            height={40}
          />
        }
        action={null}
        title={
          <Skeleton
            animation="pulse"
            height={20}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="pulse" height={20} width="40%" />}
      />
      <Skeleton sx={{ height: 190 }} animation="pulse" variant="rectangular" />

      <CardContent>
        <Skeleton animation="pulse" height={20} style={{ marginBottom: 6 }} />
        <Skeleton animation="pulse" height={20} width="80%" />
      </CardContent>
    </Card>
  )
}

export default PostSkeleton
