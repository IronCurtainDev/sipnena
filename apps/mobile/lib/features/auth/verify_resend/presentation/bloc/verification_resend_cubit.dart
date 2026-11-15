import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';

class VerificationResendCubit extends Cubit<VerificationResendState> {
  VerificationResendCubit({
    required VerifyResendEmailUseCase resendVerificationCodeUseCase,
  })  : _resendVerificationCodeUseCase = resendVerificationCodeUseCase,
        super(const VerificationResendInitial());

  final VerifyResendEmailUseCase _resendVerificationCodeUseCase;

  Future<void> resendVerificationCode() async {
    emit(const VerificationResendLoading());

    final result = await _resendVerificationCodeUseCase(const NoParams());

    result.fold(
      onFailure: (failure) => emit(VerificationResendFailure(failure.message)),
      onSuccess: (success) => emit(const VerificationResendSuccess(success: true)),
    );
  }
}
