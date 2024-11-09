
import { FaMapMarkerAlt } from 'react-icons/fa';

const Stopage = () => {
    const stoppages = ["Collage Mor", "Terminal", "Moharaja Mor", "Sohidminar", "Jela Hospital"];

    return (
        <div className="max-w-lg mx-auto my-10 p-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-white mb-6">
                🚌 Bus Stoppages
            </h2>
            <ul className="space-y-4">
                {stoppages.map((stop, index) => (
                    <li
                        key={index}
                        className="flex items-center bg-white bg-opacity-80 rounded-lg p-4 shadow-md hover:bg-blue-50 transform transition duration-300"
                    >
                        <FaMapMarkerAlt className="text-blue-600 mr-3 text-xl" />
                        <span className="text-lg font-semibold text-gray-700">{stop}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Stopage;
