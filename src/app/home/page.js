"use client"
import Filter from "@/components/home/filter";
import Posts from "@/components/home/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/User";
import { removeCookie } from "@/lib/cookie";
import { Mail, Plus } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();
  const [search, setSearch] = useState();
  const [mode, setMode] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState();
  const [dataForFilter, setDataForFilter] = useState({
    area: [],
    rent: [],
    bedroom: [],
    bathroom: [],
  });

  useEffect(() => {
    console.log(dataForFilter);
  }, [dataForFilter]);

  useEffect(() => {
    console.log(filter);
  }, [filter]);


  const handleLogout = () => {
    // alert("hello")
    console.log("log out")
    removeCookie("id");
    // router.refresh()
    // router.reload()
    window.location.reload()
  };

  const handleSignIn = () => {
    router.push("/");
  };

  const handleMode = () => {
    setMode(mode === "all" ? "my" : "all");
    // setSearch(!mypost ? "my-post" : "all-post");
    setInputValue("");
    setSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(inputValue);
      // setInputValue(''); // Reset the input value
      e.target.blur(); // Remove focus from the input field
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div class="flex flex-col h-screen p-2 bg-gray-100">
        <div class="grid grid-cols-2 sm:grid-cols-4 ">
          <div className=" col-span-1 flex items-center justify-center ">
            <div className="flex items-center space-x-2">
              <h1>
                Hello{" "}
                <span className="font-bold">{user?.name || "Unknown"}</span>
              </h1>
            </div>
          </div>

          <div class="  col-span-2 order-3 sm:order-2  lg:order-1 flex items-center justify-center">
            <div className="flex items-center space-x-2 w-full ">
              <Input
                type="text"
                placeholder="search place"
                className="mx-10 "
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div class="  col-span-1 order-2 sm:order-3 lg:order-3">
            <div className="flex justify-center items-center ">
              {user?.seller && (
                <>
                  <Button
                    className="h-8 m-1 mr-10 flex items-center"
                    variant="outline"
                    onClick={handleMode}
                  >
                    {mode === "my" ? "All post" : "My Post"}
                  </Button>
                  <Button
                    className="h-8 m-1 mr-10 flex items-center"
                    variant="outline"
                    asChild
                  >
                    <Link href="/create-post" className="flex items-center">
                      <Plus className="w-4 h-4 " />
                      Post
                    </Link>
                  </Button>
                </>
              )}
              {user ? (
                <Button
                  className="h-8 m-1  flex items-center"
                  variant="destructive"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              ) : (
                <Button
                  className="h-8 m-1  flex items-center"
                  variant="outline"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>

        <div class="w-full h-auto pt-2">
          <div class=" flex justify-center items-center ">
            {
              dataForFilter && (
                <Filter
                filter={filter}
                setFilter={setFilter}
                dataForFilter={dataForFilter}
              />
              )
            }
           
          </div>
        </div>

        <div class="flex-1 ">
          <div className="flex justify-center item-center ">
            {/* {search} */}
            <Posts
              search={search}
              mode={mode}
              setDataForFilter={setDataForFilter}
              filter={filter}
            />
          </div>
        </div>
        <div class="bg-gray-300 text-balck text-center ">
          This is Rentify created by Arpit Anand with ❤️
        </div>
      </div>
    </>
  );
}
