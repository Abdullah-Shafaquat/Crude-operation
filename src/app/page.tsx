import { AcademicCapIcon } from "@heroicons/react/16/solid";


import Link from "next/link";


function Home() {
  
  return ( 
    <div>
      <div className="grid grid-cols-4 gap-5">
        <Link href={'/students'}>
        <div className="bg-[#F0F9FF]">
          <AcademicCapIcon className="h-48 w-38 text-[#74C1ED] p-2"/>
          <p className="ml-6 mb-9 text-lg text-gray-500">Students</p></div></Link>

          


      </div>

      
      </div>
      
 
   );
}

export default Home;