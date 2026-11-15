// ignore_for_file: omit_local_variable_types, unused_local_variable

import 'package:check_disposable_email/check_disposable_email.dart' as check_email;
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/core/auth_core/domain/domain.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/domain/domain.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

part 'sign_up_state.dart';

/// Cubit for managing sign up form state.
class SignUpCubit extends Cubit<SignUpState> {
  SignUpCubit({
    required RegisterUseCase registerUseCase,
    GetDevicePushTokenUseCase? getDevicePushTokenUseCase,
  })  : _registerUseCase = registerUseCase,
        _getDevicePushTokenUseCase = getDevicePushTokenUseCase,
        super(const SignUpInitial());

  final RegisterUseCase _registerUseCase;
  final GetDevicePushTokenUseCase? _getDevicePushTokenUseCase;

  /// Attempts to register with the provided credentials.
  Future<void> signUp({
    required String email,
    required String password,
    String? devicePushToken,
  }) async {
    emit(const SignUpLoading());

    if (email.isEmpty) {
      emit(const SignUpFailure('Please enter an email address.'));
      return;
    }

    if (!AppRegex.email.hasMatch(email)) {
      emit(const SignUpFailure('Please enter a valid email address.'));
      return;
    }

    if (!check_email.Disposable.instance.hasValidEmail(email)) {
      emit(const SignUpFailure('Disposable email addresses are not allowed.'));
      return;
    }

    if (password.isEmpty) {
      emit(const SignUpFailure('Please enter a password.'));
      return;
    }

    if (password.length < 8) {
      emit(const SignUpFailure('Password must be at least 8 characters long.'));
      return;
    }

    if (!AppRegex.number.hasMatch(password)) {
      emit(const SignUpFailure('Password must contain at least one number.'));
      return;
    }

    if (!AppRegex.uppercase.hasMatch(password)) {
      emit(const SignUpFailure('Password must contain at least one uppercase letter.'));
      return;
    }

    if (!AppRegex.lowercase.hasMatch(password)) {
      emit(const SignUpFailure('Password must contain at least one lowercase letter.'));
      return;
    }

    if (!AppRegex.specialChar.hasMatch(password)) {
      emit(const SignUpFailure('Password must contain at least one special character.'));
      return;
    }

    final deviceId = await getIt<AppSettings>().getDeviceId();
    final deviceType = getIt<AppSettings>().getDevicePlatform();
    final resolvedPushToken = devicePushToken ?? await _resolvePushToken();
    final result = await _registerUseCase(
      RegisterParams(
        email: email,
        password: password,
        deviceId: deviceId,
        deviceType: deviceType,
        devicePushToken: resolvedPushToken.isEmpty ? null : resolvedPushToken,
      ),
    );

    result.fold(
      onSuccess: (session) => emit(SignUpSuccess(session)),
      onFailure: (failure) => emit(
        SignUpFailure(
          failure.message,
          isEmailAlreadyRegistered: failure is EmailAlreadyRegisteredFailure,
        ),
      ),
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

  /// Resets the sign up state.
  void reset() => emit(const SignUpInitial());

  /// Clears any failure state back to initial.
  void clearError() {
    if (state is SignUpFailure) {
      emit(const SignUpInitial());
    }
  }
}
