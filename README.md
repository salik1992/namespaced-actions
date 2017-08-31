# Namespaced actions
Action creator for flux to create namespaced actions without the need to specify action type.

Example of use

## Actions
```javascript
import namespaced_actions from 'namespaced-actions'

export default namespaced_actions('Cache', {
    filter: (fieldset, search) => ({ fieldset, search }),
    insert: (fieldset, values) => ({ fieldset, values }),
    remove: (fieldset, values) => ({ fieldset, values }),
    controls: {
        chooseNext: (fieldset) => ({ fieldset }),
        choosePrev: (fieldset) => ({ fieldset })
    }
});
```

## Reducer
```javascript
import Cache from '../actions/cache'

const CacheReducer = (state, action) => {
    state = state || loadStored();
    switch (action.type) {
        case Cache.FILTER:
            return filter(action.fieldset, action.search, state);
        case Cache.INSERT:
            return insert(action.fieldset, action.values, state);
        case Cache.REMOVE:
            return remove(action.fieldset, action.search, state);
        case Cache.controls.CHOOSE_NEXT:
            return chooseNext(action.fieldset, state);
        case Cache.controls.CHOOSE_PREV:
            return choosePrev(action.fieldset, state);
        default:
            return state;
    }
};
export default CacheReducer;
```
