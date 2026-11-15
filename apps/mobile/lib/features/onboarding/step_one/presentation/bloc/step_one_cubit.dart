import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/onboarding/onboarding.dart';

part 'step_one_state.dart';

class StepOneCubit extends Cubit<StepOneState> {
  StepOneCubit({
    required CompleteOnboardingUseCase completeOnboardingUseCase,
    required GetUserProfileUseCase getUserProfileUseCase,
  })  : _completeOnboardingUseCase = completeOnboardingUseCase,
        _getUserProfileUseCase = getUserProfileUseCase,
        super(const StepOneState()) {
    _initializeFromStoredSessionAndProfile();
  }

  final CompleteOnboardingUseCase _completeOnboardingUseCase;
  final GetUserProfileUseCase _getUserProfileUseCase;

  Future<void> _initializeFromStoredSessionAndProfile() async {
    final session = getIt<AuthBloc>().state.session;

    if (session != null) {
      final restoredImage = _normalizePrefilledImage(session.avatarUrl);
      final restoredFirstName = session.firstName?.trim().isNotEmpty ?? false ? session.firstName!.trim() : state.firstName;
      final restoredLastName = _resolveLastName(
        lastName: session.lastName,
        fullName: session.fullName,
        firstName: restoredFirstName,
        fallback: state.lastName,
      );

      emit(
        state.copyWith(
          countryCode: session.dialCode ?? state.countryCode,
          profileImage: restoredImage ?? state.profileImage,
          firstName: restoredFirstName,
          lastName: restoredLastName,
        ),
      );
    }

    final result = await _getUserProfileUseCase(const NoParams());
    result.fold(
      onSuccess: (profile) {
        final currentCountryCode = session?.dialCode ?? state.countryCode;
        final rawPhone = profile.phoneNumber?.trim() ?? '';
        final localPhone = _stripDialCode(rawPhone, currentCountryCode);
        final firstName = profile.firstName.trim().isNotEmpty ? profile.firstName : state.firstName;
        final lastName = profile.lastName.trim().isNotEmpty ? profile.lastName : state.lastName;
        final phoneNumber = localPhone.isNotEmpty ? localPhone : state.phoneNumber;

        emit(
          state.copyWith(
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            countryCode: currentCountryCode,
          ),
        );
      },
      onFailure: (_) {},
    );
  }

  String _stripDialCode(String phoneNumber, String dialCode) {
    if (phoneNumber.isEmpty) return '';
    final trimmedDialCode = dialCode.trim();
    if (trimmedDialCode.isEmpty) return phoneNumber;
    if (phoneNumber.startsWith(trimmedDialCode)) {
      return phoneNumber.substring(trimmedDialCode.length).trim();
    }
    return phoneNumber;
  }

  String _resolveLastName({
    required String? lastName,
    required String? fullName,
    required String firstName,
    required String fallback,
  }) {
    final savedLastName = lastName?.trim() ?? '';
    if (savedLastName.isNotEmpty) return savedLastName;

    final savedFullName = fullName?.trim() ?? '';
    if (savedFullName.isEmpty) return fallback;

    if (firstName.isNotEmpty && savedFullName.startsWith(firstName)) {
      final derivedLastName = savedFullName.substring(firstName.length).trim();
      if (derivedLastName.isNotEmpty) return derivedLastName;
    }

    final nameParts = savedFullName.split(RegExp(r'\s+'));
    return nameParts.length > 1 ? nameParts.skip(1).join(' ') : fallback;
  }

  String? _normalizePrefilledImage(String? value) {
    if (value == null) return null;
    final sanitized = value.replaceAllMapped(RegExp(r'\[([^\]]+)\]\([^\)]*\)'), (match) => match.group(1) ?? '').trim();
    if (sanitized.isEmpty) return null;
    if (sanitized.startsWith('http://')) {
      return sanitized.replaceFirst('http://', 'https://');
    }
    return sanitized;
  }

  void setFirstName(String value) => emit(state.copyWith(firstName: value));
  void setLastName(String value) => emit(state.copyWith(lastName: value));
  void setPhoneNumber(String value) => emit(state.copyWith(phoneNumber: value));
  void setCountryCode(String code) => emit(state.copyWith(countryCode: code));
  void setProfileImage(String path) => emit(state.copyWith(profileImage: path));

  Future<void> submit() async {
    emit(state.copyWith(status: StepOneStatus.loading));

    final result = await _completeOnboardingUseCase(
      CompleteOnboardingParams(
        firstName: state.firstName,
        lastName: state.lastName,
        countryCode: state.countryCode,
        phoneNumber: state.phoneNumber,
        imagePath: state.profileImage ?? '',
      ),
    );

    result.fold(
      onSuccess: (_) {
        emit(state.copyWith(status: StepOneStatus.success));
      },
      onFailure: (failure) {
        emit(
          state.copyWith(
            status: StepOneStatus.failure,
            errorMessage: failure.message,
          ),
        );
        emit(state.copyWith(status: StepOneStatus.initial));
      },
    );
  }
}
