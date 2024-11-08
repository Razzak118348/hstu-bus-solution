import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";



const Signup = () => {

  const [passwordType, setPasswordType] = useState(false);
  const { creatUser,
    updateUserProfile } = useAuth();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const PasswordValidation =(password) =>{
    const length = password.length>=6;
    const upperCase = /[A-z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    // combind uper and lower : /(?=.*[A-Z])(?=.*[a-z])/.test(password)
    return length&&upperCase&&lowerCase;
  }

  const onSubmit = (data) => {
    const { name, image, email, password } = data;
    console.log(name, email, password)


if(!PasswordValidation(password)){
  if(password.length<6){
    toast.error("Password must be 6 character", {
      position: 'top-right',
    })
  }
  else if(!/[A-Z]/.test(password)){
    toast.error("Password must need one UpperCase", {
      position: 'top-right',
    })
  }
  else if(!/[a-z]/.test(password)){
    toast.error("Password must need one lowerCase", {
      position: 'top-right',
    })
  }
  return;
}

    //creat user
    creatUser(email, password)
      .then(() => {
        updateUserProfile(name, image)
          .then(() => {
            toast.success("Successfully Resister", {
              position: 'top-right',
              onClose: navigate('/')
            })
          })
          .catch(error => {
            toast.error(error.message, {
              position: 'top-right',
            })
          })
      })
      .catch(error => {
        toast.error(error.message, {
          position: 'top-left',
        })
      })
  }

  return (
    <div>
      <ToastContainer
        autoClose={500}
      ></ToastContainer>
      {/* signup form  */}
      <div className="mt-3  rounded-2xl grid  grid-cols-1 md:grid-cols-2">

        <div className="popin-font mt-2    bg-[#FFFFFF] border border-green-300 text-center  rounded-xl">
          <h2 className="text-lg  md:text-2xl font-semibold text-[rgb(64,63,63)] mt-9">Please Register </h2>

          <hr className="mt-2" />



          <div className="">
            <div className="hero-content flex-col ">
              <div className="text-center lg:text-left">


              </div>
              <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">Your name</span>
                    </label>
                    <input type="text" name="name" placeholder="Input your Name" className="input input-bordered"

                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-red-500">This field is required</span>
                    )}

                    <label className="label">
                      <span className="label-text text-lg">Photo Url</span>
                    </label>
                    <input type="text" name="photo" placeholder=" photo url" className="input input-bordered"   {...register("image")} />
                    <label className="label">
                      <span className="label-text text-lg">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered"   {...register("email", { required: true })} />
                    {errors.email && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl">Password</span>
                    </label>
                    <div className="flex  w-full">
                      <input
                        type={passwordType ? "text" : "password"}
                        name="password"

                        placeholder="password"
                        className="input input-bordered w-full"
                        {...register("password", { required: true })}
                      />

                      <span
                        className="w-2 mt-5 -ml-6 "
                        onClick={() => setPasswordType(!passwordType)}
                      >
                        {passwordType ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                      </span>
                    </div>
                    {errors.password && (
                      <span className="text-red-500">This field is required</span>
                    )}

                    <p className="mt-5 flex space-x-2 text-lg">
                      <input type="checkbox" name="" id="" />
                      <span> Accept <Link className=" font-bold underline text-[#706F6F] " to={'/terms'}>Terms & Conditions</Link></span>
                    </p>
                    <label className="label text-xl ">
                      <Link to={'/login'} className=" text-lg">
                        Already have an Account ? <span className="text-red-600 font-bold underline">Login</span>
                      </Link>

                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button  type="submit" className="btn hover:bg-green-500 bg-[#403F3F] text-white font-bold text-lg md:text-2xl ">SignUp</button>

                  </div>
                </form>



              </div>
            </div>
          </div>
        </div>
<div className="sm:hidden md:flex">
    <img src="https://github.com/Razzak118348/CraftedCanvas_Image/raw/main/images/register.png" alt="" />
</div>
      </div>

    </div>
  );
};

export default Signup;