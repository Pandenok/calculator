# Project: Calculator (JavaScript Basics)

I made this project while running through the Web Development 101 course at The Odin Project. The final (for now) result can be viewed [here](). 

A simple on-screen calculator written in JavaScript.

# Task List

    - [ ] 

    - [ ] 

    - [ ] 

# What I learned

## HTML

## CSS

### Perfect rendering on the entire page

```css
html, body {
    margin: 0;
    min-height: 100%;
}
```
### Centering an element in the body

```css
#wrapper {
     width: ...
     margin: 0 auto;
 }
```

Using `height` instead of `min-height` left my background white w/o the background-color applied when I expanded some collapsible divs in the middle of my page. `min-height` fixed that. 

### Footer

- Displays at the bottom of the screen no matter how much content is on the actual page. 

```css
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
```
- if there is enough content on the page to push the footer lower, it still does that. But if the content on the page is short, a sticky footer will still hang to the bottom of the browser window.

[Sticky footer, 5 ways](https://css-tricks.com/couple-takes-sticky-footer/)

### How To Center an Object Exactly In The Center

- If you know the height and width of both the element to be centered and its parent element one foolproof way to center the element is just 
to absolute position it with pixel values so it looks perfectly centered.

[Quick CSS Trick](https://css-tricks.com/quick-css-trick-how-to-center-an-object-exactly-in-the-center/)
```css
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
```

- The hard comes in when you don’t know the dimensions of the element to be centered. [Centering in the Unknown](https://css-tricks.com/centering-in-the-unknown/)

### Resetting Default Button Styles

[How to override default button styles](https://css-tricks.com/overriding-default-button-styles/)

[Reset Buttons](https://gist.github.com/MoOx/9137295)

### Shorthand GridArea

grid-area: row-start / column-start / row-end / column-end

```css
grid-area: 6 / 3 / 7 / 5;
```
### Setting a max character length

The full answer is [here](https://stackoverflow.com/questions/26973570/setting-a-max-character-length-in-css). 
V K Singh solution:

```css
p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 75ch;
}
```

## JavaScript

### RegEx

- match a number, also with a floating point `(\d+(?:\.\d+)?)+`;
- match one of the symbols `[-+\/*()]`;
- solution for unary and binary `-`
```javascript
console.log("-5.42+2--3*-5.5/-2+-4"
        .replace(/^-|([+\-*/])-/g, "$1#")
        .split(/([+\-*/])/)
        .map(e => e.replace("#", "-"))
);
```

### Happy Path vs Edge Cases
“what the average person would do” vs "a troublemaker who tries to break your program"

### InnerText vs TextContent

[StackOverflow](https://stackoverflow.com/questions/35213147/difference-between-textcontent-vs-innertext)

[Kelly Norton](https://kellegous.com/j/2013/02/27/innertext-vs-textcontent/)

[The poor, misunderstood innerText ](http://perfectionkills.com/the-poor-misunderstood-innerText/)

### Change text only in an element

Get the first textNode by firstChild property and update the content

[Swapping Out Text, Five Different Ways](https://css-tricks.com/swapping-out-text-five-different-ways/)

### Round to at most 2 decimal places (only if necessary)

For the "when necessary" requirement, do this: `parseFloat(number.toFixed(decimalPlaces));`
Extended [answer](https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary/11832950#11832950) on StackOverflow 

### Adding a 0 before decimal entered in input

- You can use `parseFloat` function to format float numbers.
- The same can be accomplished with a unary plus (e.g., `console.log( +x )`) or by multiply by 1 (*1) to make it numeric (`console.log( x*1 )`).

### Toggle (hide/unhide) DOM elements with Javascript

Nice explanation how to [deal with multiple elements](https://stackoverflow.com/questions/21070101/show-hide-div-using-javascript).
Still need to go deeper on how to use `forEach` instead of `for` loop and when/how/if it's possible.

### HTML DOM `click()` Method

Simulates a mouse click on an element.
When `click()` is used with supported elements (such as an `<input>`), it fires the element's click event. This event then bubbles up to elements higher in the document tree (or event chain) and fires their click events.

# Future Improvements

    - [ ] 

    - [ ] 

    - [ ] 

## Bugs Reported by Community

    - [ ] 

    - [ ] 

    - [ ] 

    - [ ] 
