import 'dart:io';

abstract interface class IShareRepository {
  Future<void> shareFile(
    File file, {
    String? text,
    String? subject,
  });
}
