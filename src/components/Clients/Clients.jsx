import Image from "next/image";
import MaxWidthWrapper from "../custom/MaxWidthWrapper";

const Clients = async () => {
  const res = await fetch(`http://localhost:5000/api/v1/client`, {
    cache:"no-store"
  });
  const data = await res.json();
  const clients = data?.data?.result;
  const clientsArray = new Array(12).fill(0)
  return (
    <MaxWidthWrapper className="py-16">
      <div className="flex items-center gap-3">
        {" "}
        <p className="h-0.5 w-14 bg-gradient-to-tr from-[#ffc1957a] to-[#F78C40]"></p>{" "}
        <p className="text-[#F78C40] font-semibold text-xl">Our partners</p>{" "}
        <hr className="border flex-1 border-[#718698]" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 py-8">
        {clientsArray?.map((item) => (
          <div key={item?._id}>
           
            <Image
              src={"https://i.postimg.cc/8PS7tvjp/Frame-76463-1.png"}
              height={200}
              width={200}
              className="w-full"
              alt="Client Image"
            //   loader={}
            />
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default Clients;
