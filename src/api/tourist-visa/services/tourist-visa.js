'use strict';

/**
 * tourist-visa service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tourist-visa.tourist-visa');
