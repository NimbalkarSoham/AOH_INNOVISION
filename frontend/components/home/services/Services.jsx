
import "./Services.css";
import services4 from "../../../public/img/services4.png";
import Image from "next/image";
const Services = () => {
  return (
    <div className="h-1/2 bg-evergreen bg-grey mt-3 p-9">
      <div className="flex justify-center flex-col p-9">
        <h1 className="text-4xl mt-2 font-bold m-auto">Our Services</h1>
        <p className="mt-3 text-lg font-semibold m-auto ">
          Following are the services that Krishi Sadhan market provides for
          Farmers:
        </p>
        <Image src={services4} className="serviceImg" alt="" height={1100} width={1100}/>
      </div>
    </div>
  );
};

export default Services;
