import client from './db.js'

export function creatCities() {
  client.query(`
        CREATE TABLE IF NOT EXISTS cities(
        id INT GENERATED ALWAYS AS IDENTITY,
        cityname VARCHAR (40),
        description VARCHAR(2000),
        population INT,
        image VARCHAR(1000),
        map VARCHAR(1000),
        PRIMARY KEY (id)
        )`)
}

export async function addCities(cityname, description, population, image, map) {
  await client.query(`
        INSERT INTO cities(id,cityname,description,population, image, map)
        VALUES (DEFAULT,'${cityname}','${description}',${population}, '${image}','${map}')        
        `)
}

export async function getCities() {
  const cities = await client.query(`SELECT * FROM cities`)
  return cities.rows
}
export async function getCityid(id) {
  const cities = await client.query('SELECT * FROM cities WHERE id=$1', [id])
  return cities.rows
}

export async function updateCities(id, cityname, description, population) {
  await client.query(`
    UPDATE cities SET cityname='${cityname}', description='${description}', population=${population} WHERE id=${id} `)
}

export async function deleteCities(id) {
  const cities = await client.query(` DELETE FROM cities WHERE id = ${id}`)
  return cities.rows
}
