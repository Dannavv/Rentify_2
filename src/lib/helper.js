const { NextResponse } = require("next/server");

export async function registerUser(data) {
  try {
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    const res = await response.json();
    console.log(res);
    if (res?.message === "User already exists") {
      return NextResponse.json({ message: "User already exists" });
    }

    return NextResponse.json({ _id: res._id });
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

export async function getUserById(id) {
  try {
    const response = await fetch("/api/user/loginById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const user = await response.json();
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

export async function verifyUser(id, otp) {
  try {
    // Make PUT request to verify user
    const response = await fetch(`/api/user/verification`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verificationCode: otp, id: id }), // Use userId obtained from query parameters
    });

    // Handle response
    const res = await response.json();
    console.log(res);

    return NextResponse.json(res);
  } catch (error) {
    console.error(error.message);
    // Handle error
  }
}

export async function loginUser(data) {
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const user = await response.json();
    console.log(user);

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    // Handle error
  }
}
