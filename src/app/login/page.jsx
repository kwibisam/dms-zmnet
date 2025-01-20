import LoginForm from "../ui/login-form";
import ZamnetLogo from "../ui/zamnet-logo";
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4 mt-20">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <ZamnetLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
