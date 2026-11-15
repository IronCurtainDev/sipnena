part of 'update_avatar_cubit.dart';

sealed class UpdateAvatarState extends Equatable {
  const UpdateAvatarState();

  @override
  List<Object?> get props => [];
}

final class UpdateAvatarInitial extends UpdateAvatarState {
  const UpdateAvatarInitial();
}

final class UpdateAvatarLoading extends UpdateAvatarState {
  const UpdateAvatarLoading();
}

final class UpdateAvatarSuccess extends UpdateAvatarState {
  const UpdateAvatarSuccess(this.avatarUrl);

  final String? avatarUrl;

  @override
  List<Object?> get props => [avatarUrl];
}

final class UpdateAvatarFailure extends UpdateAvatarState {
  const UpdateAvatarFailure(this.message);

  final String message;

  @override
  List<Object?> get props => [message];
}
