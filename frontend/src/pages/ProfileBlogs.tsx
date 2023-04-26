import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { CardActionArea, CardMedia, CardContent, Card } from "@mui/material"
import { BlogType } from "../types"
import { selectBlogs } from "../services/store"

const styles = {
  container: `container my-6 flex flex-wrap justify-center`,
  card: `max-w-sm m-3 rounded-lg`,
  img: `h-64`,
  postTitle: `font-medium font-pally`,
}

const ProfileBlogs = () => {
  const blogs: BlogType[] = useSelector(selectBlogs)

  if (blogs === undefined) return null
  else if (blogs === null) return <h2>Share Your Experience with others!</h2>

  const blogsRender = blogs?.map((blog: BlogType) => {
    return (
      <Link to={`/post/${blog._id}`} key={blog._id} className="no-underline">
        <Card className={styles.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              className={styles.img}
              image={blog.image}
              alt={blog.title}
            />
            <CardContent>
              <h3>{blog.title}</h3>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    )
  })

  return <div className={styles.container}>{blogsRender}</div>
}

export default ProfileBlogs
