import 'package:hive_flutter/hive_flutter.dart';

/// Contract for managing application-level local preferences and flags.
abstract interface class AppPreferences {
  /// Whether the onboarding/tutorial flow has already been displayed.
  bool get isTutorialShown;

  /// Updates the status of the tutorial display flag.
  Future<void> setTutorialShown({required bool value});
}

/// Hive-backed implementation of [AppPreferences] with an in-memory cache.
class AppPreferencesImpl implements AppPreferences {
  AppPreferencesImpl() {
    try {
      if (Hive.isBoxOpen(boxName)) {
        // _isTutorialShown = _box.get(_tutorialShownKey) ?? false;
      }
    } catch (_) {
      _isTutorialShown = false;
    }
  }

  /// The name of the Hive box where general state flags are stored.
  static const String boxName = 'states';
  static const String _tutorialShownKey = 'isTutorialShown';

  Box<bool> get _box => Hive.box<bool>(boxName);

  bool _isTutorialShown = false;

  @override
  bool get isTutorialShown => _isTutorialShown;

  @override
  Future<void> setTutorialShown({required bool value}) async {
    _isTutorialShown = value;
    await _box.put(_tutorialShownKey, value);
  }
}
