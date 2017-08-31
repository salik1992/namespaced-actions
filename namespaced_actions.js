export default function namespaced_actions(ns, actions) {
    let nsActions = {};
    for (let key in actions) {
        if (typeof actions[key] === 'function') {
            nsActions[key] = processAction(actions[key], ns + ':' + key);
            nsActions[camelToConst(key)] = ns + ':' + key;
        }
        else if (typeof actions[key] === 'object') {
            nsActions[key] = namespaced_actions(ns + ':' + key, actions[key]);
        }
        else {
            throw Error('Unexpected ' + typeof actions[key] + ' : ' + actions[key]);
        }
    }
    return nsActions;

    function processAction(action, key) {
        const oldAction = action;
        action = function() {
            let a = oldAction.apply(this, arguments);
            a.type = key;
            return a;
        }
        return action;
    }

    function camelToConst(key) {
        return key.replace(/([A-Z]{1})/g, '_$1').toUpperCase();
    }
}