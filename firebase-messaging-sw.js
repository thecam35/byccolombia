// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBNWJiMSEqlMPpRbJaq4HUkw8Cm7UIVnV8",
    authDomain: "testersapps.firebaseapp.com",
    projectId: "testersapps",
    storageBucket: "testersapps.firebasestorage.app",
    messagingSenderId: "52899437311",
    appId: "1:52899437311:web:9a7f891e686d97690c4aca"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[SW] Mensaje en segundo plano:', payload);
    
    const notificationTitle = payload.notification?.title || 'Nuevo mensaje';
    const notificationOptions = {
        body: payload.notification?.body || 'Alguien te ha enviado un mensaje',
        icon: 'https://www.gstatic.com/play-logo/play_logo.png',
        badge: 'https://www.gstatic.com/play-logo/play_logo.png',
        vibrate: [200, 100, 200],
        data: payload.data || {}
    };
    
    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
