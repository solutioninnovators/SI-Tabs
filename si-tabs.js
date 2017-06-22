/**
 * SI Tabs - Simple, progressive jQuery Tab Switcher
 * Developed by Mike Spooner (thetuningspoon) for Solution Innovators
 *
 */

$(document).ready(function() {
        // Config - Feel free to change these classes to suit your naming conventions
        var tabClass = 'tab';
        var tabbedClass = 'tabbed';
        var defaultTabClass = 'tabbed_default';
        var activeTabClass = 'tab_active';

    var hash = window.location.hash.substring(1); // Get the anchor hash from the url
    var $tabbedSections = $('.'+tabbedClass);
    
    if(hash)
        switchTab(hash);
    else
        switchTab($('.'+defaultTabClass).attr('id'));

    $('.'+tabClass+'[href*=\\#]').on('click', function(e) {
        var $this = $(this);
        var tabName = $this.attr('href').substring(1);

        if(tabName == window.location.hash) return; // Stop if we're already on the tab

        e.preventDefault(); // Prevent the default action of jumping to the ID

        // Manually add the hash to the URL since preventDefault stops it from getting added
        if(history.pushState) {
            history.pushState(null, null, '#'+tabName);
        }
        else {
            window.location.hash = tabName;
        }

        switchTab(tabName);
    });

    /**
     * @param name Name of the tab to switch to
     */
    function switchTab(name) {
        $tabbedSections.hide(); // Hide contents of other tabs
        $('#'+ name).show(); // Show selected tab content

        $('.'+tabClass).removeClass(activeTabClass); // Remove active class from other tabs
        $('.'+tabClass+'[href=\\#'+name+']').addClass(activeTabClass); // Add active class to this tab

        $(window).trigger('tabSwitched');
        $(window).trigger('load resize'); // Makes sure to trigger refresh of any js that responds to the window resize event to calculate layout (i.e. columnizer, matchheight)
    }
});