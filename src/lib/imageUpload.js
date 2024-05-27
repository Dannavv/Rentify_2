export default async function UploadImage(files) {
    try {
      const urls = []; // Initialize an empty array to store URLs
  
      // Loop through each file in the array
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "rentify");
  
        const data = await fetch(
          "https://api.cloudinary.com/v1_1/dqhyitlje/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        
        const res = await data.json();
        urls.push(res.secure_url); // Push the URL into the array
      }
  
      return urls; // Return the array of URLs after the loop ends
    } catch (error) {
      console.error("Error uploading image:", error);
      return []; // If there's an error, return an empty array
    }
  }
  