import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_two/domain/entities/submit_step_two_params.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_two/domain/usecases/submit_step_two_use_case.dart';

part 'step_two_state.dart';

class StepTwoCubit extends Cubit<StepTwoState> {
  StepTwoCubit({
    required SubmitStepTwoUseCase submitStepTwoUseCase,
  })  : _submitStepTwoUseCase = submitStepTwoUseCase,
        super(const StepTwoState());

  final SubmitStepTwoUseCase _submitStepTwoUseCase;

  void setAddress(String value) {
    emit(state.copyWith(address: value));
  }

  Future<void> submit() async {
    emit(state.copyWith(status: StepTwoStatus.loading));

    final params = SubmitStepTwoParams(address: state.address);
    final result = await _submitStepTwoUseCase(params);

    result.fold(
      onSuccess: (_) {
        emit(state.copyWith(status: StepTwoStatus.success));
      },
      onFailure: (failure) {
        emit(
          state.copyWith(
            status: StepTwoStatus.failure,
            errorMessage: failure.message,
          ),
        );
        emit(state.copyWith(status: StepTwoStatus.initial));
      },
    );
  }
}
