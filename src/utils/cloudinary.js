import {fs} from "fs"
import { v2 as cloudinary } from 'cloudinary';

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.hucz5iUzh6Q2aWNBiqYtSnhe60Q
    });
    
   
    const uploadCloudinary= async (locakFilePath)=>{
        try {
            if (!locakFilePath) return null
            //upload the file on cloudinary
            const response = await cloudinary.uploader.upload(locakFilePath,{
                resource_type: "auto"
            })
            
            //uploaded successfully
            console.log("File Uploaded Successfully", response.url);
            return response
            
        } catch (error) {
            fs.unlinkSync(locakFilePath)
            //after failed upload it remove the temprorary file
            return null;
        }
    }

    export {uploadCloudinary}