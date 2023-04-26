export interface UserType {
  _id: string
  userName: string
  email: string
  password: string
}

export interface BlogType {
  _id: string
  title: string
  image: string
  cloudinaryId: string
  caption: string
  likes: number
  user: UserType
  createdAt: string
}

export interface TripType {
  _id: string
  user: UserType
  destination: string
  startDate: string
  endDate: string
  budget: number
  accommodations: AccommodationsType
  transportation: TransportationType
  note: string
  gear: GearType
  completed: boolean
  createdAt: string
  __v: number
}

export interface AccommodationsType {
  name: string
  cost: number
  _id: string
}

export interface TransportationType {
  name: string
  cost: number
  _id: string
}

export interface ItemType {
  name: string
  completed: boolean
  _id: string
}

export interface GearType {
  _id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  template: boolean
  essentials: ItemType[]
  accessories: ItemType[]
  equipments: ItemType[]
  user: UserType
  name: string
  note: string
}

export type GearCategory = "essentials" | "accessories" | "equipments"

export interface BackpackingData {
  trips: TripType[]
  gears: GearType[]
  blogs: BlogType[]
}

export type BackpackingCategory = "gears" | "blogs" | "trips"

export type BackpackingContentList = Array<GearType | BlogType | TripType>

export type BackpackingContent = GearType | BlogType | TripType

export interface Message {
  msg: string
}

export interface MessagesType {
  success?: Message[]
  info?: Message[]
  errors?: Message[]
}

export type OutletContextProps = {
  displayMessage: (messages: MessagesType) => void
}
