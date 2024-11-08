import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
const singleBuss = useLoaderData()

const handleUpdate = (e) => {
    e.preventDefault()
    const form = e.target;
    const category =form.category.value;
    const leaving_time =form.leaving_time.value;
    const leaving_place = form.leaving_place.value;
    const buss = {category,leaving_time,leaving_place};
}

    return (
        <div className='min-h-screen'>
<div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg mb-16">
        <h2 className="text-3xl text-center font-bold text-blue-600 mb-6">Update The Bus Schedule</h2>
        <form onSubmit={handleUpdate} className=" grid grid-cols-2 md:grid-cols-3 gap-5">

         <div>
            <label className="label font-semibold text-gray-700">
              <span className="label-text">Category</span>
            </label>
            <input
              type="text"
              placeholder="Category name"
              name="category"
              defaultValue={singleBuss.category}
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
              defaultValue={singleBuss.leaving_time}
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
              defaultValue={singleBuss.leaving_place}
              name="leaving_place"
              className="input input-bordered w-full p-3 rounded-lg border-2 border-blue-400 focus:outline-none focus:border-blue-600"
              required
            />
          </div>

<input className="bg-green-500 p-1 input w-full mx-0 md:mx-40 rounded-lg mt-8 md:mt-0 " type="submit" value={'Update the Shedule'} />
        </form>
      </div>
        </div>
    );
};

export default Update;