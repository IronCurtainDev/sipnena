import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/data/models/models.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/domain/domain.dart';

class EditAccountRepositoryImpl implements IEditAccountRepository {
  EditAccountRepositoryImpl({
    required this.authRepository,
    required this.remoteDataSource,
  });

  final IAuthSessionRepository authRepository;
  final EditAccountRemoteDataSource remoteDataSource;

  @override
  Future<Result<UserProfile>> updateAccount(UpdateAccountParams params) async {
    return safeRepositoryCall(
      requireRemote: true,
      remoteDataSource: remoteDataSource,
      () async {
        final storedSession = await authRepository.getStoredSession();
        if (storedSession == null) {
          throw const ServerFailure('No session found');
        }

        final request = EditAccountRequestModel.fromEntity(params);
        final remoteProfile = await remoteDataSource.updateAccount(request);

        final resolvedFirstName = remoteProfile.firstName.trim().isNotEmpty ? remoteProfile.firstName : (params.firstName ?? storedSession.firstName ?? '');
        final resolvedLastName = remoteProfile.lastName.trim().isNotEmpty ? remoteProfile.lastName : (params.lastName ?? storedSession.lastName ?? '');

        final updatedSession = storedSession.copyWith(
          firstName: resolvedFirstName,
          lastName: resolvedLastName,
          phoneNumber: remoteProfile.phoneNumber ?? params.phoneNumber ?? storedSession.phoneNumber,
        );

        await authRepository.saveSession(updatedSession);

        return UserProfile(
          id: remoteProfile.id,
          uuid: updatedSession.uuid,
          firstName: resolvedFirstName,
          lastName: resolvedLastName,
          email: remoteProfile.email ?? storedSession.email,
          avatarUrl: remoteProfile.avatarUrl ?? storedSession.avatarUrl,
          timezone: remoteProfile.timezone ?? storedSession.timezone,
          dialCode: remoteProfile.dialCode ?? storedSession.dialCode,
          completedStep: remoteProfile.completedStep ?? storedSession.completedStep,
          userType: remoteProfile.userType,
          fullName: remoteProfile.fullName,
          userDrivingLicenceDetails: remoteProfile.userDrivingLicenceDetails ?? storedSession.userDrivingLicenceDetails,
          phoneNumber: updatedSession.phoneNumber,
        );
      },
    );
  }
}
