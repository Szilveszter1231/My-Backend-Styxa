import client from './db.js'

export async function loginUser(id) {
  if (isNaN(Number(id))) {
    throw new Error('Invalid ID')
  }
  const result = await client.query(`SELECT * FROM users WHERE id =${id}`)
  return result.rows[0]
}
