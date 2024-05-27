import { VerificationForm } from "@/components/Auth/Verification";

export default function VerificationPage({params}) {
  const {id} = params
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <VerificationForm id={id}/>
    </div>
  );
}
