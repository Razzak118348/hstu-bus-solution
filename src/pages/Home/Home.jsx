import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Banner from "../../Components/Banner/Banner";
import Marquees from "../../Components/Marquee/Marquee";

const Home = () => {
  // Sanitize data: trim spaces and normalize to lowercase where necessary
  const sanitizeData = (data) => {
    return data.map((buss) => ({
      ...buss,
      category: buss.category.trim().toLowerCase(),
      leaving_time: buss.leaving_time.trim(),
      leaving_place: buss.leaving_place.trim().toLowerCase(),
    }));
  };

  // Load data and sanitize it
  const allBuss = sanitizeData(useLoaderData());

  // State for dropdown category selection
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Convert 12-hour time to 24-hour format for sorting
  const convertTo24HourFormat = (time) => {
    if (!time.includes("am") && !time.includes("pm")) {
      time += " am";
    }

    const [hour, minute] = time.split(" ")[0].split(":");
    const ampm = time.split(" ")[1];
    let hour24 = parseInt(hour);
    if (ampm === "pm" && hour24 < 12) hour24 += 12;
    if (ampm === "am" && hour24 === 12) hour24 = 0;
    return new Date(1970, 0, 1, hour24, parseInt(minute || 0));
  };

  // Filter buses by category and leaving place
  const filterBuses = (place) => {
    return allBuss
      .filter((buss) =>
        selectedCategory === "all"
          ? true
          : buss.category === selectedCategory
      )
      .filter((buss) => buss.leaving_place.includes(place.toLowerCase()))
      .sort(
        (a, b) =>
          convertTo24HourFormat(a.leaving_time) -
          convertTo24HourFormat(b.leaving_time)
      );
  };

  // Get sorted data for specific places
  const fromHstuSortedData = filterBuses("hstu");
  const fromBoromathSortedData = filterBuses("boromath");

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Banner />
<Marquees></Marquees>
      {/* Dropdown for category selection */}
      <div className="flex justify-center mt-10">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value.toLowerCase())}
          className="p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      {/* Show buses from HSTU */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-center text-sky-700">
          Show Bus From HSTU
        </h2>
        <BusTable data={fromHstuSortedData} />
      </div>

      {/* Show buses from Boromath */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-center text-sky-700">
          Show Bus From Boromath
        </h2>
        <BusTable data={fromBoromathSortedData} />
      </div>
    </div>
  );
};

// BusTable Component
const BusTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full mt-5 border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-sky-500 to-blue-500 text-white text-sm uppercase">
            <th className="px-6 py-4 text-left font-semibold">#</th>
            <th className="px-6 py-4 text-left font-semibold">Category</th>
            <th className="px-6 py-4 text-left font-semibold">Leaving Time</th>
            <th className="px-6 py-4 text-left font-semibold">Leaving Place</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((buss, index) => (
              <tr
                key={buss._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-sky-100 transition duration-300`}
              >
                <td className="border px-6 py-4 text-gray-800 font-medium">
                  {index + 1}
                </td>
                <td className="border px-6 py-4 text-gray-800">
                  {buss.category}
                </td>
                <td className="border px-6 py-4 text-gray-800">
                  {buss.leaving_time}
                </td>
                <td className="border px-6 py-4 text-gray-800">
                  {buss.leaving_place}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center py-8 text-gray-600 font-medium"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
