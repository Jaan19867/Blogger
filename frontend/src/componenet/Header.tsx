import React, { useEffect } from "react"
import { Link } from "react-router-dom"





const Header = ({ user, setUser }) => {

  useEffect(()=>{
    console.log(user); 
  } , [])

  const Signout=()=>{

    alert("hi you are from logout section ") ; 

      localStorage.removeItem("token")
        setUser("");


  }
  return (
    <div>
      <div className="flex justify-between px-4 bg-gray-100">
        {/* Left Section: Blogger Logo */}
        <div className="w-1/7 bg-blue-500 text-white p-4 cursor-pointer">
          <Link to={"/"}>Blogger</Link>
        </div>

        {/* Right Section: Conditional Rendering */}
        <div className="flex items-center space-x-4">
          {/* Create Post Link */}
          <div className="bg-blue-500 text-white p-4 rounded">
            <Link to={"/createpost"}>Create Post</Link>
          </div>

          {/* <ProfileDropdown/> */}

          {/* User Name or Sign In/Sign Out Buttons */}
          {user ? (
            <>
              <div className="bg-green-500 text-white p-4 rounded cursor-pointer">
                <Link to={"/userboard"}>
                  <b>{user}</b>
                </Link>
              </div>

              <button
                className="bg-red-500 text-white p-4 rounded cursor-pointer"
                onClick={Signout} // Log out the user
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <div className="bg-red-500 text-white p-4 rounded">
                <Link to="/signin">Sign In</Link>
              </div>
              <div className="bg-red-500 text-white p-4 rounded">
                <Link to="/signup">Sign Up</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
