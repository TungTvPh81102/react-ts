import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
      formData
    )
    return response.data.secure_url
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error)
    throw error
  }
}
