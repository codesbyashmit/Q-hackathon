const CLOUD_NAME = "dbrzibbne";

export const getOptimizedUrl = (imagePath: string) => {
  const publicId = imagePath.replace(/\.[^/.]+$/, ""); 
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}`;
};