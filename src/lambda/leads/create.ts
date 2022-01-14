import * as Joi from 'joi';
import * as  Sequelize from 'sequelize';

import dbConfig from './../../config/db';
import LeadsModel from './../../models/leads';
import InterestsModel from './../../models/interests';

module.exports.create = async (event: any, context: any, callback: any) => {
    const Leads = LeadsModel(dbConfig, Sequelize);
    const Interests = InterestsModel(dbConfig, Sequelize);

    const schema: any = Joi.object().keys({
        email: Joi.string().min(3).required().email(),
        phone: Joi.string().alphanum().min(3).max(20).required(),
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        message: Joi.string().min(3).required(),
    });

    const { error } = schema.validate(event.body);
    if (error) {
        return callback(null, {
            statusCode: 422,
            body: error.details[0].message
        });
    }
    const textResponseHeaders: object = {
        'Content-Type': 'text/plain'
    };

    const data = event.body;
    try {
        const [lead, created] = await Leads.findOrCreate({
            where: { email: data.email, phone: data.phone },
            defaults: {
                first_name: data.first_name,
                last_name: data.last_name,
            }
        });
        const lead_id: number = lead.id;
        await Interests.create({ lead_id, message: data.message });

        return callback(null, {
            statusCode: created ? 201 : 202,
            headers: textResponseHeaders,
            body: created ? "New Lead has been created .." : `A new Interest has been added to the lead with ID (${lead_id}) `,
        });
    }
    catch (error) {
        return callback(null, {
            statusCode: error.statusCode || 501,
            headers: textResponseHeaders,
            body: error.message,
        });
    }
};