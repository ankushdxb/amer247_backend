'use strict';

/**
 * golden-visa service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::golden-visa.golden-visa');
