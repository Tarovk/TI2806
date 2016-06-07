/*exported ObjectResolver*/
/*globals get, RSVP, getJSON*/
/*jshint -W083*/
/**
* This object will create a resolver object. This object contains functions which returns promises
* that contain the requests that are sent to the Octopeer server.
*
* @constructor
* @this {ObjectResolver}
* @param {[String]} The attributes which contains urls you want to resolve
*/
function ObjectResolver(attributes) {
    "use strict";
    
    function isUrl(s) {
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(s);
    }

    /**
    * This function will resolve the attribute of the object
    *
    * @param {String} attr The attribute which contains url you want to resolve
    * @param {Object} object The containing object
    */
    function resolveAttributeFromObject(object, attr) {
        if (!object.hasOwnProperty(attr) || !isUrl(object[attr])) {
            return object[attr];
        }
        get(object[attr], function (obj) {
            object[attr] = obj;
        });
    }

    /**
    * This function will resolve the object
    *
    * @param {Object} object The containing object you want to resolve
    */
    function resolveObject(object) {
        var attr;

        for (attr in attributes) {
            resolveAttributeFromObject(object, attributes[attr]);
        }
    }

    /**
    * This function will resolve a single object
    *
    * @param {Object} object The containing object you want to resolve
    */
    this.resolveSingleObject = function (object) {
        resolveObject(object);
        return object;
    };

    /**
    * This function will resolve an array of objects
    *
    * @param {[Object]} objects The objects you want to resolve
    */
    this.resolveArray = function (objects) {
        var object;
        for (object in objects) {
            resolveObject(objects[object]);
        }
        return objects;
    };
    
    this.resolveArrayOfUrls = function (urls) {
        var url, promises = [];
        for (url in urls) {
            promises.push(new RSVP.Promise(function (fulfill) {
                getJSON(urls[url], function (obj) {
                    fulfill(obj);
                });
            }));
        }
        return RSVP.all(promises);
    };
    
    this.resolveUrl = function (url) {
        var promise = new RSVP.Promise(function (fulfill) {
            getJSON(url, function (obj) {
                fulfill(obj);
            });
        });
        return promise;
    };
}
