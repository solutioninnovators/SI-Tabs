/**
 * SI Tabs 2.0 - Simple, progressive jQuery Tab Switcher
 * Developed by Mike Spooner (thetuningspoon) for Solution Innovators
 *
 */

function SiTabs(options) {
    var that = this; // Store this for use in event handlers

    // Default configuration options if none specified
    var defaults = {
        tabClass: 'tab',
        tabbedClass: 'tabbed',
        defaultTabClass: 'tabbed_default',
        activeTabClass: 'tab_active',
        disabledTabClass: 'tab_disabled',
        transition: null,
    };
    var config = $.extend({}, defaults, options); // Merge the defaults and user specified options into config

    var $tabbedSections = $('.'+config.tabbedClass);


    // Public methods

    /**
     * @param name Name of the tab to switch to
     */
    this.switchTab = function(name) {
        var $targetTab = $('.' + config.tabClass + '[href="#'+ name +'"]');
        var $targetSection = $('#'+ name);
        if($targetSection.is(':visible')) return; // If target is already visible, we don't need to do anything
        var $previousSection = $tabbedSections.filter(':visible');

        // If the tab is disabled, don't allow the hash at all
        if($targetTab.hasClass(config.disabledTabClass)) {
            window.location = window.location.href.split('#')[0]; // Redirect to page without hash
            return;
        }

        if(config.transition == 'slide') {

            if($targetSection.prevAll().filter($previousSection).length) { // target section is after previous section (slide left)
                var prevEndPos = -999;
                var targetStartPos = 999;
            }
            else { // target section is before previous section (slide right)
                var prevEndPos = 999;
                var targetStartPos = -999;
            }

            $previousSection.css({position: 'absolute', opacity: 1, left: 0});
            $previousSection.animate({left: prevEndPos, opacity: 0}, 300);
            setTimeout(function() {
                $previousSection.hide();
            }, 300);

            $targetSection.css({left: targetStartPos, position: 'relative', opacity: 0});
            $targetSection.show();
            $targetSection.animate({left: 0, opacity: 1}, 300);
            $targetSection.css({position: 'relative'})
        }
        else {
            $previousSection.hide();
            $targetSection.show(); // Show selected tab content
        }

        $('.'+config.tabClass).removeClass(config.activeTabClass); // Remove active class from other tabs
        $('.'+config.tabClass+'[href=\\#'+name+']').addClass(config.activeTabClass); // Add active class to this tab

        $(window).trigger('tabSwitched');
        $(window).trigger('load resize'); // Makes sure to trigger refresh of any js that responds to the window resize event to calculate layout (i.e. columnizer, matchheight)
    };


    // Event handlers

    $('body').on('click', '.'+config.tabClass+'[href*=\\#]', function(e) {
        var $this = $(this);
        var tabName = $this.attr('href').substring(1);

        if(tabName == window.location.hash) { // Stop if we're already on the tab
            e.preventDefault();
            return;
        }
        if($this.hasClass(config.disabledTabClass)) { // Stop if tab is disabled
            e.preventDefault();
            return;
        }

        e.preventDefault(); // Prevent the default action of jumping to the ID

        // Manually add the hash to the URL since preventDefault stops it from getting added
        if(history.pushState) {
            history.pushState(null, null, '#'+tabName);
        }
        else {
            window.location.hash = tabName;
        }

        that.switchTab(tabName);
    });


    // Initialize - Set the current tab
    $tabbedSections.hide(); // Hide all tabs to begin with
    var hash = window.location.hash.substring(1); // Get the anchor hash from the url
    if(hash) {
        this.switchTab(hash);
    }
    else {
        this.switchTab($('.' + config.defaultTabClass).attr('id'));
    }
}