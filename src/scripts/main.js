$( document ).ready(function() {
    includeComponents();
});

$(window).on('load', function() {

});

// generate html components
function includeComponents() { 
    var components = $('[data-component]');
    $.each(components, function(){
        var file = 'dist/html/' + $(this).data('component') + '.html';
        $(this).load(file, function() {
            initClickEvents();
        });
    });
}

// hide the active component and show the selected
function showComponent(component) {
    $(".active").removeClass("active").addClass("hidden");
    $("[data-component=" + component + "]").addClass("active").removeClass("hidden");
}

// .... write your JS code after this line
// 