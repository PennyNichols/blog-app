import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter=({isAuth}) => {
    return( isAuth ? <Outlet/> : <Navigate to='/login'/>)
}

export default PrivateRouter