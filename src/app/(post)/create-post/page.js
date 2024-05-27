import { CreatePostForm } from "@/components/Post/createPost";

export default function CreatePostPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="mb-20">
          <CreatePostForm />
        </div>
      </div>
    </>
  );
}
