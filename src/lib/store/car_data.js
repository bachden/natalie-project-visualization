// @ts-nocheck
import { readable } from 'svelte/store'

import { businesses } from './vast2021_businesses'
import { carstops } from './vast2021_carstops'
import { gps_coordinates } from './vast2021_gps_coordinates'

const carList = []

const radius = 6371000.0; //Earth Radius in m

/**
 * @param {number} lat
 * @param {number} long
 * @param {number} ratio
 */
function calcGlobalXY(lat, long, ratio) {
    return { //
        globalX: radius * long * ratio, // ratio should be <= 1
        globalY: radius * lat
    };
}

const gpsCoordinates = gps_coordinates //
    .filter(ele => ele['car_id'] ? true : false) //
    .map(function (/** @type {{ [x: string]: any; }} */ ele) {
        let id = ele['car_id'];
        id = typeof id != 'number' ? parseInt(id) : id;

        // @ts-ignore
        if (carList.indexOf(id) === -1) {
            carList.push(id)
        }

        const global = calcGlobalXY(ele.lat, ele.long, 1)
        return {
            ...ele,
            ...global
        }
    });

const interest = businesses.map(ele => {
    const global = calcGlobalXY(ele.lat, ele.long, 1)
    return {
        ...ele,
        ...global
    }
})

carList.sort((a, b) => a - b)

export const carData = readable({
    carList,
    interest,
    gpsCoordinates,
    carStops: carstops,
}, function (set) {
    return function stop() { };
})