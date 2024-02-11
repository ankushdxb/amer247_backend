'use strict';

/**
 * medical-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::medical-test.medical-test');
