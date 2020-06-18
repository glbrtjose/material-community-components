import { InjectionToken } from '@angular/core';
/** Contant used as empty color */
export const EMPTY_COLOR = new InjectionToken('empty-color');
/** Constante to set usedColorStart from the module import */
export const USED_COLORS = new InjectionToken('used-colors');
/**
 * Verify if color has # as a first char. If not, add this char
 * to the color
 * @param color string
 */
export function coerceHexaColor(color) {
    if (color && color.indexOf('#') !== 0) {
        color = `#${color}`;
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
        .map(v => Number.isNaN(parseInt(v, 16)))
        .indexOf(true) === -1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWF0ZXJpYWwtY29tbXVuaXR5LWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb2xvci1waWNrZXIvY29sb3ItcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0Msa0NBQWtDO0FBQ2xDLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FBUyxhQUFhLENBQUMsQ0FBQztBQUVyRSw2REFBNkQ7QUFDN0QsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLElBQUksY0FBYyxDQUFXLGFBQWEsQ0FBQyxDQUFDO0FBc0J2RTs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGVBQWUsQ0FBQyxLQUFhO0lBQzNDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3JDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0tBQ3JCO0lBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4QixPQUFPO0tBQ1I7SUFFRCxPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUFhO0lBQ3hDLHNDQUFzQztJQUN0QyxJQUNFLENBQUMsS0FBSztRQUNOLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRztRQUN2QixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7UUFDaEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ2hCO1FBQ0EsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELDRCQUE0QjtJQUM1QixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztTQUMxQixLQUFLLENBQUMsU0FBUyxDQUFDO1NBQ2hCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIENvbnRhbnQgdXNlZCBhcyBlbXB0eSBjb2xvciAqL1xuZXhwb3J0IGNvbnN0IEVNUFRZX0NPTE9SID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ2VtcHR5LWNvbG9yJyk7XG5cbi8qKiBDb25zdGFudGUgdG8gc2V0IHVzZWRDb2xvclN0YXJ0IGZyb20gdGhlIG1vZHVsZSBpbXBvcnQgKi9cbmV4cG9ydCBjb25zdCBVU0VEX0NPTE9SUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmdbXT4oJ3VzZWQtY29sb3JzJyk7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb2xvclBpY2tlckNvbmZpZyB7XG4gIGVtcHR5X2NvbG9yPzogc3RyaW5nO1xuICB1c2VkX2NvbG9ycz86IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIFRoaXMgaW50ZXJmYWNlIHJlcHJlc2VudHMgb25lIGNvbG9yLiBVc2luZyB0aGlzIGludGVyZmFjZSBpbnN0ZWFkIHNpbXBsZSBzdHJpbmdcbiAqIHdpbGwgaGVscCBzY3JlZW4gcmVhZGVycywgYmVjYXVzZSB0aGUgdGV4dCBhdHRyaWJ1dGUgaXIgc2V0IHRvIHRoZSBhcmlhLWxhYmVsIG9mXG4gKiB0aGUgb3B0aW9uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWNjQ29sb3JQaWNrZXJJdGVtIHtcbiAgdGV4dDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNY2NDb2xvclBpY2tlck9wdGlvbiA9IHN0cmluZyB8IE1jY0NvbG9yUGlja2VySXRlbTtcblxuLyoqXG4gKiBWZXJpZnkgaWYgY29sb3IgaGFzICMgYXMgYSBmaXJzdCBjaGFyLiBJZiBub3QsIGFkZCB0aGlzIGNoYXJcbiAqIHRvIHRoZSBjb2xvclxuICogQHBhcmFtIGNvbG9yIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gY29lcmNlSGV4YUNvbG9yKGNvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoY29sb3IgJiYgY29sb3IuaW5kZXhPZignIycpICE9PSAwKSB7XG4gICAgY29sb3IgPSBgIyR7Y29sb3J9YDtcbiAgfVxuXG4gIGlmICghaXNWYWxpZENvbG9yKGNvbG9yKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiBjb2xvci50b1VwcGVyQ2FzZSgpO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIGlmIHRoZSBjb2xvciBpcyB2YWxpZFxuICogQHBhcmFtIGNvbG9yIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZENvbG9yKGNvbG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgLy8gdmFsaWRhdGUgaWYgY29sb3IgaXMgYW4gaGV4YWRlY2ltYWxcbiAgaWYgKFxuICAgICFjb2xvciB8fFxuICAgIGNvbG9yLmNoYXJBdCgwKSAhPT0gJyMnIHx8XG4gICAgY29sb3IubGVuZ3RoIDwgNCB8fFxuICAgIGNvbG9yLmxlbmd0aCA+IDdcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gdmFsaWRhdGUgcmdiIG9mIHRoZSBjb2xvclxuICByZXR1cm4gY29sb3IucmVwbGFjZSgnIycsICcnKVxuICAgIC5tYXRjaCgvLnsxLDJ9L2cpXG4gICAgLm1hcCh2ID0+IE51bWJlci5pc05hTihwYXJzZUludCh2LCAxNikpKVxuICAgIC5pbmRleE9mKHRydWUpID09PSAtMTtcbn1cbiJdfQ==