import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class ProfileAvatar extends StatelessWidget {
  const ProfileAvatar({
    this.imagePath,
    this.imageUrl,
    this.isLoading = false,
    this.showError = false,
    this.onEditTap,
    super.key,
  });

  final String? imagePath;
  final String? imageUrl;
  final bool isLoading;
  final bool showError;
  final VoidCallback? onEditTap;

  @override
  Widget build(BuildContext context) {
    final hasImage = (imagePath?.trim().isNotEmpty ?? false) || (imageUrl?.trim().isNotEmpty ?? false);

    return Center(
      child: Stack(
        children: [
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: showError ? context.colorScheme.error : (hasImage ? Colors.transparent : context.themeService.blackColor),
                width: showError ? 2 : (hasImage ? 0 : 1),
              ),
            ),
            child: ClipOval(
              child: AvatarImage(
                imagePath: imagePath,
                imageUrl: imageUrl,
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            right: 0,
            child: GestureDetector(
              onTap: isLoading
                  ? null
                  : onEditTap ??
                      () async {
                        final result = await AppImageUtils.instance.getImageBySource(context);
                        if (result != null) {
                          // Note: You'll need to handle the state update in your Cubit/Bloc
                          // Example: context.read<ProfileCubit>().setProfileImage(result.path);
                        }
                      },
              child: Container(
                padding: AppSpacing.allSm8,
                decoration: BoxDecoration(
                  color: context.themeService.blackColor,
                  shape: BoxShape.circle,
                ),
                child: CommonImage(
                  url: AppImages.camera,
                  height: 24,
                  width: 24,
                  color: context.themeService.whiteColor,
                ),
              ),
            ),
          ),
          if (isLoading)
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  color: context.themeService.blackColor.withValues(alpha: 0.26),
                  shape: BoxShape.circle,
                ),
                child: const Center(
                  child: CommonCircularLoader.custom(
                    size: 24,
                    strokeWidth: 2.5,
                    isLightColor: true,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class AvatarImage extends StatelessWidget {
  const AvatarImage({
    this.imagePath,
    this.imageUrl,
    super.key,
  });

  final String? imagePath;
  final String? imageUrl;

  @override
  Widget build(BuildContext context) {
    final resolvedPath = (imagePath?.trim().isNotEmpty ?? false) ? imagePath!.trim() : imageUrl?.trim();

    if (resolvedPath != null && resolvedPath.isNotEmpty) {
      var isNetworkImage = false;
      var networkPath = resolvedPath;

      if (resolvedPath.startsWith('http://') || resolvedPath.startsWith('https://')) {
        isNetworkImage = true;
      } else if (!File(resolvedPath).existsSync()) {
        isNetworkImage = true;
        final baseUrl = GetIt.instance<AppSettings>().baseUrl;
        final cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.substring(0, baseUrl.length - 1) : baseUrl;
        final cleanPath = resolvedPath.startsWith('/') ? resolvedPath.substring(1) : resolvedPath;
        networkPath = '$cleanBaseUrl/$cleanPath';
      }

      if (isNetworkImage) {
        if (networkPath.startsWith('http://')) {
          networkPath = networkPath.replaceFirst('http://', 'https://');
        }

        return CachedNetworkImage(
          imageUrl: networkPath,
          fit: BoxFit.cover,
          width: 120,
          height: 120,
          placeholder: (context, url) => const Center(
            child: CircularProgressIndicator(strokeWidth: 2),
          ),
          errorWidget: (context, url, error) {
            return const Center(
              child: CommonImage(
                url: AppImages.profile,
                width: 36,
                height: 36,
              ),
            );
          },
        );
      }

      return Image.file(File(resolvedPath), fit: BoxFit.cover);
    }

    return const Center(
      child: CommonImage(
        url: AppImages.profile,
        width: 36,
        height: 36,
      ),
    );
  }
}
