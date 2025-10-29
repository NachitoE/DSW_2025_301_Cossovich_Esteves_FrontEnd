import axios from "axios";

const cloudinaryClient = axios.create();

export async function uploadImage(uploadData: FormData){
    return await cloudinaryClient.post(
        "https://api.cloudinary.com/v1_1/dzxlynhfm/image/upload",
        uploadData
    );
}