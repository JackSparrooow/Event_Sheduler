class Scheduler {
    constructor() {
        this.events = [];
    }

    addEvent(event) {
        const { start_time, end_time } = event;

        // Check for valid input
        if (start_time < 0 || start_time >= 24 || end_time <= 0 || end_time > 24 || start_time >= end_time) {
            return false;
        }

        // Check for overlaps
        for (let existingEvent of this.events) {
            if (!(end_time <= existingEvent.start_time || start_time >= existingEvent.end_time)) {
                return false;
            }
        }

        // Add event if no overlaps
        this.events.push(event);
        return true;
    }

    getEvents() {
        return this.events;
    }
}

const scheduler = new Scheduler();

document.getElementById('add_event').addEventListener('click', () => {
    const startTime = parseInt(document.getElementById('start_time').value);
    const endTime = parseInt(document.getElementById('end_time').value);
    
    const event = { start_time: startTime, end_time: endTime };
    
    if (scheduler.addEvent(event)) {
        displayEvents();
        alert("Event added successfully!");
    } else {
        alert("Invalid event or overlap with existing events.");
    }
});

function displayEvents() {
    const eventList = document.getElementById('event_list');
    eventList.innerHTML = ''; // Clear existing list
    
    const events = scheduler.getEvents();
    events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = `${event.start_time} - ${event.end_time}`;
        eventList.appendChild(listItem);
    });
}
