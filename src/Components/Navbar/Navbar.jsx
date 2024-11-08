import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import NavTypewriter from "../NavTypewriter/NavTypewriter";


const Navbar = () => {
  const { LogOut, user} = useAuth()
  const email = user ? user.email : "ab@gmail.com";

  const Navlink = <>
    <li><NavLink className=" mr-1   md:mr-4  my-0 md:my-0 F font-bold text-base " to='/'>Home</NavLink> </li>
    <li><NavLink className=" mr-1  md:mr-4  my-0 md:my-0  font-bold text-base " to='/bussStopage'>Buss Stopage</NavLink></li>
    <li><NavLink className=" mr-1   md:mr-4  my-0 md:my-0 font-bold text-base " to='/teacher'>Faculty Authority Request</NavLink></li>

    {email === "abdurrazzak118348@gmail.com" && (
  <>
 <li> <NavLink className="mr-1   md:mr-4  my-0 md:my-0 font-bold text-base " to='/admin'>Admin</NavLink></li>
  </>
  )
  }
  </>


  return (
    <div className="navbar bg-slate-700">
      <div className="navbar-start">
      <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden btn-circle ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content  rounded-box z-[1000] mt-3 w-52  shadow space-y-3 text-white bg-slate-600">
        {Navlink}

      </ul>
    </div>

        <Link to='/' className="text-lg md:text-xl lg:text-2xl font-bold    text-white">
<NavTypewriter></NavTypewriter>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">
          {Navlink}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user?<div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full " title={user?.displayName || 'User name not found'}>
                  <img className="" src={user?.photoURL? user.photoURL : "https://cdn-icons-png.flaticon.com/512/219/219986.png" } />
              </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1000] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
 <p className="btn btn-sm  btn-ghost">{user?.displayName||'user name not found'}</p>

              </li>
              <li>
                  <button
                      onClick={LogOut}
                      className="btn btn-sm  btn-ghost">Logout</button>

              </li>
          </ul>
      </div>
      :
      <Link to={'/login'} className=""><button className="btn bg-yellow-300">Login</button></Link>
        }

      </div>
    </div>
  );
};

export default Navbar;