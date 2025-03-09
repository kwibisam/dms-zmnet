"use server";

import { axios, setBearerToken } from "../axios";
import { getSession } from "../session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
// export async function removeUserRole(prevState, formData) {
//   const userId = formData.get("userId");
//   const roleId = formData.get("roleId");
//   console.log("userId: ", userId);
//   console.log("roleId: ", roleId);
// }

export async function removeUserRole(userId, roleId) {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  let data = null;
  try {
    await axios
      .delete(`users/${userId}/roles/${roleId}`)
      .then((response) => {
        data = response.data;
      })
      .catch((error) => {
        console.log("error: ", error);
        throw new Error(error.response.data.message);
      });
  } catch (error) {
    console.log("action.user.js:: removeUserRole() ", error);
    return error.message;
  }

  if (data) {
    redirect(`/dashboard/users/${userId}`);
  }
}

export async function removeUserWorkspace(userId, workspaceId) {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  let data = null;
  try {
    await axios
      .delete(`users/${userId}/workspaces/${workspaceId}`)
      .then((response) => {
        data = response.data;
      })
      .catch((error) => {
        console.log("error: ", error);
        throw new Error(error.response.data.message);
      });
  } catch (error) {
    console.log("action.user.js:: removeUserRole() ", error);
    return error.message;
  }

  if (data) {
    redirect(`/dashboard/users/${userId}`);
  }
}

export async function addUserworkspace(prevState, formData) {
  const { userId, workspaceId } = Object.fromEntries(formData.entries());
  const session = await getSession();
  const token = session?.token;

  try {
    console.log("data values: ", userId, workspaceId);
    // return;
    const response = await fetch(
      `${BASE_URL}users/${userId}/workspaces/${workspaceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(`Error: ${body.message}`);
    }

    const res = await response.json();
    // console.log(res);
  } catch (error) {
    console.log(error);
    return `Bad request: ${error}`;
  }
  redirect(`/dashboard/users/${userId}?success=1`);
}

export async function updateUserDefaultSpace(userId, workspaceId) {
  console.log("updating default space values: ", userId, workspaceId);
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);

  try {
    const response = await axios.put(
      `users/${userId}/workspaces/default/${workspaceId}`
    );
    revalidatePath(`/dashboard/users/${userId}`);
    return true; // Success
  } catch (error) {
    console.log("Error updating workspace:", error);
    return error.response?.data?.message || "An error occurred"; // Return error message
  }
}

export async function updateUserDepartment(userId, departmentId) {
  console.log("updating default space values: ", userId, departmentId);
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);

  try {
    const response = await axios.put(
      `users/${userId}/departments/${departmentId}`
    );
  } catch (error) {
    console.log("Error updating workspace:", error);
    return error.response?.data?.message || "An error occurred"; // Return error message
  }

  redirect(`/dashboard/users/${userId}`);
}
