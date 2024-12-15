import cloudinary from "../configs/cloudinary.config.js";
import {ServiceError} from "../errors/ServiceError.error.js";
import errorCodes from "./errorCodes.util.js";

const saveImage = async (image, file)=>{

    const base64Image = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;

    const res = await new Promise ((resolve, reject)=>{
        cloudinary.uploader.upload_stream({
            folder: file,
            stream: base64Image,
            resource_type: 'auto',
            public_id: `${file}/${Date.now()}`,
            encoding: 'base64'
        },
        (error, result)=>{
            if (error) reject(new ServiceError(error.message, errorCodes.IMAGES.NOT_FOUND));
            else resolve(result.secure_url);
        }).end(base64Image);
    })

    return res;
}

export default saveImage;