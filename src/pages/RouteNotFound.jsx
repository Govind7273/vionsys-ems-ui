import { useNavigate } from "react-router-dom"

const RouteNotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center w-screen h-screen">
        <div className="text-center">
            <h1 className="text-2xl">🚫 No Route Found</h1>
            <button className="text-blue-500 mt-3 p-1 rounded-md hover:bg-blue-400 hover:text-slate-200"
            onClick={() => navigate("/home")}
            >Go Home</button>
        </div>
    </div>
  )
}

export default RouteNotFound