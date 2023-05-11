import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
// @ts-ignore
export function load({ params }) {
    return { carId: parseInt(params['car_id']) };
}