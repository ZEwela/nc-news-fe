import { useContext } from "react"
import { UserContext } from "../context/User"


export default function MyProfile() {
    const {user} = useContext(UserContext)
  return (
    <div>Hello {user.username}</div>
  )
}
