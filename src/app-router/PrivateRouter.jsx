import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter=({currentUser}) => {
    return( currentUser ? <Outlet/> : <Navigate to='/login'/>)
}

export default PrivateRouter