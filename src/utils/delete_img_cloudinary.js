const cloudinary = require("cloudinary").v2

const deleteImgCloudinary = (imgUrl) => {
  const imgSplitted = imgUrl.split('/')
  const nameSplitted = imgSplitted[imgSplitted.length -1].split('.') 
  const folderSplitted = imgSplitted[imgSplitted.length -3] + '/' + imgSplitted[imgSplitted.length -2]
  const public_id = `${folderSplitted}/${nameSplitted[0]}`
  cloudinary.uploader.destroy(public_id, () => {

    console.log(`image deleted in cloudinary`)
  }) 
}

module.exports = { deleteImgCloudinary }