/**
* blackjack-utils.js
* @author Sidharth Mishra
* @description Black Jack utils, functions for making work with lists easy :)
* @created Wed Nov 08 2017 18:58:50 GMT-0800 (PST)
* @copyright 2017 Sidharth Mishra
* @last-modified Wed Nov 08 2017 18:58:50 GMT-0800 (PST)
*/

/**
 * Gives the last element of the list
 *@param {any[]} list The list of items
 */
export function last(list) {
  if (!list || list.length === 0) return null;
  return list[list.length - 1];
}

/**
 * Returns the head of the list - the first element
 * @param {any[]} list The list of items
 */
export function head(list) {
  if (!list || list.length === 0) return null;
  return list[0];
}

/**
 * returns all other items except the last item of the list
 * @param {any[]} list The list of items
 */
export function tail(list) {
  if (!list || list.length === 0) return [];
  return list.splice(1);
}
