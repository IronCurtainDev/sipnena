import Flutter
import FirebaseCore
import FirebaseMessaging
import GoogleMaps
import UIKit
import UserNotifications

@main
@objc class AppDelegate: FlutterAppDelegate, FlutterImplicitEngineDelegate {

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {

    if let apiKey = Bundle.main.object(
      forInfoDictionaryKey: "GoogleMapsAPIKey"
    ) as? String,
       !apiKey.isEmpty {
      GMSServices.provideAPIKey(apiKey)
    }

    if FirebaseApp.app() == nil {
      FirebaseApp.configure()
    }

    UNUserNotificationCenter.current().delegate = self
    application.registerForRemoteNotifications()

    let didFinishLaunching = super.application(
      application,
      didFinishLaunchingWithOptions: launchOptions
    )

    return didFinishLaunching
  }

  override func application(
    _ application: UIApplication,
    didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
  ) {
    let tokenParts = deviceToken.map { data in String(format: "%02.2hhx", data) }
    let token = tokenParts.joined()
    print("✅ [APNs] Successfully registered for remote notifications. Token: \(token)")
    Messaging.messaging().apnsToken = deviceToken
    // Added this for notification testing purposes.
    Messaging.messaging().token { fcmToken, error in
      if let error = error {
        print("❌ [FCM] Failed to fetch FCM Token: \(error.localizedDescription)")
      } else if let fcmToken = fcmToken {
        print("🔥 [FCM] Successfully registered FCM Token: \(fcmToken)")
      }
    }

    super.application(
      application,
      didRegisterForRemoteNotificationsWithDeviceToken: deviceToken
    )
  }

  override func application(
    _ application: UIApplication,
    didFailToRegisterForRemoteNotificationsWithError error: Error
  ) {
    print("❌ [APNs] Failed to register for remote notifications: \(error.localizedDescription)")
    super.application(
      application,
      didFailToRegisterForRemoteNotificationsWithError: error
    )
  }

  override func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    willPresent notification: UNNotification,
    withCompletionHandler completionHandler:
      @escaping (UNNotificationPresentationOptions) -> Void
  ) {
    if #available(iOS 14.0, *) {
      completionHandler([.banner, .list, .sound, .badge])
    } else {
      completionHandler([.alert, .sound, .badge])
    }
  }

  func didInitializeImplicitFlutterEngine(
    _ engineBridge: FlutterImplicitEngineBridge
  ) {
    GeneratedPluginRegistrant.register(
      with: engineBridge.pluginRegistry
    )
  }
}