'use strict';

/**
 * adult service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::adult.adult');
