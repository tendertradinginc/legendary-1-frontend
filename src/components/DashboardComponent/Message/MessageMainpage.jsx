"use client";
import PaginationRaw from "@/components/shared/pagination/PaginationRaw";
import useAllMessage from "@/hooks/useAllMessage";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useState } from "react";
import { AiFillDatabase } from "react-icons/ai";
import SingleMessage from "./SingleMessage";

const MessageMainpage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 1000);
  const {
    allMessage,
    setAllMessage,
    loading,
    total,
    messagesCount,
    setReload,
  } = useAllMessage(currentPage, pageLimit, debouncedSearchTerm);
  const skleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handelReadMessage = async (_id, status) => {
    try {
      if (status) {
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/v1/message/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setAllMessage((prevMessages) =>
          prevMessages?.map((message) =>
            message._id === _id ? { ...message, status: true } : message
          )
        );
      } else {
        console.error("Failed to update message status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  return (
    <div className="">
      <div className=" container mx-auto px-2">
        <br />

        <div className="mx-auto w-full max-w-screen-lg bg-white pb-10 ">
          <div className="overflow-x-auto sm:px-1 min-h-[60vh]">
            <div className="pb-6 flex justify-between items-center">
              <h2 className="text-blue-950 font-semibold text-2xl ">
                <AiFillDatabase className="inline mb-1"></AiFillDatabase>
                Message List -{messagesCount}
              </h2>
              <div className="flex items-center justify-between mt-4 px-2">
                <div>
                  <div>
                    <input
                      className="border border-gray-700 px-3 py-1.5 rounded-md"
                      type="text"
                      placeholder="Search by name, id, email"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="">
                  <th className="px-1 py-2">id</th>
                  <th className="px-1 py-2">Name</th>
                  <th className="px-1 py-2">Email</th>
                  <th className="px-1 py-2">Phone</th>

                  <th className="px-1 py-2">View</th>
                  <th className="px-1 py-2">Status</th>
                  <th className="px-1 py-2">Action</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {allMessage?.length > 0
                  ? allMessage?.map((message, index) => (
                      <SingleMessage
                        key={index}
                        index={index}
                        data={message}
                        setReload={setReload}
                        handelReadMessage={handelReadMessage}
                      ></SingleMessage>
                    ))
                  : Array.from({ length: 10 }).map((_, idx) => (
                      <tr
                        key={idx}
                        className={`h-10 w-full ${
                          idx % 2 == 0 ? "bg-secondary" : ""
                        } `}
                      >
                        <td className="col" colSpan={10}></td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          {!loading && (
            <div className="mt-5 px-2">
              <PaginationRaw
                data={{
                  setCurrentPage,
                  dataCount: messagesCount,
                  currentPage,
                  pageLimit,
                  setPageLimit,
                  defaultPageLimit: 10,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageMainpage;
