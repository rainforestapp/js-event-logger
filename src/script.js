console.log('yolo');
(function() {
  // Event logging
  var eventSequence = 0;
  var lastSent = 0;
  var buffer = [];

  console.log('yolo');
  // TODO delete or rename to something else. Used by capybara test suite
  // only for now
  window.my_secret_queue = buffer;

  window.addEventListener("load", function(event) {
        console.log("load", event);

        var html = document.documentElement;

        html.addEventListener("keydown", function(event) {
          buffer_event("keydown", event);
        }, true);

        html.addEventListener("keypress", function(event) {
          buffer_event("keypress", event);
        }, true);

        html.addEventListener("keyup", function(event) {
          buffer_event("keyup", event);
        }, true);

        html.addEventListener("click", function(event) {
          buffer_event("click", event);
        }, true);

        html.addEventListener("mousemove", function(event) {
          buffer_event("mouse move", event);
        }, true);

        html.addEventListener("mouseenter", function(event) {
          buffer_event("mouse enter", event);
        }, true);

        html.addEventListener("mouseleave", function(event) {
          buffer_event("mouse leave", event);
        }, true);

        html.addEventListener("mouseout", function(event) {
          buffer_event("mouse out", event);
        }, true);

        html.addEventListener("mouseover", function(event) {
          buffer_event("mouse over", event);
        }, true);

        function send_event (event_buffer) {
          if (event_buffer.length == 0) {
            console.log('Buffer was empty')
            return false;
          }

          var httpRequest = new XMLHttpRequest();
          httpRequest.onreadystatechange = function () {
            console.log(httpRequest);
          };
          httpRequest.open('POST', 'http://requestb.in/p3iaskp3');
          httpRequest.send(JSON.stringify({eventSequence: eventSequence, events: event_buffer}));
        }

        // Save and clear the buffer
        function send_buffer () {
          tmp = buffer.slice();
          buffer = [];

          send_event(tmp);
        }

        // Send periodically
        setInterval(function(){
          console.log('Interval send');
          send_buffer();
        }, 5000);

        window.addEventListener("onbeforeunload",function() {
          lastSent = 0;
          console.log('Leaving page');
          send_buffer();
        })

        function buffer_event(name, e) {
          eventSequence++;
          buffer.push(name);

          if (buffer.length > 50 || lastSent < e.timeStamp - 3000) {
            // Update last sent
            lastSent = e.timeStamp

            // Send the shit
            send_buffer();
          }
        }
    });
})();
