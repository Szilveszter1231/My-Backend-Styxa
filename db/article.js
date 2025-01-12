import client from './db.js'

export function createCikkek() {
  client.query(`
      CREATE TABLE IF NOT EXISTS cikkek (
        cikkID INT GENERATED ALWAYS AS IDENTITY,
        cikkCim VARCHAR(40),
        cikkDatum TIMESTAMP,
        szerzoID INT,
        szoveg VARCHAR(255),
  
        PRIMARY KEY (cikkID),
        CONSTRAINT fk_szerzoID FOREIGN KEY (szerzoID) REFERENCES felhasznalok(id)
      )`)
}

export async function addCikkek(cim, szerzoID, szoveg) {
  await client.query(`
     INSERT INTO cikkek(cikkID, cikkCim,cikkDatum,szerzoID,szoveg)  
     VALUES(DEFAULT,'${cim}',NOW(),${szerzoID},'${szoveg}') `)
}

export async function getCikkek() {
  const cikkek = await client.query(`SELECT * FROM cikkek`)
  return cikkek.rows
}

export async function updateCikkek(cikkCim, cikkID) {
  return await client.query(`
      UPDATE cikkek
      SET cikkCim='${cikkCim}'
      WHERE cikkID=${cikkID}`)
}

export async function deleteCikkek(id) {
  const cikkek = await client.query(`
      DELETE FROM cikkek
      WHERE cikkID = ${id}
    `)
  return cikkek.rows
}

export async function truncateCikkek() {
  await client.query(`TRUNCATE TABLE cikkek`)
}
