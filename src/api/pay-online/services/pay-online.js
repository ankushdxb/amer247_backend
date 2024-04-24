'use strict';

/**
 * pay-online service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pay-online.pay-online');
