import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const SocialLogin = () => {
    const {googleLogin,
        gitHubLogin}=useAuth();
        const navigate =useNavigate();
        const location = useLocation();
        const destination = location?.state?location.state:'/';
        const handleSocialMedialLogin =(SocialProvider)=>{
            SocialProvider()
            .then(result=>{
                if(result.user){
                    navigate(destination)
                }
            })
        }
    return (
        <div className="grid
        grid-cols-1 md:grid-cols-2 gap-5 mx-20 md:mx-10 lg:ml-24 ">



<button
          onClick={() => handleSocialMedialLogin(googleLogin)}
          className="btn border-t-cyan-400  btn-outline  w-56 md:w-32"
        >
        Login with  Google
        </button>
        <button
          onClick={() => handleSocialMedialLogin(gitHubLogin)}
          className="btn border-t-pink-400  btn-outline w-56 md:w-32"
        >
       Login with   Github
        </button>
</div>

    );
};

export default SocialLogin;