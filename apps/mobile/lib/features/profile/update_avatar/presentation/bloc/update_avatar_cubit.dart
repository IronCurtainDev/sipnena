import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/domain/domain.dart';

part 'update_avatar_state.dart';

/// Cubit dedicated to profile avatar upload flow.
class UpdateAvatarCubit extends Cubit<UpdateAvatarState> {
  UpdateAvatarCubit({
    required UploadAvatarUseCase uploadAvatarUseCase,
  })  : _uploadAvatarUseCase = uploadAvatarUseCase,
        super(const UpdateAvatarInitial());

  final UploadAvatarUseCase _uploadAvatarUseCase;

  Future<void> uploadAvatar({
    required String imagePath,
  }) async {
    emit(const UpdateAvatarLoading());

    final result = await _uploadAvatarUseCase(
      UploadAvatarParams(imagePath: imagePath),
    );

    result.fold(
      onSuccess: (avatarUrl) => emit(UpdateAvatarSuccess(avatarUrl)),
      onFailure: (failure) => emit(UpdateAvatarFailure(failure.message)),
    );
  }

  void reset() => emit(const UpdateAvatarInitial());
}
