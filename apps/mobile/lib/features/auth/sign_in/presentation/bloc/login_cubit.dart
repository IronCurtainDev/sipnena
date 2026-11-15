import 'dart:developer' as developer;

import 'package:check_disposable_email/check_disposable_email.dart' as check_email;
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

part 'login_state.dart';

/// Cubit for managing login form state.
class LoginCubit extends Cubit<LoginState> {
  LoginCubit({
    required LoginUseCase loginUseCase,
    GetDevicePushTokenUseCase? getDevicePushTokenUseCase,
  })  : _loginUseCase = loginUseCase,
        _getDevicePushTokenUseCase = getDevicePushTokenUseCase,
        super(const LoginInitial());

  final LoginUseCase _loginUseCase;
  final GetDevicePushTokenUseCase? _getDevicePushTokenUseCase;

  /// Attempts to log in with the provided credentials.
  Future<void> login({
    required String email,
    required String password,
    String? devicePushToken,
  }) async {
    emit(const LoginLoading());

    if (email.isEmpty) {
      emit(const LoginFailure('Please enter an email address.'));
      return;
    }

    if (!AppRegex.email.hasMatch(email)) {
      emit(const LoginFailure('Please enter a valid email address.'));
      return;
    }

    if (!check_email.Disposable.instance.hasValidEmail(email)) {
      emit(const LoginFailure('Disposable email addresses are not allowed.'));
      return;
    }

    if (password.isEmpty) {
      emit(const LoginFailure('Please enter a password.'));
      return;
    }

    if (password.length < 8) {
      emit(const LoginFailure('Password must be at least 8 characters long.'));
      return;
    }

    if (!AppRegex.number.hasMatch(password)) {
      emit(const LoginFailure('Password must contain at least one number.'));
      return;
    }

    if (!AppRegex.uppercase.hasMatch(password)) {
      emit(const LoginFailure('Password must contain at least one uppercase letter.'));
      return;
    }

    if (!AppRegex.lowercase.hasMatch(password)) {
      emit(const LoginFailure('Password must contain at least one lowercase letter.'));
      return;
    }

    if (!AppRegex.specialChar.hasMatch(password)) {
      emit(const LoginFailure('Password must contain at least one special character.'));
      return;
    }

    final deviceId = await getIt<AppSettings>().getDeviceId();
    final deviceType = getIt<AppSettings>().getDevicePlatform();
    final resolvedPushToken = devicePushToken ?? await _resolvePushToken();
    developer.log(
      'Login: deviceId=$deviceId, deviceType=$deviceType, devicePushToken=${resolvedPushToken.isEmpty ? "[OMITTED - EMPTY]" : resolvedPushToken}',
      name: 'LoginCubit',
    );
    final result = await _loginUseCase(
      LoginParams(
        email: email,
        password: password,
        deviceId: deviceId,
        deviceType: deviceType,
        devicePushToken: resolvedPushToken.isEmpty ? null : resolvedPushToken,
      ),
    );

    result.fold(
      onSuccess: (session) => emit(LoginSuccess(session)),
      onFailure: (failure) => emit(LoginFailure(failure.message)),
    );
  }

  Future<String> _resolvePushToken() async {
    final useCase = _getDevicePushTokenUseCase ?? (getIt.isRegistered<GetDevicePushTokenUseCase>() ? getIt<GetDevicePushTokenUseCase>() : null);
    if (useCase == null) return '';
    try {
      final result = await useCase(const NoParams());
      return result.data ?? '';
    } on Object catch (_) {
      return '';
    }
  }

  /// Resets the login state.
  void reset() => emit(const LoginInitial());
}
