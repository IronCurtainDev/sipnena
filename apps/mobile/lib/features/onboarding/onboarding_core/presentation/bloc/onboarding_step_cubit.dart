import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';

part 'onboarding_state.dart';

/// Cubit for managing onboarding flow.
class OnboardingCubit extends Cubit<OnboardingState> {
  OnboardingCubit() : super(const OnboardingState()) {
    _initializeFromStoredSession();
  }

  static const int stepCount = 3;
  final pageController = PageController();

  void _initializeFromStoredSession() {
    final session = getIt<AuthBloc>().state.session;
    if (session != null) {
      final step = _mapCompletedStepToCurrentStep(session.completedStep);
      emit(state.copyWith(currentStep: step));
      _jumpToStep(step);
    }
  }

  int _mapCompletedStepToCurrentStep(int completedStep) {
    if (completedStep <= 0) return 0;
    if (completedStep >= stepCount) return stepCount - 1;
    return completedStep;
  }

  void _jumpToStep(int step) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!isClosed && pageController.hasClients) {
        pageController.jumpToPage(step);
      }
    });
  }

  void nextStep() {
    if (state.currentStep < stepCount - 1) {
      emit(state.copyWith(currentStep: state.currentStep + 1));
      if (pageController.hasClients) {
        pageController.animateToPage(
          state.currentStep,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeInOut,
        );
      }
    }
  }

  void previousStep() {
    if (state.currentStep > 0) {
      emit(state.copyWith(currentStep: state.currentStep - 1));
      if (pageController.hasClients) {
        pageController.animateToPage(
          state.currentStep,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeInOut,
        );
      }
    }
  }

  void reset() {
    emit(const OnboardingState());
  }

  @override
  Future<void> close() {
    pageController.dispose();
    return super.close();
  }
}
