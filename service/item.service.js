import axios from 'axios'

// const ITEM_URL = 'http://127.0.0.1:3030/api/item/'
const ITEM_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/item'
    : '//localhost:3030/api/item/'
export const itemService = {
  query,
  getById,
  remove,
  save,
  getEmptyItem,
}

async function query(filterValue) {
  try {
    const items = await axios.get(ITEM_URL, { params: filterValue })
    return items.data
  } catch (error) {
    throw new Error('error on quey FE', error)
  }
}

async function getById(id) {
  try {
    return await axios.get(ITEM_URL + id).then((res) => res.data)
  } catch (error) {
    throw new Error('error on getById FE', error)
  }
}

async function remove(id) {
  try {
    return await axios.delete(`${ITEM_URL}${id}/`)
  } catch (error) {
    throw new Error('error on remove Fe', error)
  }
}

async function save(item) {
  console.log(item)
  try {
    if (item._id) {
      return await axios.put(`${ITEM_URL}`, item)
    }
    // const addedItem = await axios.post(`${ITEM_URL}`, { ...item })
    const addedItem = await axios.post(`${ITEM_URL}`, item)
    return addedItem.data
  } catch (error) {
    throw new Error('error on save fe', error)
  }
}

function getEmptyItem(title = 'new item',) {
  return {
    title,
    status: 'new',
    description: 'item description goes here',
    importance: 3,
    createdAt: Date.now(),
    lastTriedAt: null,
    triesCount: 0,
    doneAt: null,
    errors: [],
  }
}
