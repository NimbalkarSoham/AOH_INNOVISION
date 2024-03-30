import "./Workflow.css";
import videoPic from "../../../public/img/videoPic.png";
import Image from "next/image";

const Workflow = () => {
  return (
    <div className="max-w-6xl mx-auto"> {/* Container with max-width */}
      <div className="rounded-lg bg-[#219653] py-10 px-6 md:px-20 mb-10">
        <h1 className="text-4xl font-bold uppercase mb-4 text-center text-white">
          How AGRI FARM works?
        </h1>
        <p className="text-md font-medium uppercase mb-4 text-center text-white">
          Take a Look at out Platform Demo
        </p>
        <div className="flex justify-around items-center text-white">
          <div className="grow">
            <ul className="list-decimal ml-[90px] list-inside">
              <li className="text-2xl mr-4 my-4">Sign-up to the platform.</li>
              <li className="text-2xl mr-4 my-3">
                Post your ad for the off-season.
              </li>
              <li className="text-2xl mr-4 my-4">Provide equipment details.</li>
              <li className="text-2xl mr-4 my-3">
                Explore and filter lists of equipment.
              </li>
              <li className="text-2xl mr-4 my-4">
                Check an available time slot.
              </li>
              <li className="text-2xl mr-4 my-3">
                Chat with the owner and make a booking..
              </li>
              <li className="text-2xl mr-4 my-4">Stay updated by SMS.</li>
            </ul>
          </div>
          <div className="h-1/2 w-1/2">
            <Image
              src={videoPic}
              className="object-contain"
              alt=""
              height={500}
              width={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
