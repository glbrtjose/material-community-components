import { InjectionToken } from '@angular/core';
/** Contant used as empty color */
export var EMPTY_COLOR = new InjectionToken('empty-color');
/** Constante to set usedColorStart from the module import */
export var USED_COLORS = new InjectionToken('used-colors');
/**
 * Verify if color has # as a first char. If not, add this char
 * to the color
 * @param color string
 */
export function coerceHexaColor(color) {
    if (color && color.indexOf('#') !== 0) {
        color = "#" + color;
    }
    if (!isValidColor(color)) {
        return;
    }
    return color.toUpperCase();
}
/**
 * Validate if the color is valid
 * @param color string
 */
export function isValidColor(color) {
    // validate if color is an hexadecimal
    if (!color ||
        color.charAt(0) !== '#' ||
        color.length < 4 ||
        color.length > 7) {
        return false;
    }
    // validate rgb of the color
    return color.replace('#', '')
        .match(/.{1,2}/g)
        .map(function (v) { return Number.isNaN(parseInt(v, 16)); })
        .indexOf(true) === -1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWF0ZXJpYWwtY29tbXVuaXR5LWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb2xvci1waWNrZXIvY29sb3ItcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0Msa0NBQWtDO0FBQ2xDLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FBUyxhQUFhLENBQUMsQ0FBQztBQUVyRSw2REFBNkQ7QUFDN0QsTUFBTSxDQUFDLElBQU0sV0FBVyxHQUFHLElBQUksY0FBYyxDQUFXLGFBQWEsQ0FBQyxDQUFDO0FBc0J2RTs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGVBQWUsQ0FBQyxLQUFhO0lBQzNDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3JDLEtBQUssR0FBRyxNQUFJLEtBQU8sQ0FBQztLQUNyQjtJQUVELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDeEIsT0FBTztLQUNSO0lBRUQsT0FBTyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBYTtJQUN4QyxzQ0FBc0M7SUFDdEMsSUFDRSxDQUFDLEtBQUs7UUFDTixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUc7UUFDdkIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQ2hCLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNoQjtRQUNBLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCw0QkFBNEI7SUFDNUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7U0FDMUIsS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUNoQixHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQztTQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBDb250YW50IHVzZWQgYXMgZW1wdHkgY29sb3IgKi9cbmV4cG9ydCBjb25zdCBFTVBUWV9DT0xPUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdlbXB0eS1jb2xvcicpO1xuXG4vKiogQ29uc3RhbnRlIHRvIHNldCB1c2VkQ29sb3JTdGFydCBmcm9tIHRoZSBtb2R1bGUgaW1wb3J0ICovXG5leHBvcnQgY29uc3QgVVNFRF9DT0xPUlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nW10+KCd1c2VkLWNvbG9ycycpO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JQaWNrZXJDb25maWcge1xuICBlbXB0eV9jb2xvcj86IHN0cmluZztcbiAgdXNlZF9jb2xvcnM/OiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBUaGlzIGludGVyZmFjZSByZXByZXNlbnRzIG9uZSBjb2xvci4gVXNpbmcgdGhpcyBpbnRlcmZhY2UgaW5zdGVhZCBzaW1wbGUgc3RyaW5nXG4gKiB3aWxsIGhlbHAgc2NyZWVuIHJlYWRlcnMsIGJlY2F1c2UgdGhlIHRleHQgYXR0cmlidXRlIGlyIHNldCB0byB0aGUgYXJpYS1sYWJlbCBvZlxuICogdGhlIG9wdGlvblxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1jY0NvbG9yUGlja2VySXRlbSB7XG4gIHRleHQ6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWNjQ29sb3JQaWNrZXJPcHRpb24gPSBzdHJpbmcgfCBNY2NDb2xvclBpY2tlckl0ZW07XG5cbi8qKlxuICogVmVyaWZ5IGlmIGNvbG9yIGhhcyAjIGFzIGEgZmlyc3QgY2hhci4gSWYgbm90LCBhZGQgdGhpcyBjaGFyXG4gKiB0byB0aGUgY29sb3JcbiAqIEBwYXJhbSBjb2xvciBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvZXJjZUhleGFDb2xvcihjb2xvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGNvbG9yICYmIGNvbG9yLmluZGV4T2YoJyMnKSAhPT0gMCkge1xuICAgIGNvbG9yID0gYCMke2NvbG9yfWA7XG4gIH1cblxuICBpZiAoIWlzVmFsaWRDb2xvcihjb2xvcikpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gY29sb3IudG9VcHBlckNhc2UoKTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBpZiB0aGUgY29sb3IgaXMgdmFsaWRcbiAqIEBwYXJhbSBjb2xvciBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRDb2xvcihjb2xvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIC8vIHZhbGlkYXRlIGlmIGNvbG9yIGlzIGFuIGhleGFkZWNpbWFsXG4gIGlmIChcbiAgICAhY29sb3IgfHxcbiAgICBjb2xvci5jaGFyQXQoMCkgIT09ICcjJyB8fFxuICAgIGNvbG9yLmxlbmd0aCA8IDQgfHxcbiAgICBjb2xvci5sZW5ndGggPiA3XG4gICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIHZhbGlkYXRlIHJnYiBvZiB0aGUgY29sb3JcbiAgcmV0dXJuIGNvbG9yLnJlcGxhY2UoJyMnLCAnJylcbiAgICAubWF0Y2goLy57MSwyfS9nKVxuICAgIC5tYXAodiA9PiBOdW1iZXIuaXNOYU4ocGFyc2VJbnQodiwgMTYpKSlcbiAgICAuaW5kZXhPZih0cnVlKSA9PT0gLTE7XG59XG4iXX0=