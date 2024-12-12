import cloudinary from "../configs/cloudinary.config";

const saveImage = async (image, file)=>{

    const res = await new Promise ((resolve, reject)=>{
        cloudinary.uploader.upload_stream({
            folder: file,
            stream: image,
            resource_type: 'auto',
            public_id: `${file}/${Date.now()}`,
            encoding: 'base64'
        },
        (error, result)=>{
            if (error) reject(new ServiceError(error.message, 500));
            resolve(result.secure_url);
        }).end(image);
    })

    return res;
}

export default saveImage;