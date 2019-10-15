self.version = '1.0';

self.addEventListener('push', function (event ) {
    const data = event.data.json();

    console.log(data);

    self.registration.showNotification(data.title, {
        body: data.body,
        image: data.image,
        timestamp: data.timestamp,
        icon: data.icon || 'https://katcafe.org/public/assets/katcafe-logo.png',
        badge: data.badge || 'https://katcafe.org/public/assets/katcafe-logo.png',
        click_action: data.url,
        data: data,
    });
});


self.addEventListener('notificationclick', function(event) {

    const url = event.notification.data.click_action;

    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({ includeUncontrolled: true, type: 'window' }).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});