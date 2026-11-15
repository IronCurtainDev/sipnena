import 'dart:io';

abstract interface class SharePlatformDataSource {
  Future<void> shareFile(
    File file, {
    String? text,
    String? subject,
  });
}
