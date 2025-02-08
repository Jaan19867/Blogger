import React from "react"
import { Link } from "react-router-dom"

const Header = ({ user, setUser }) => {
  return (
    <div>
      <div className="flex justify-between px-4 bg-gray-100">
        {/* Left Section: Blogger Logo */}
        <div className="w-1/7 bg-blue-500 text-white p-4">
          <Link to={"/"}>Blogger</Link>
        </div>

        {/* Right Section: Conditional Rendering */}
        <div className="flex items-center space-x-4">
          {/* Create Post Link */}
          <div className="bg-blue-500 text-white p-4 rounded">
            <Link to={"/createpost"}>Create Post</Link>
          </div>

          {/* User Name or Sign In/Sign Out Buttons */}
          {user ? (
            <>
              <div className="bg-green-500 text-white p-4 rounded">
                {user.name}
              </div>
              <button
                className="bg-red-500 text-white p-4 rounded"
                onClick={() => setUser(null)} // Log out the user
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
