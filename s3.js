const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
})

// uploads a file to s3
// function uploadFile(file) {
//   const fileStream = fs.createReadStream(file.path)

//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileStream,
//     Key: file.filename,
//   }
//   console.log(fileStream)

//   return s3.upload(uploadParams).promise()
// }
// exports.uploadFile = uploadFile

const uploadFile = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName + '/boards',
    acl: 'public-read-write',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      console.log(file)
      cb(null, `${Date.now()}_${file.originalname}`)
    },
  }),
  limits: { fileSize: 1000 * 1000 * 10 }, // 약 10메가바이트
}).single('image')
module.exports = uploadFile
// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream
