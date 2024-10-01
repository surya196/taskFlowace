import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Surya@98",
    database: process.env.DB_NAME || "user",
};

const pool = mysql.createPool(dbConfig);

export const getConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL Connected via Pool...');
        return connection;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }   
};