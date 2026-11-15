import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/features.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class OnboardingFlow extends StatelessWidget {
  const OnboardingFlow({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => OnboardingCubit()),
        BlocProvider(
          create: (context) => StepOneCubit(
            completeOnboardingUseCase: getIt<CompleteOnboardingUseCase>(),
            getUserProfileUseCase: getIt<GetUserProfileUseCase>(),
          ),
        ),
        BlocProvider(
          create: (context) => StepTwoCubit(
            submitStepTwoUseCase: getIt<SubmitStepTwoUseCase>(),
          ),
        ),
        BlocProvider(
          create: (context) => StepThreeCubit(
            finishOnboardingUseCase: getIt<FinishOnboardingUseCase>(),
          ),
        ),
      ],
      child: const _OnboardingFlowView(),
    );
  }
}

class _OnboardingFlowView extends StatelessWidget {
  const _OnboardingFlowView();

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<OnboardingCubit, OnboardingState>(
      listener: (context, state) {
        if (state.status == OnboardingStatus.failure && state.errorMessage != null) {
          CommonDialog.alert(
            context,
            title: context.l10n.error,
            message: state.errorMessage!,
          );
        }
      },
      builder: (context, state) {
        final cubit = context.read<OnboardingCubit>();
        final isLoading = state.status == OnboardingStatus.loading;
        return AbsorbPointer(
          absorbing: isLoading,
          child: Scaffold(
            appBar: CommonAppBar(
              title: Text(
                context.l10n.completeProfile,
                style: context.bodyRegular16(
                  fontWeight: FontWeight.w700,
                  color: context.themeService.commonTextColor,
                ),
              ),
              showBackButton: state.currentStep > 0,
              leading: state.currentStep > 0
                  ? IconButton(
                      icon: const Icon(Icons.arrow_back_ios),
                      onPressed: cubit.previousStep,
                    )
                  : null,
              onBackPress: cubit.previousStep,
              actions: [
                const LogoutButton(
                  isIcon: true,
                ).paddingHorizontal16,
              ],
            ),
            body: Column(
              children: [
                Gap.doubleLarge40,
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: CommonStepIndicator(
                    currentStep: state.currentStep + 1,
                    totalSteps: 3,
                  ),
                ),
                Expanded(
                  child: PageView(
                    controller: cubit.pageController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: const [
                      StepOne(),
                      StepTwo(),
                      StepThree(),
                    ],
                  ),
                ),
                const RelativeGap(mainAxisExtent: 0.05),
              ],
            ),
          ),
        );
      },
    );
  }
}
