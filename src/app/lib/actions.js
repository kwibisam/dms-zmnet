"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, deleteSession, getSession } from "./session";

// const FormSchema = z.object({
//   id: z.string(),
//   customerId: z.string({
//     invalid_type_error: 'Please select a customer.',
//   }),
//   amount: z.coerce
//     .number()
//     .gt(0, { message: 'Please enter an amount greater than $0.' }),
//   status: z.enum(['pending', 'paid'], {
//     invalid_type_error: 'Please select an invoice status.',
//   }),
//   date: z.string(),
// });

// const CreateInvoice = FormSchema.omit({ id: true, date: true });
// const UpdateInvoice = FormSchema.omit({ date: true, id: true });

export async function addDocument(prevState, formData) {

  try {
    console.log("posting data");
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Error: Failed to add document.",
    };
  }

  // Revalidate the cache for the documents page and redirect the user.
  revalidatePath("/dashboard/documents");
  redirect("/dashboard/documents");
}

export async function UpdateDocument(id, prevState, formData) {
  try {
    console.log("update document");
  } catch (error) {
    return { message: "Database Error: Failed to Update document." };
  }

  revalidatePath("/dashboard/documents");
  redirect("/dashboard/documents");
}

export async function deleteDocument(id) {
  revalidatePath("/dashboard/documents");
}

export async function authenticate(prevState, formData) {
  'use server'
  try {
    //send login credentials to api
    const { email, password } = Object.fromEntries(formData.entries());
    const response = await fetch("http://localhost:8000/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });


    if(!response.ok) {

      if(response.status === 400) {
        const err = await response.json()
        console.log(err)
        return `${err.message}`
      }

      throw new Error(`Error: ${response.statusText}`);
    }
    
    const data = await response.json();
    const {token} = data
    await createSession(token)
  } catch (error) {
    console.log(error);
    return `Bad request: ${error}`;
  }
  redirect('/dashboard')
}


export async function demo(formData) {
  console.log("hello server")
  console.log("form data", formData)
}

export async function  logout(prevState, formData) {
  try {

    const session =  await getSession()
    await fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log("error: ", error)
    return "fatal error"
  }

  await deleteSession()
  redirect('/login')
}
export async function createCustomer(prevState, formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const tags = formData.get("tags");
  } catch (error) {
    return {
      message: "some error occured creating the customer",
      error: error,
    };
  }

  // revalidatePath("/dashboard/customers")
  // redirect("/dashboard/customers")
}
