import client from './db.js'

export async function createUsers() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users(
      id INT GENERATED ALWAYS AS IDENTITY,
      firstname VARCHAR(255),
      lastname VARCHAR(255),
      username VARCHAR(255),
      password VARCHAR(1000),
      PRIMARY KEY (id)
    )
  `)
}

export async function addUser(firstname, lastname, username, password) {
  await client.query(
    `
    INSERT INTO users(firstname, lastname, username, password)
    VALUES($1, $2, $3, $4)`,
    [firstname, lastname, username, password]
  )
}

export async function getUser() {
  const result = await client.query(`SELECT * FROM users`)
  return result.rows
}

export async function updateUser(firstname, lastname, username, id) {
  await client.query(
    `
    UPDATE users SET firstname='${firstname}', lastname='${lastname}', username='${username}' WHERE id=${id}`
  )
}

export async function deleteUser(id) {
  await client.query(`DELETE FROM users WHERE id=$1`, [id])
}
