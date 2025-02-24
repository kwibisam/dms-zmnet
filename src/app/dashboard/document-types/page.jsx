import { fetchDocumentTypes } from "@/app/lib/data";
import { getSession } from "@/app/lib/session";
import { DeleteDocumentType} from "@/app/ui/documents/buttons";
import DocumentTypeForm from "@/app/ui/document-types/document-type-form";
import { PencilIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { Suspense } from "react";

const DocumentTypesPage = async ({ searchParams }) => {
  const documentTypes = await fetchDocumentTypes();
  const showModal = (await searchParams).modal;
  const edit = (await searchParams).edit;
  const session = await getSession()
  const token = session?.token
  // const {modal} = await searchParams
  console.log("show modal:", showModal);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Document Types</h1>
        <Link
          href="/dashboard/document-types?modal=1"
          className="bg-blue-600 p-3 py-2 rounded-md text-white m-4"
        >
          create
        </Link>
      </div>

      <div className="">
        <table className="border border-gray-100 w-full">
          <thead>
            <tr>
              <th className="text-start px-4 py-1">Type Name</th>
              <th className="text-start px-4 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {documentTypes.map((type) => (
              <tr key={type.id}>
                <td className="px-4 py-1">{type.name}</td>

                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    {/* <UpdateRole id={role.id} /> */}
                    <DeleteDocumentType id={type.id} />

                    <Link
                      href={`/dashboard/document-types?modal=1&typeId=${type.id}`}
                      className="rounded-md border p-2 hover:bg-gray-100"
                    >
                      <PencilIcon className="w-5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Suspense fallback="Loading">
          <div className="fixed inset-0 bg-black bg-opacity-15 flex justify-center py-12">
            <div className="bg-white p-4 rounded-md">
              <DocumentTypeForm token={token}/>
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default DocumentTypesPage;
