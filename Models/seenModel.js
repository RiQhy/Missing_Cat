'use strict';
const pool = require('../db');
const promisePool = pool.promise();

const getAllSeenImages = async () => {
  try {
    const sql = `SELECT * FROM seen`;
    const [rows] = await promisePool.query(sql);
    console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql query failed');
  }
};

const getSeenById = async (id) => {
  try {
    const sql = `SELECT * FROM seen WHERE seen_id = ?`;
    const [rows] = await promisePool.query(sql, [id]);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql query failed');
  }
};

const insertSeen = async (seen) => {
  try {
    const sql = `INSERT INTO seen VALUES (?, ?, ?, ?);`;
    const [rows] = await promisePool.query(sql, [
      null, // id is auto_increment
      seen.image,
      seen.date,
      seen.location
    ]);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql insert Seen failed');
  }
};
const deleteSeen = async (id) => {
  try {
    const sql = `DELETE FROM seen WHERE seen_id=?`;
    const [rows] = await promisePool.query(sql, [id]);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql delete Seen failed');
  }
};

module.exports = {
  getAllSeenImages,
  getSeenById,
  insertSeen,
  deleteSeen,
};