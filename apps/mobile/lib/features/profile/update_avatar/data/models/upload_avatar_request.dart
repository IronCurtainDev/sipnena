import 'dart:io';

import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/domain/entities/upload_avatar_params.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class UploadAvatarRequest extends Equatable {
  const UploadAvatarRequest({
    required this.imagePath,
  });

  factory UploadAvatarRequest.fromEntity(UploadAvatarParams params) {
    return UploadAvatarRequest(imagePath: params.imagePath);
  }

  final String imagePath;

  Future<Map<String, dynamic>> toFormDataMap() async {
    return {
      'image': await MultipartFile.fromFile(
        imagePath,
        filename: File(imagePath).uri.pathSegments.last,
      ),
    };
  }

  @override
  List<Object?> get props => [imagePath];
}
