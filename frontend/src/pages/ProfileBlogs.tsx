import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { CardActionArea, CardMedia, CardContent, Card } from "@mui/material"
import { selectBlogs } from "../../services/store"

const styles = {
  container: `container my-6 flex flex-wrap justify-center`,
  card: `max-w-sm m-3 rounded-lg`,
  img: `h-64`,
  postTitle: `font-medium font-pally`,
}

const ProfileBlogs = () => {
  const blogs = useSelector(selectBlogs)

  if (blogs === undefined) return null
  else if (blogs === null) return <h2>Data not found!</h2>

  if (blogs.length < 1) return <h2>Add A Blog!</h2>

  const blogsRender = blogs.map((post) => {
    return (
      <Link to={`/post/${post._id}`} key={post._id} className="no-underline">
        <Card className={styles.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              className={styles.img}
              image={post.image}
              alt={post.title}
            />
            <CardContent>
              <h3>{post.title}</h3>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    )
  })

  return <div className={styles.container}>{blogsRender}</div>
}

export default ProfileBlogs
