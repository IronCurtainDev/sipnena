import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/update_avatar.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class EditableProfileAvatar extends StatelessWidget {
  const EditableProfileAvatar({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<UpdateAvatarCubit>(),
      child: BlocListener<UpdateAvatarCubit, UpdateAvatarState>(
        listener: (context, state) {
          if (state is UpdateAvatarFailure) {
            context.showErrorSnackBar(state.message);
            return;
          }

          if (state is UpdateAvatarSuccess) {
            final session = context.read<AuthBloc>().state.session;
            final avatarUrl = state.avatarUrl;

            if (session != null && avatarUrl != null && avatarUrl.trim().isNotEmpty) {
              context.read<AuthBloc>().add(
                    AuthSessionEstablished(
                      session.copyWith(avatarUrl: avatarUrl),
                    ),
                  );
            }

            context.showSuccessSnackBar('Profile image updated');
          }
        },
        child: BlocBuilder<UpdateAvatarCubit, UpdateAvatarState>(
          builder: (context, avatarState) {
            final isUploading = avatarState is UpdateAvatarLoading;

            return BlocSelector<AuthBloc, AuthState, String?>(
              selector: (state) => state.session?.avatarUrl,
              builder: (context, avatarUrl) {
                return ProfileAvatar(
                  imageUrl: avatarUrl,
                  isLoading: isUploading,
                  onEditTap: () => _onAvatarEditTap(context),
                );
              },
            );
          },
        ),
      ),
    );
  }

  static Future<void> _onAvatarEditTap(BuildContext context) async {
    final result = await AppImageUtils.instance.getImageBySource(context);
    if (result == null || !context.mounted) {
      return;
    }

    await context.read<UpdateAvatarCubit>().uploadAvatar(imagePath: result.path);
  }
}
