import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_three/domain/entities/submit_step_three_params.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_three/domain/usecases/finish_onboarding_use_case.dart';

part 'step_three_state.dart';

class StepThreeCubit extends Cubit<StepThreeState> {
  StepThreeCubit({
    required FinishOnboardingUseCase finishOnboardingUseCase,
  })  : _finishOnboardingUseCase = finishOnboardingUseCase,
        super(const StepThreeState());

  final FinishOnboardingUseCase _finishOnboardingUseCase;

  void setOccupation(String value) {
    emit(state.copyWith(occupation: value));
  }

  Future<void> submit() async {
    emit(state.copyWith(status: StepThreeStatus.loading));

    final params = SubmitStepThreeParams(occupation: state.occupation);
    final result = await _finishOnboardingUseCase(params);

    result.fold(
      onSuccess: (session) {
        getIt<AuthBloc>().add(AuthSessionEstablished(session));
        emit(state.copyWith(status: StepThreeStatus.success));
      },
      onFailure: (failure) {
        emit(
          state.copyWith(
            status: StepThreeStatus.failure,
            errorMessage: failure.message,
          ),
        );
        emit(state.copyWith(status: StepThreeStatus.initial));
      },
    );
  }
}
