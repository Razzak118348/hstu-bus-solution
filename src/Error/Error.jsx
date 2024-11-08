import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className=" text-center mt-44 ">
<h2 className="text-4xl font-bold popin-font ">404 </h2>
<h3 className="text-4xl font-bold popin-font mb-8">Not found!!!</h3>
<button className="btn bg-green-600 text-xl "><Link to={'/'}>Go Back</Link></button>
        </div>
    );
};

export default Error;