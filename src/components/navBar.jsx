import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaFirstOrder } from "react-icons/fa";


export default function NavBar({ user }) {
  const [openNav, setOpenNav] = React.useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('/login');
  }

  const handleLogin = () => {
    navigate('/login')
  }
  const handleCart = () => {
    const userParam = encodeURIComponent(JSON.stringify(user));
    navigate(`/cart?user=${userParam}`);
  };
  const handleOrder = () => {
    const userParam = encodeURIComponent(JSON.stringify(user));
    navigate(`/order?user=${userParam}`);
  };

// const getCartNumber = ()

  React.useEffect(() => {

    
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);


  const navList = (
    <ul className=" sticky top-0 mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#topdelights" className="flex items-center" >
          🌟 Top
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#hotpicks" className="flex items-center" >
          🔥 Hot Picks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#starter" className="flex items-center" >
          🔥 Starter
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#about" className="flex items-center">
          🌟 About
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#contact" className="flex items-center" >
          📧 Cantact Us
        </a>
      </Typography>
      {user && (

        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a onClick={handleOrder} className="flex hover:cursor-pointer items-center" >
            Your  Orders
          </a>
        </Typography>
      )}


    </ul>
  );
  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 sticky top-0 bg-white z-10">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-bold"
        >
          FlavorFusion Eats
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {user ?
          (
            <div className="flex items-center gap-7">
              <button size="sm" className="hidden lg:inline-block relative" onClick={handleCart}>
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  5
                </span>
                <FaCartPlus style={{ fontSize: 20 }} />
              </button>
              <Button
                onClick={handleLogout}
                variant="gradient" size="sm" className="hidden lg:inline-block">
                <span>Logout</span>
              </Button>
            </div>


          ) : (
            <Button
              onClick={handleLogin}
              variant="gradient" size="sm" className="hidden lg:inline-block">
              <span>Login</span>
            </Button>
          )}


        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          <div className="flex items-center gap-4 pr-3">
            {user && (
              <button size="sm" className=" relative" onClick={handleCart}>
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  5
                </span>
                <FaCartPlus style={{ fontSize: 20 }} />
              </button>
            )}

            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}</div>
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          {user ?
            (
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleLogout}
                  variant="gradient" size="sm" className="lg:inline-block">
                  <span>Logout</span>
                </Button>
              </div>

            ) : (
              <Button
                onClick={handleLogin}
                variant="gradient" size="sm" className="lg:inline-block">
                <span>Login</span>
              </Button>
            )}

        </div>
      </Collapse>
    </Navbar>
  );
}