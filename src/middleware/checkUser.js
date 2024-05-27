// CookieChecker.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/User";
import { getCookie } from "@/lib/cookie";
import { getUserById } from "@/lib/helper";



function CookieChecker({ children }) {
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    const userId = getCookie("id");
    if (!userId) {
      
    } else {
      getUserById(userId).then((res)=>{
        res.json().then((user)=>{
          setUser(user)
          console.log(user)
          // router.push("/home")
        })
      })
      console.log(userId)
    }
  }, [router]);

  return children;
}

export default CookieChecker;
