import client from './db.js'

export function creatCities() {
  client.query(`
        CREATE TABLE IF NOT EXISTS cities(
        cityid INT GENERATED ALWAYS AS IDENTITY,
        cityname VARCHAR (40),
        description VARCHAR(2000),
        population VARCHAR(200),
        PRIMARY KEY (cityid)
        )`)
}

export async function addCities(cityname, description, population) {
  await client.query(`
        INSERT INTO cities(cityid,cityname,description,population)
        VALUES (DEFAULT,'${cityname}','${description}','${population}')        
        `)
}

export async function getCities() {
  const cities = await client.query(`SELECT * FROM cities`)
  return cities.rows
}
export async function getCityid(cityid) {
  const cities = await client.query(
    `SELECT * FROM cities WHERE cityid= ${cityid} `
  )
  return cities.rows
}

export async function updateCities(cityid, cityname, description, population) {
  const cities = await client.query(`
    UPDATE cities SET cityname='${cityname}', description='${description}', population='${population}' WHERE cityid=${cityid} `)
  return cities.rows
}

export async function deleteCities(cityid) {
  const cities = await client.query(
    ` DELETE FROM cities WHERE cityid = ${cityid}`
  )
  return cities.rows
}
