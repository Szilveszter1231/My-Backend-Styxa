import client from './db.js'

export async function loginUser(id) {
  const result = await client.query(`SELECT * FROM users WHERE id = $1`, [id])
  return result.rows[0]
}
