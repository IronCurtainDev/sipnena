import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';

class UserRepositoryImpl implements IUserRepository {
  UserRepositoryImpl({
    required this.authRepository,
  });

  final IAuthSessionRepository authRepository;

  @override
  Future<Result<UserProfile>> getUserProfile() async {
    return safeRepositoryCall(() async {
      final session = await authRepository.getStoredSession();
      if (session == null) {
        throw const ServerFailure('No session found');
      }

      return UserProfile(
        id: int.tryParse(session.userId),
        uuid: session.uuid,
        firstName: session.firstName?.trim().isNotEmpty ?? false ? session.firstName!.trim() : '',
        lastName: session.lastName?.trim().isNotEmpty ?? false ? session.lastName!.trim() : '',
        email: session.email,
        avatarUrl: session.avatarUrl,
        timezone: session.timezone,
        dialCode: session.dialCode,
        completedStep: session.completedStep,
        fullName: session.fullName,
        userDrivingLicenceDetails: session.userDrivingLicenceDetails,
        phoneNumber: session.phoneNumber,
      );
    });
  }
}
