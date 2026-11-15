import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/presentation/bloc/verification_state.dart';

class VerificationCubit extends Cubit<VerificationState> {
  VerificationCubit({
    required VerifyEmailUseCase verifyEmailUseCase,
  })  : _verifyEmailUseCase = verifyEmailUseCase,
        super(const VerificationInitial());

  final VerifyEmailUseCase _verifyEmailUseCase;

  Future<void> verifyEmail({
    required String code,
  }) async {
    emit(const VerificationLoading());

    if (code.isEmpty) {
      emit(const VerificationFailure('Please enter the verification code.'));
      return;
    }

    if (code.length != 4) {
      emit(const VerificationFailure('Verification code must be 4 digits.'));
      return;
    }

    final result = await _verifyEmailUseCase(
      VerifyEmailParams(code: code),
    );

    result.fold(
      onFailure: (failure) => emit(VerificationFailure(failure.message)),
      onSuccess: (session) => emit(VerificationSuccess(session)),
    );
  }

  /// Resets the verification state.
  void reset() => emit(const VerificationInitial());
}
