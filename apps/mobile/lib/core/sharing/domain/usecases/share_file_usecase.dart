import 'dart:io';

import 'package:react_hono_flutter_template/core/core.dart';

class ShareFileUseCase {
  const ShareFileUseCase(this._repository);

  final IShareRepository _repository;

  Future<Result<void>> call(
    File file, {
    String? text,
    String? subject,
  }) async {
    try {
      await _repository.shareFile(
        file,
        text: text,
        subject: subject,
      );
      return const Result.success(null);
    } on Exception catch (e) {
      return Result.failure(ServerFailure(e.toString()));
    }
  }
}
