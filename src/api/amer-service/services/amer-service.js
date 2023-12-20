'use strict';

/**
 * amer-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::amer-service.amer-service');
