import * as  Sequelize from 'sequelize';
import dbConfig from './../../config/db';
import LeadsModel from './../../models/leads';

module.exports.list = async (event: any, context: any, callback: any) => {
    const Leads = LeadsModel(dbConfig, Sequelize)
    const responseHeader: object = {
        'Content-Type': 'application/json'
    };
    try {
        const limit: number = Number(event?.queryStringParameters?.limit || 10);
        const offset: number = Number(event?.queryStringParameters?.offset || 0);
        const order: string = event?.queryStringParameters?.order || 'created_at';
        const sort: string = event?.queryStringParamteres?.sort || 'DESC';
        const where: any = {}; // ToDo - filtering the data based on the query inputs...
        const { count, rows } = await Leads.findAndCountAll({
            where,
            order: [[order, sort]],
            limit,
            offset
        });
        const response: object = {
            statusCode: 200,
            headers: responseHeader,
            body: JSON.stringify({
                data: rows,
                count,
                per_page: limit,
                page: offset,
            }),
        };
        return callback(null, response);
    }
    catch (e) {
        return callback(null, {
            statusCode: 501,
            headers: responseHeader,
            body: e.message
        });
    }
};