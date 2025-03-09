import Link from "next/link";
import NavLinks from "./nav-links";
import ZamnetLogo from "../zamnet-logo";
import LogoutButton from "../logout-button";
export default function SideNav({ user }) {
  console.log("side-nav.js:: ", user);
  return (
    <div className="nav flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <ZamnetLogo />
          <h2 className="font-semibold uppercase">
            {" "}
            {user.department.name} -{" "}
            <span className="lowercase font-normal text-sm">workspace</span>
          </h2>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <LogoutButton />
      </div>
    </div>
  );
}
