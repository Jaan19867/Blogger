import axios from "axios"
import { useEffect, useState } from "react"

export const UserDashboard = ({user}) => {
  // yeha pe jitne
  const [data, setData] = useState([])

  useEffect(() => {
    console.log("users nameis ")
    console.log(user); 
    const fetchData = async () => {
      try {
         const jwt = localStorage.getItem("token")
         console.log(jwt) 
        const response = await axios.get("http://localhost:8787/api/v1/blog/users-blog", {
          headers: {
            Authorization: `Bearer ${jwt}`, 
          },
        })

        console.log("dd ")
        console.log(response.data)
        setData(response.data.data)
      } catch (error) {
        console.log("from fronten users all blog error ")
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
    

      <div className="mt-[50px]  ml-5 mr-5">
        <TodoCard data={data} user={user} />
      </div>
    </>
  )

}

const TodoCard = ({ data  , user}) => {
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
                <span className="mr-2">By {item.authorName}</span>
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
