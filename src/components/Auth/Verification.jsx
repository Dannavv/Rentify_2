"use client";

import React, { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { getUserById, verifyUser } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookie";
import { useUser } from "@/context/User";

export function VerificationForm({ id }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [user1, setUser1] = useState();
  const { user, setUser } = useUser();
  // console.log(id)

  useEffect(() => {
    getUserById(id).then((data) => {
      data.json().then((res) => {
        setUser1(res);
        console.log(res);
      });
    });
    if (value.length === 6) {
      console.log(value);
      verifyUser(id, value).then((res) => {
        res.json().then((user) => {
          console.log(user);
          setCookie("id", user._id, 30);
          // save user in context
          setUser(user);
          router.push("/home");
        });
      });
    }
  }, [value]);

  return (
    <>
      <div className="text-center mb-4">
        <p>
          Dear {user1?.name}, OTP has been sent to your {user1?.email}. OTP is
          valid for 10 min only. Check spam also
        </p>
      </div>
      <div className="mb-40">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </>
  );
}
