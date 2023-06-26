import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPathologyOrders } from "../../redux/actions/PathologyActions"


const PathologyDashboard = () => {
    const dispatch = useDispatch()

    const { loading, error, orders } = useSelector(state => state.pathology)
    useEffect(() => {
        dispatch(getPathologyOrders())
    }, [])
    return <>
        <h1>Pathology Navbar</h1>
    </>
}

export default PathologyDashboard