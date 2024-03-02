import Env from "@/config/env";
import { headers } from "next/headers";

export async function fetchUser() {
  const res = await fetch(`${Env.APP_URL}/api/user`, {
    headers: headers(),
    next: {
      revalidate: 3600,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const response = await res.json();
  return response?.data;
}

export async function fetchUserById(id: string) {
  const res = await fetch(`${Env.APP_URL}/api/user/${id}`, {
    headers: headers(),
    next: {
      revalidate: 3600,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const response = await res.json();
  return response?.data;
}

export async function fetchPost(page: number) {
  const res = await fetch(`${Env.APP_URL}/api/post?page=${page}`, {
    cache: "no-cache",
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const response = await res.json();
  return response!.data;
}

export async function searchUser(query: string) {
  const res = await fetch(`${Env.APP_URL}/api/explore?query=${query}`, {
    cache: "no-cache",
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const response = await res.json();
  return response?.data;
}

export async function fetchNotifications() {
  const res = await fetch(`${Env.APP_URL}/api/notification`, {
    cache: "no-cache",
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const response = await res.json();
  return response?.data;
}

export async function fetchUserPosts() {
  const res = await fetch(`${Env.APP_URL}/api/user/post`, {
    cache: "no-cache",
    headers: headers(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const response = await res.json();
  return response?.data;
}

export async function fetchUserComments() {
  const res = await fetch(`${Env.APP_URL}/api/user/comment`, {
    cache: "no-cache",
    headers: headers(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const response = await res.json();
  return response?.data;
}

export async function fetchPostById(id: string) {
  const res = await fetch(`${Env.APP_URL}/api/post/${id}`, {
    cache: "no-cache",
    headers: headers(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const response = await res.json();
  return response?.data;
}
