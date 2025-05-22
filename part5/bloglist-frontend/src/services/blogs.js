import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlog, userToken) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  })

  return response.data
}

const updateBlog = async (id, newBlog, userToken) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  })

  return response.data
}

const deleteBlog = async (id, userToken) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  })

  return response.data
}

export default { getAll, createBlog, updateBlog, deleteBlog }