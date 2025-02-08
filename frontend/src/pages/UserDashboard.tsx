import axios from "axios"
import { useEffect, useState } from "react"

export const UserDashboard = () => {
  // yeha pe jitne
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8787/api/v1/blog/", {
          withCredentials: true,
        })
        console.log(response.data)
        setData(response.data.data)
      } catch (error) {
        console.error("error ", error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div>
        <br />
      </div>
      <div className="flex justify-between px-4">
        <div className="w-1/7 bg-blue-500 text-white p-4">Medium</div>
        <div className="w-1/7 bg-blue-500 text-white p-4"> Create Post</div>
      </div>

      <div className="mt-[50px]  ml-5 mr-5">
        <TodoCard data={data} />
      </div>
    </>
  )
}

const TodoCard = ({ data }) => {
  return (
    <>
      <div className="space-y-3">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="p-4 border rounded shadow">
              {/* Title */}
              <h2 className="text-lg font-semibold">{item.title}</h2>

              {/* Author Name and Date */}
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="mr-2">By {item.author}</span>
                <span>·</span>
                <span className="ml-2">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>

              {/* Content */}
              <p className="text-gray-600">{item.content}</p>
            </div>
          ))
        ) : (
          <p>Loading blogs...</p>
        )}
      </div>
    </>
  )
}
