import { uuidv7 } from 'uuidv7';

/**
 * Returns an uuid string in hex format.
 *
 * @returns { String }
 */
export function createId(): string {
    return uuidv7().replace(/-/g, '');
}

export default {
    createId,
};
