(function() {


    window.addEventListener("load", function(event) {
        console.log("load", event);

        var html = document.documentElement;

        html.addEventListener("keydown", function(event) {
            console.log("keydown", event.key, event.target);
        }, true);

        html.addEventListener("keypress", function(event) {
            console.log("keypress", event.key, event.target);
        }, true);

        html.addEventListener("keyup", function(event) {
            console.log("keypup", event.key, event.target);
        }, true);

        html.addEventListener("click", function(event) {
            console.log("click", event.key, event.target);
        }, true);

        html.addEventListener("mousemove", function(event) {
            console.log("mouse move", event.key, event.target);
        }, true);

        html.addEventListener("mouseenter", function(event) {
            console.log("mouse enter", event.key, event.target);
        }, true);

        html.addEventListener("mouseleave", function(event) {
            console.log("mouse leave", event.key, event.target);
        }, true);

        html.addEventListener("mouseout", function(event) {
            console.log("mouse out", event.key, event.target);
        }, true);

        html.addEventListener("mouseover", function(event) {
            console.log("mouse over", event.key, event.target);
        }, true);
    });
})();
