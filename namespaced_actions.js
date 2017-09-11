'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = namespaced_actions;
function namespaced_actions(ns, actions) {
    var nsActions = {};
    for (var key in actions) {
        if (typeof actions[key] === 'function') {
            nsActions[key] = processAction(actions[key], ns + ':' + key);
            nsActions[camelToConst(key)] = ns + ':' + key;
        } else if (_typeof(actions[key]) === 'object') {
            nsActions[key] = namespaced_actions(ns + ':' + key, actions[key]);
        } else {
            throw Error('Unexpected ' + _typeof(actions[key]) + ' : ' + actions[key]);
        }
    }
    return nsActions;

    function processAction(action, key) {
        var oldAction = action;
        action = function action() {
            var a = oldAction.apply(this, arguments);
            a.type = key;
            return a;
        };
        return action;
    }

    function camelToConst(key) {
        return key.replace(/([A-Z]{1})/g, '_$1').toUpperCase();
    }
}
