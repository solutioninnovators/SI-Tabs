# SI Tabs - Simple, progressive jQuery Tab Switcher
Developed by Mike Spooner (thetuningspoon) for Solution Innovators

SI Tabs is a lightweight, accessible jQuery tab switcher that makes use of progressive enhancement and degrades gracefully. If JS is turned off, all tabbed sections will be visible and clicking on a tab will take you to that section of the page (like a traditional internal anchor). Using a hash in the url will take you directly to the tab with the corresponding ID on page load.

## Usage

1. Include the si-tabs.js file in the head section of your page
2. Add the "tab" class to your tab links.
3. Add the "tabbed" class to the corresponding tabbed sections in the body of the page that you wish to show/hide using the tabs. Give each tabbed section a unique ID.
4. Use the ID of the section you want to point to in the tab link's href, i.e. href="#myTab"
5. Add the "tabbed_default" class on the section you wish to use as the default tab.


## Example usage

```html
<ul>
	<li><a class="tab" href="#section1">Tab 1</a></li>
	<li><a class="tab" href="#section2">Tab 2</a></li>
</ul>

<section class="tabbed" id="section1">
	I am the first tabbed section.
</section> 
<section class="tabbed" id="section2">
	I am the second tabbed section.
</section> 
```
