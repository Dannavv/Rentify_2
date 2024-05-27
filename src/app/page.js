import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="">
        <div className=" flex justify-center item-center pt-10 m-4">
          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl ">
            Welcome to Rentify
          </p>
        </div>
        <div className=" flex justify-center item-center ">
          {/* <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl ">Welcome to Rentify</p> */}
          <p className="text-base sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl">
            Here you can find your next home to stay
          </p>
        </div>
        <div className="pt-5 flex justify-center item-center ">
          <Button onChild>
            <Link href="/home"> Find Home</Link>
          </Button>
        </div>

        <div className="m-4 grid sm:grid-cols-2 gap-2">
          <div className=" ">
            <div className="pt-5 flex justify-center item-center ">
              <p className="text-base md:text-1xl lg:text-2xl xl:text-3xl">
                Are you a Buyer
              </p>
            </div>

            {/* <div className="flex w-full"> */}
            <div className=" m-4  w-full flex justify-center items-center">
              <Button onChild>
                <Link href="/buyer/login">Login</Link>
              </Button>
            </div>
            <div className=" m-4  w-full flex justify-center items-center">
              <Button onChild>
                <Link href="/buyer/register">Register</Link>
              </Button>
            </div>
            {/* </div> */}
          </div>
          <div className=" ">
            <div className="pt-5 flex justify-center item-center ">
              <p className="text-base md:text-1xl lg:text-2xl xl:text-3xl">
                Are you a Seller
              </p>
            </div>
            {/* <div className="flex w-full"> */}
            <div className="m-4 w-full flex justify-center items-center">
              <Button onChild>
                <Link href="/seller/login">Login</Link>
              </Button>
            </div>
            <div className=" m-4  w-full flex justify-center items-center">
              <Button onChild>
                <Link href="/seller/register">Register</Link>
              </Button>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
