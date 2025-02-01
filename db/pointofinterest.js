import client from './db.js'

export async function createPoi() {
  await client.query(`
      CREATE TABLE IF NOT EXISTS pointofinterest(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100),
        description VARCHAR(1000),
        Image VARCHAR(1000),
        Map VARCHAR(1000),
        cityid INT,
        CONSTRAINT fk_cityid FOREIGN KEY (cityid) REFERENCES cities(id)
      )
    `)
}

export async function addPoi(name, description, image, map, cityid) {
  try {
    const result = await client.query(
      `
      INSERT INTO pointofinterest (name, description,image,map, cityid)
      VALUES ('${name}', '${description}', '${image}','${map}',${cityid})
    `
    )
    console.log('Point of interest added successfully.')
    return result.rowCount
  } catch (err) {
    console.error('Error adding point of interest:', err)
    throw err
  }
}

export async function getPoi() {
  try {
    const result = await client.query(`SELECT * FROM pointofinterest`)
    return result.rows
  } catch (err) {
    console.error('Error fetching points of interest:', err)
    throw err
  }
}

export async function getPoiId(id) {
  if (isNaN(id)) {
    console.error('Invalid POI ID:', id)
  }

  console.log(`Fetching point of interest with id ${id}`)
  const result = await client.query(
    `SELECT * FROM pointofinterest WHERE id=${id}`
  )
  console.log(`Fetched point of interest: ${JSON.stringify(result.rows)}`)
  return result.rows
}

export async function updatePoi(id, name, description) {
  try {
    const result = await client.query(
      `
      UPDATE pointofinterest
      SET name='${name}', description=${description}
      WHERE id=${id}
    `
    )

    if (result.rowCount === 0) {
      throw new Error(`No point of interest found with id ${id} to update`)
    }
    console.log(`Updated point of interest with id ${id}`)
    return result.rowCount
  } catch (err) {
    console.error('Error updating point of interest:', err)
    throw err
  }
}
export async function deletePoi(id) {
  try {
    const result = await client.query(
      `
      DELETE FROM pointofinterest WHERE id=${id}
    `
    )

    if (result.rowCount === 0) {
      throw new Error(`No point of interest found with id ${id} to delete`)
    }
    console.log(`Deleted point of interest with id ${id}`)
    return result.rowCount
  } catch (err) {
    console.error('Error deleting point of interest:', err)
    throw err
  }
}
