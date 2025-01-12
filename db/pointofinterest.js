import client from './db.js'

// Aszinkron tábla létrehozás
export async function createPoi() {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS pointofinterest(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100),
        description VARCHAR(1000),
        cityid INT,
        CONSTRAINT fk_cityid FOREIGN KEY (cityid) REFERENCES cities(cityid)
      )
    `)
    console.log(
      "Table 'pointofinterest' created successfully or already exists."
    )
  } catch (err) {
    console.error("Error creating table 'pointofinterest':", err)
  }
}

// Adat beszúrása paraméterezett lekérdezéssel
export async function addPoi(name, description, cityid) {
  try {
    const result = await client.query(
      `
      INSERT INTO pointofinterest (name, description, cityid)
      VALUES ($1, $2, $3)
    `,
      [name, description, cityid]
    )
    console.log('Point of interest added successfully.')
    return result.rowCount // Visszaadjuk a beszúrt sorok számát
  } catch (err) {
    console.error('Error adding point of interest:', err)
    throw err // Hibát dobunk, hogy az API kezelje
  }
}

// Az összes POI lekérése
export async function getPoi() {
  try {
    const result = await client.query(`SELECT * FROM pointofinterest`)
    return result.rows // A lekérdezett sorok visszaadása
  } catch (err) {
    console.error('Error fetching points of interest:', err)
    throw err // Hibát dobunk, hogy az API kezelje
  }
}

// POI lekérése ID alapján
export async function getPoiId(id) {
  try {
    const result = await client.query(
      `
      SELECT * FROM pointofinterest WHERE id=$1
    `,
      [id]
    )
    if (result.rows.length === 0) {
      throw new Error(`Point of interest with id ${id} not found`)
    }
    return result.rows[0] // Visszaadjuk az első találatot
  } catch (err) {
    console.error(`Error fetching point of interest with id ${id}:`, err)
    throw err // Hibát dobunk
  }
}

// POI frissítése ID alapján
export async function updatePoi(id, name, description) {
  try {
    const result = await client.query(
      `
      UPDATE pointofinterest
      SET name=$1, description=$2
      WHERE id=$3
    `,
      [name, description, id]
    )

    if (result.rowCount === 0) {
      throw new Error(`No point of interest found with id ${id} to update`)
    }
    console.log(`Updated point of interest with id ${id}`)
    return result.rowCount // A módosított sorok számát adja vissza
  } catch (err) {
    console.error('Error updating point of interest:', err)
    throw err // Hibát dobunk
  }
}

// POI törlése ID alapján
export async function deletePoi(id) {
  try {
    const result = await client.query(
      `
      DELETE FROM pointofinterest WHERE id=$1
    `,
      [id]
    )

    if (result.rowCount === 0) {
      throw new Error(`No point of interest found with id ${id} to delete`)
    }
    console.log(`Deleted point of interest with id ${id}`)
    return result.rowCount // A törölt sorok számát adja vissza
  } catch (err) {
    console.error('Error deleting point of interest:', err)
    throw err // Hibát dobunk
  }
}
