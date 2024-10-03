import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { BadRequestError } from '../util/errorUtil';
dotenv.config();

const dbConfigs = {
    userDb: {
        host: process.env.USER_DB_HOST || "localhost",
        user: process.env.USER_DB_USER || "root",
        password: process.env.USER_DB_PASSWORD || "Surya@98",
        database: process.env.USER_DB_NAME || "user",
    },
    tenant001: {
        host: process.env.TENANT001_DB_HOST || 'localhost',
        user: process.env.TENANT001_DB_USER || 'root',
        password: process.env.TENANT001_DB_PASSWORD || 'Surya@98',
        database: process.env.TENANT001_DB_NAME || 'tenant001',
    },
    tenant002: {
        host: process.env.TENANT002_DB_HOST || 'localhost',
        user: process.env.TENANT002_DB_USER || 'root',
        password: process.env.TENANT002_DB_PASSWORD || 'Surya@98',
        database: process.env.TENANT002_DB_NAME || 'tenant002',
    },
    tenant003: {
        host: process.env.TENANT003_DB_HOST || 'localhost',
        user: process.env.TENANT003_DB_USER || 'root',
        password: process.env.TENANT003_DB_PASSWORD || 'Surya@98',
        database: process.env.TENANT003_DB_NAME || 'tenant003',
    },
    tenant004: {
        host: process.env.TENANT004_DB_HOST || 'localhost',
        user: process.env.TENANT004_DB_USER || 'root',
        password: process.env.TENANT004_DB_PASSWORD || 'Surya@98',
        database: process.env.TENANT004_DB_NAME || 'tenant004',
    },
    tenant005: {
        host: process.env.TENANT005_DB_HOST || 'localhost',
        user: process.env.TENANT005_DB_USER || 'root',
        password: process.env.TENANT005_DB_PASSWORD || 'Surya@98',
        database: process.env.TENANT005_DB_NAME || 'tenant005',
    },
};

const pools: { [key: string]: mysql.Pool } = {
    userDb: mysql.createPool(dbConfigs.userDb),
    tenant001: mysql.createPool(dbConfigs.tenant001),
    tenant002: mysql.createPool(dbConfigs.tenant002),
    tenant003: mysql.createPool(dbConfigs.tenant003),
    tenant004: mysql.createPool(dbConfigs.tenant004),
    tenant005: mysql.createPool(dbConfigs.tenant005),
};

export const getConnection = async (tenant: string) => {
    if (!pools[tenant]) {
        throw new BadRequestError('Invalid tenant specified');
    }

    try {
        const connection = await pools[tenant].getConnection();
        console.log(`Connected to ${tenant} database`);
        return connection;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};