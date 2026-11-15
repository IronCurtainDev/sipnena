import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/onboarding.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Extension on GetIt to register onboarding feature dependencies.
extension OnboardingInjection on GetIt {
  /// Registers all onboarding feature dependencies.
  void registerOnboardingFeature() {
    registerLazySingleton<OnboardingApiClient>(
      () => OnboardingApiClient(get()),
    );

    // Step One
    registerLazySingleton<StepOneRemoteDataSource>(
      () => StepOneRemoteDataSourceImpl(apiClient: get()),
    );
    registerLazySingleton<IStepOneRepository>(
      () => StepOneRepositoryImpl(get()),
    );
    registerFactory<CompleteOnboardingUseCase>(
      () => CompleteOnboardingUseCase(get()),
    );

    // Step Two
    registerLazySingleton<StepTwoRemoteDataSource>(
      () => StepTwoRemoteDataSourceImpl(apiClient: get()),
    );
    registerLazySingleton<IStepTwoRepository>(
      () => StepTwoRepositoryImpl(get()),
    );
    registerFactory<SubmitStepTwoUseCase>(
      () => SubmitStepTwoUseCase(get()),
    );

    // Step Three (Completion)
    registerLazySingleton<StepThreeRemoteDataSource>(
      () => StepThreeRemoteDataSourceImpl(apiClient: get()),
    );
    registerLazySingleton<IStepThreeRepository>(
      () => StepThreeRepositoryImpl(get(), get()),
    );
    registerFactory<FinishOnboardingUseCase>(
      () => FinishOnboardingUseCase(get()),
    );
  }
}
