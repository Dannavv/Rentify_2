import { NextResponse } from "next/server";

export async function createPost(data) {
  try {
    const response = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    const res = await response.json();
    console.log(res);

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

export async function getAll() {
  try {
    const response = await fetch("/api/post/get", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get post");
    }
    const res = await response.json();
    console.log(res);

    return res;
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

export async function getBySearch(search) {
  try {
    const response = await fetch("/api/post/get-by-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    });
    if (!response.ok) {
      throw new Error("Failed to search");
    }
    const res = await response.json();
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function handleLike(id, userId) {
  try {
    const response = await fetch(`/api/post/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, userId }),
    });
    if (!response.ok) {
      throw new Error("Failed to like the post");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function handleUpdate(id, data) {
  console.log(id, data);
  try {
    const response = await fetch("/api/post/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, data }),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    const res = await response.json();
    console.log(res);

    return res
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

export async function handleContactExchange(seller, buyer){
  // console.log({seller, buyer})
  // MailExchange(seller, buyer)

  try {
    const response = await fetch("/api/contact-exchange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seller, buyer }),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    const res = await response.json();
    console.log(res);

    return res
  } catch (error) {
    console.error(error);
    // Handle error
  }
}