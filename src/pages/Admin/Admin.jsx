import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2'

const Admin = () => {
    const allBuss = useLoaderData();
    const [remainigBuss, setRemainingBus] = useState(allBuss || [])

    const FromHstu = remainigBuss.filter((buss) => buss.leaving_place.toLowerCase().includes("hstu")) //Case-insensitive filtering
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


    const FromBoromath = remainigBuss.filter((buss) => buss.leaving_place.toLowerCase().includes("boromath")) //Case-insensitive filtering

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

    const handleAddBuss = (e) => {
        e.preventDefault();
        const form = e.target;
        const category = form.category.value;
        const leaving_time = form.leaving_time.value;
        const leaving_place = form.leaving_place.value;
        const buss = { category, leaving_time, leaving_place };

        fetch('http://localhost:5000/allbuss', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(buss),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Buss Added successfully",
                        showConfirmButton: "ok",
                    });
                    form.reset();
                }
            })
    }
    // console.log(allBuss);

    //delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/deletebuss/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {

                            const remaining = allBuss.filter(buss => buss._id != id)
                            setRemainingBus(remaining)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Bass has been deleted.",
                                icon: "success"
                            });
                        }

                    })

            }
        });
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg mb-16">
                <h2 className="text-3xl text-center font-bold text-blue-600 mb-6">Input a Bus Schedule</h2>
                <form onSubmit={handleAddBuss} className=" grid grid-cols-2 md:grid-cols-3 gap-5">

                    <div>
                        <label className="label font-semibold text-gray-700">
                            <span className="label-text">Category</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Category name"
                            name="category"
                            className="input input-bordered w-full p-3 rounded-lg border-2 border-blue-400 focus:outline-none focus:border-blue-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="label font-semibold text-gray-700">
                            <span className="label-text">Leaving Time</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Leaving time"
                            name="leaving_time"
                            className="input input-bordered w-full p-3 rounded-lg border-2 border-blue-400 focus:outline-none focus:border-blue-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="label font-semibold text-gray-700">
                            <span className="label-text">Leaving Place</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Leaving place"
                            name="leaving_place"
                            className="input input-bordered w-full p-3 rounded-lg border-2 border-blue-400 focus:outline-none focus:border-blue-600"
                            required
                        />
                    </div>

                    <input className="bg-yellow-400 p-1 input w-full mx-0 md:mx-40 rounded-lg mt-8 md:mt-0 " type="submit" value={'Add New Buss'} />
                </form>
            </div>


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
                            <th className="p-4 text-left rounded-tr-lg">Status</th>
                        </tr>
                    </thead>
                    {/* Body */}
                    <tbody>
                        {FromHstuSortData.map((buss, index) => (
                            <tr
                                key={buss._id}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-sky-100 transition duration-200`}
                            >
                                <td className="p-4 border-b text-gray-700">{index + 1}</td>
                                <td className="p-4 border-b text-gray-700">{buss.category}</td>
                                <td className="p-4 border-b text-gray-700">{buss.leaving_time}</td>
                                <td className="p-4 border-b text-gray-700">{buss.leaving_place}</td>
                                <td className="p-4 border-b">
                                    <Link to={`/allbuss/${buss._id}`}>
                                        <button className="btn bg-gradient-to-r from-sky-400 to-blue-400 text-white hover:from-blue-500 hover:to-sky-500 shadow-md rounded-lg py-2 px-4">
                                            Update
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(buss._id)} className="btn bg-gradient-to-r from-red-600 to-red-400 text-white hover:from-red-400 hover:to-red-600 shadow-md rounded-lg py-2 px-4 ml-5">Delete</button>
                                </td>
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
                            <th className="p-4 text-left rounded-tr-lg">Status</th>
                        </tr>
                    </thead>
                    {/* Body */}
                    <tbody>
                        {FromBoromathSortData.map((buss, index) => (
                            <tr
                                key={buss._id}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-sky-100 transition duration-200`}
                            >
                                <td className="p-4 border-b text-gray-700">{index + 1}</td>
                                <td className="p-4 border-b text-gray-700">{buss.category}</td>
                                <td className="p-4 border-b text-gray-700">{buss.leaving_time}</td>
                                <td className="p-4 border-b text-gray-700">{buss.leaving_place}</td>
                                <td className="p-4 border-b">
                                    <Link to={`/allbuss/${buss._id}`}>
                                        <button className="btn bg-gradient-to-r from-sky-400 to-blue-400 text-white hover:from-blue-500 hover:to-sky-500 shadow-md rounded-lg py-2 px-4">
                                            Update
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(buss._id)} className="btn bg-gradient-to-r from-red-600 to-red-400 text-white hover:from-red-400 hover:to-red-600 shadow-md rounded-lg py-2 px-4 ml-5">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>

    );
};

export default Admin;