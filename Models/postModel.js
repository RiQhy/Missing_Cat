'use strict';
const pool = require('../db');
const promisePool = pool.promise();

const getAllPosts = async () => {
  try {
    // do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const sql = `SELECT post.*, user.email AS name FROM post
                LEFT JOIN user ON post.user_id = user.user_id`;
    const [rows] = await promisePool.query(sql);
    console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql query failed');
  }
};

const getPostById = async (id) => {
  try {
    const sql = `SELECT post.*, user.email AS name FROM post
                LEFT JOIN user ON post.user_id = user.user_id
                WHERE post_id = ?`;
    const [rows] = await promisePool.query(sql, [id]);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql query failed');
  }
};

const insertPost = async (post) => {
  try {
    const sql = `INSERT INTO ${tableName} VALUES (?, ?, ?, ?, ?, ?);`;
    const [rows] = await promisePool.query(sql, [
      null, // id is auto_increment
      post.image,
      post.date,
      post.location,
      post.name,
      post.user_id
    ]);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql insert Post failed');
  }
};
/*
const modifyCat = async (cat, userId) => {
  try {
    const sql = `UPDATE post SET image=?, date=?, location=?, name=?
                WHERE post_id=? AND owner=?`;
    const [rows] = await promisePool.query(sql, [
      cat.name,
      cat.weight,
      cat.owner,
      cat.birthdate,
      cat.id,
      userId
    ]);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql update cat failed');
  }
};
*/
const deletePost = async (id, userId) => {
  // TODO: delete the file itself
  try {
    const sql = `DELETE FROM post WHERE post_id=? AND user_id=?`;
    const [rows] = await promisePool.query(sql, [id, userId]);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql delete Post failed');
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  insertPost,
  deletePost,
};