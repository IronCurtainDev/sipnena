import 'package:equatable/equatable.dart';

class UploadAvatarParams extends Equatable {
  const UploadAvatarParams({required this.imagePath});

  final String imagePath;

  @override
  List<Object?> get props => [imagePath];
}
