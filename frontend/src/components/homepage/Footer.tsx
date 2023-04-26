import { Button, Input } from "@mui/material"
import { Link } from "react-router-dom"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EmailIcon from "@mui/icons-material/Email"

const styles = {
  bold: `font-title font-extrabold text-xl my-3 uppercase`,
  linkWithIcon: `text-xs font-bold text-white hover:text-goldenOrange no-underline flex items-center justify-center md:justify-start gap-1 mb-1`,
  normal: `text-xs font-whiteSmoke my-0`,
  link: `text-xs text-white hover:text-goldenOrange no-underline`,
}

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container grid text-center md:text-left md:grid-cols-4 md:gap-8">
        <div className="flex flex-col gap-3">
          <h6 className={styles.bold}>Wanderer</h6>
          <p className="text-xs font-whiteSmoke my-0 brightness-50">
            We believe that the journey is just as important as the destination.
          </p>
          <Link to="/" className={styles.linkWithIcon}>
            <LocalPhoneIcon style={{ fontSize: "1rem" }} /> (123) -456-789
          </Link>
          <Link to="/" className={styles.linkWithIcon}>
            <EmailIcon style={{ fontSize: "1rem" }} /> wanderer@gmail.com
          </Link>
          <span className="text-[0.6rem] font-light tracking-tight brightness-90">
            Design by Han Ye Htun
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <h6 className={styles.bold}>Company</h6>
          <Link to="/" className={styles.link}>
            Store
          </Link>
          <Link to="/" className={styles.link}>
            Blog
          </Link>
          <Link to="/" className={styles.link}>
            What we do
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <h6 className={styles.bold}>Working Hours</h6>
          <p className={styles.normal}>Mon - Fri: 9:00AM - 9:00PM</p>
          <p className={styles.normal}>Sat: 9:00AM - 19:00PM</p>
          <p className={styles.normal}>Sun: Closed</p>
        </div>
        <div className="flex flex-col gap-3">
          <h6 className={styles.bold}>Subscription</h6>
          <p className={styles.normal}>
            Subscribe your Email address for latest news & updates.
          </p>
          <Input
            placeholder="Enter Email Address"
            className="text-[0.65rem] font-black bg-gray-200 py-2 px-4"
          />
          <Button variant="contained" className="w-full py-2 font-bold">
            Submit
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
