import { data } from './data.js';

function customFilter(dataArray, filteringObject){
    const filterKeys = Object.keys(filteringObject);

    const result = dataArray.filter(item => {
        const exist = isMultiplePresence(Object.keys(item), filterKeys);
        if (!exist) {
            return false;
        }

        let checked = true;
        filterKeys.every(filterKey => {
            if (!checked) {
                return false;
            }
            if (Array.isArray(filteringObject[filterKey])) {
                // Can be simplified if types of filter values are only string and array, but script will fail if type differs
                // return checked = typeof item[filterKey] === 'string' ?
                //     filteringObject[filterKey].includes(item[filterKey]) :
                //     isMultiplePresence(item[filterKey], filteringObject[filterKey]);

                if (typeof item[filterKey] === 'string') {
                    return checked = filteringObject[filterKey].includes(item[filterKey]);
                } else if (Array.isArray(item[filterKey])) {
                    return checked = isMultiplePresence(item[filterKey], filteringObject[filterKey]);
                }
            }

            if (typeof filteringObject[filterKey] === 'string') {
                // Can be simplified if types of filter values are only string and array, but script will fail if type differs
                // return checked = typeof item[filterKey] === 'string' ?
                //     item[filterKey] === filteringObject[filterKey] :
                //     item[filterKey].includes(filteringObject[filterKey]);

                if (typeof item[filterKey] === 'string') {
                    return checked = item[filterKey] === filteringObject[filterKey];
                } else if (Array.isArray(item[filterKey])) {
                    return checked = item[filterKey].includes(filteringObject[filterKey]);
                }
            }
        });

        return checked;
    });
    console.log(result);
}

function isMultiplePresence(haystack, needle) {
    return needle.every(value => {
        return haystack.includes(value);
    });
}

customFilter(data, {category:["bal"], regions:["chest"], image: ['bal_053.png']});