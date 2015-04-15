/*
 * Copyright 2013 Telefónica I+D
 * All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */


/**
 * Module that defines a parser for `check_snmp_pw*` Nagios plugin.
 *
 * Context attributes to be calculated:
 *
 * - power1 = power used [W] on plug 1
 *
 * @module check_snmp_pw*
 * @see https://www.nagios-plugins.org/doc/man/check_users.html
 * @see https://github.com/nagios-plugins/nagios-plugins/blob/maint/plugins/check_users.c
 */


'use strict';
/* jshint -W101, unused: false */


var nagios = require('./common/nagios');


/**
 * Parser for `check_snmp_pw` Nagios probe.
 * @augments nagios
 */
var parser = Object.create(nagios.parser);


/**
 * Parses `check_users` raw data to extract an object whose members are NGSI context attributes.
 *
 * @function getContextAttrs
 * @memberof parser
 * @param {EntityData} data                 Object holding raw entity data.
 * @returns {Object} Context attributes.
 *
 * <code>
 * Sample data: "SNMP OK - 12 
 *                          ^
 *     #amoiunt of power ---+
 *     =====================+
 * </code>
 */
parser.getContextAttrs = function(probeEntityData) {
    console.log(probeEntityData);
    var data = probeEntityData.data.split('\n')[0];     // only consider first line of probe data, discard perfData
    console.log(data)
    var attrs = { power: NaN };

    var items = data.split('-');
    
    if (items[1]) {
        attrs.power = parseFloat(items[1].trim().split(' ')[0]);
    }

    if (isNaN(attrs.power)) {
        throw new Error('No valid power data found');
    }

    return attrs;
};


/**
 * Parser for `check_snmp_pw` linked to the first plugged power suplier.
 */
exports.parser = parser;
