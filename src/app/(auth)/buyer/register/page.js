import { RegisterForm } from "@/components/Auth/Register";

export default function BuyerRegister() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
        <div className="mb-10">
          <RegisterForm />
        </div>
      </div>
    );
}