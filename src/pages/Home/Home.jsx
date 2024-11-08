import { useLoaderData } from "react-router-dom";


const Home = () => {

    const allBuss = useLoaderData();
    const FromHstu = allBuss.filter((buss) => buss.leaving_place.toLowerCase().includes("hstu"))
    const FromHstuSortData = FromHstu.sort((a, b) => {
        // Function to convert 12-hour time format (e.g., "6 am", "7 pm") to 24-hour format for comparison
        const convertTo24HourFormat = (time) => {
          const [hour, minute] = time.split(' ')[0].split(':');
          const ampm = time.split(' ')[1];
          let hour24 = parseInt(hour);
          if (ampm === "pm" && hour24 < 12) hour24 += 12;
          if (ampm === "am" && hour24 === 12) hour24 = 0; // For "12 am"
          return new Date(1970, 0, 1, hour24, minute || 0); // Create a Date object for comparison
        };

        // Compare the times
        const timeA = convertTo24HourFormat(a.leaving_time);
        const timeB = convertTo24HourFormat(b.leaving_time);
        return timeA - timeB; // Sorting in ascending order
      })

      const FromBoromath = allBuss.filter((buss) => buss.leaving_place.toLowerCase().includes("boromath")) //Case-insensitive filtering

const FromBoromathSortData = FromBoromath.sort((a, b) => {
    // Function to convert 12-hour time format (e.g., "6 am", "7 pm") to 24-hour format for comparison
    const convertTo24HourFormat = (time) => {
      const [hour, minute] = time.split(' ')[0].split(':');
      const ampm = time.split(' ')[1];
      let hour24 = parseInt(hour);
      if (ampm === "pm" && hour24 < 12) hour24 += 12;
      if (ampm === "am" && hour24 === 12) hour24 = 0; // For "12 am"
      return new Date(1970, 0, 1, hour24, minute || 0); // Create a Date object for comparison
    };

    // Compare the times
    const timeA = convertTo24HourFormat(a.leaving_time);
    const timeB = convertTo24HourFormat(b.leaving_time);
    return timeA - timeB; // Sorting in ascending order
  })




    return (
        <div className="min-h-screen">
<div className="flex items-center justify-center mt-16">
<h2 className="text-3xl font-extrabold text-center text-black mt-10 mb-6 bg-gradient-to-r from-sky-500 to-blue-500 p-2 rounded-lg shadow-md inline-block">
  Show Buss From HSTU
</h2>
</div>
<div className="overflow-x-auto mb-10 shadow-lg rounded-lg bg-white p-6">
  <table className="table w-full border-separate border-spacing-0">
    {/* Header */}
    <thead>
      <tr className="bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-t-lg">
        <th className="p-4 text-left rounded-tl-lg">Serial No.</th>
        <th className="p-4 text-left">Category Name</th>
        <th className="p-4 text-left">Leaving Time</th>
        <th className="p-4 text-left">Leaving Place</th>

      </tr>
    </thead>
    {/* Body */}
    <tbody>
      {FromHstuSortData.map((buss, index) => (
          <tr
            key={buss._id}
            className={`${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-sky-100 transition duration-200`}
          >
            <td className="p-4 border-b text-gray-700">{index + 1}</td>
            <td className="p-4 border-b text-gray-700">{buss.category}</td>
            <td className="p-4 border-b text-gray-700">{buss.leaving_time}</td>
            <td className="p-4 border-b text-gray-700">{buss.leaving_place}</td>
          </tr>
        ))}
    </tbody>
  </table>
</div>


{/* show buss leaving from  boromath */}
<div className="flex items-center justify-center mt-16">
  <h2 className="text-3xl font-extrabold text-center text-black mt-10 mb-6 bg-gradient-to-r from-sky-500 to-blue-500 p-2 rounded-lg shadow-md inline-block">
    Show Buss From BoroMath
  </h2>
</div>

<div className="overflow-x-auto mb-10 shadow-lg rounded-lg bg-white p-6">
  <table className="table w-full border-separate border-spacing-0">
    {/* Header */}
    <thead>
      <tr className="bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-t-lg">
        <th className="p-4 text-left rounded-tl-lg">Serial No.</th>
        <th className="p-4 text-left">Category Name</th>
        <th className="p-4 text-left">Leaving Time</th>
        <th className="p-4 text-left">Leaving Place</th>

      </tr>
    </thead>
    {/* Body */}
    <tbody>
      {FromBoromathSortData.map((buss, index) => (
          <tr
            key={buss._id}
            className={`${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-sky-100 transition duration-200`}
          >
            <td className="p-4 border-b text-gray-700">{index + 1}</td>
            <td className="p-4 border-b text-gray-700">{buss.category}</td>
            <td className="p-4 border-b text-gray-700">{buss.leaving_time}</td>
            <td className="p-4 border-b text-gray-700">{buss.leaving_place}</td>
          </tr>
        ))}
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Home;