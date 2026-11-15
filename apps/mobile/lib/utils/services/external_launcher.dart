import 'package:url_launcher/url_launcher.dart';

/// Service for launching external native device applications (SMS, Phone calls, etc.).
abstract class ExternalLauncher {
  /// Opens the device's native messaging application with [phoneNumber].
  ///
  /// Normalizes formatting characters (spaces, dashes, brackets) while preserving a leading '+'.
  static Future<bool> openSms(String phoneNumber) async {
    final cleanPhone = phoneNumber.replaceAll(RegExp(r'[^\d+]'), '');
    if (cleanPhone.isEmpty) return false;

    final uri = Uri(scheme: 'sms', path: cleanPhone);
    try {
      if (await canLaunchUrl(uri)) {
        return await launchUrl(uri, mode: LaunchMode.externalApplication);
      }
      return await launchUrl(uri);
    } catch (_) {
      return false;
    }
  }

  /// Opens the device's native phone dialer with [phoneNumber].
  static Future<bool> openPhoneCall(String phoneNumber) async {
    final cleanPhone = phoneNumber.replaceAll(RegExp(r'[^\d+]'), '');
    if (cleanPhone.isEmpty) return false;

    final uri = Uri(scheme: 'tel', path: cleanPhone);
    try {
      if (await canLaunchUrl(uri)) {
        return await launchUrl(uri, mode: LaunchMode.externalApplication);
      }
      return await launchUrl(uri);
    } catch (_) {
      return false;
    }
  }
}
