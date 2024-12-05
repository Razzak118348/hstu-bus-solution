import Marquee from "react-fast-marquee";

const Marquees = () => {
    return (
        <div className="mt-5">
<Marquee>
 <p> The student  <span className="text-rose-500"> bus No-15 of 2:00 pm </span> from HSTU can be delay <span className="text-red-500"> 10 minutes,</span>  Please be patient.</p>
</Marquee>
        </div>
    );
};

export default Marquees;