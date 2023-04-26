import s1 from "../../assets/s1.svg"
import s2 from "../../assets/s2.svg"
import s3 from "../../assets/s3.svg"

const featuresData = [
  {
    title: "Easily plan your journey with existing templates",
    body: "Are you ready to embark on your next backpacking adventure, but not sure where to start? Our backpacker app makes it easy to plan your journey with existing templates.",
    image: s1,
  },
  {
    title: "Stay focused on the adventure",
    body: "When you're out on the road, the last thing you want to worry about is keeping track of your items and budget. With our backpacker app, you can stay focused on the adventure and let us handle the tracking for you.",
    image: s2,
  },
  {
    title: "Everything you need in one place",
    body: "Stop jumping from one service to another, research and share your experiences and connect with others. Plan your group trips in one place with everyone involved.",
    image: s3,
  },
]

type CardProps = {
  title: string
  body: string
  image: string
}

const Card = ({ title, body, image }: CardProps) => {
  return (
    <div className="w-60 p-5 shadow-3xl rounded-lg bg-white">
      <div className="h-1/4 mb-6">
        <h5 className="font-title font-bold text-goldenYellow">{title}</h5>
        <p className="text-xs">{body}</p>
      </div>
      <img src={image} alt="" className="w-full h-3/4 pointer-events-none" />
    </div>
  )
}

const Features = () => {
  return (
    <main
      id="features"
      className="text-center py-12 bg-whiteSmoke rounded-bl-xl"
    >
      <span className="text-xs text-brightOrange tracking-tight">
        OUR POPULAR SERVICES
      </span>
      <h3 className="font-title text-2xl">
        Create Unforgettable Travel Experiences
      </h3>
      <div className="w-1/5 m-auto mb-6 border-solid border-0 border-b-4 border-brightOrange"></div>
      <div className="container grid grid-rows gap-6 justify-items-center lg:grid-cols-3">
        {featuresData.map((feature) => (
          <Card
            key={feature.title}
            title={feature.title}
            body={feature.body}
            image={feature.image}
          />
        ))}
      </div>
    </main>
  )
}

export default Features
