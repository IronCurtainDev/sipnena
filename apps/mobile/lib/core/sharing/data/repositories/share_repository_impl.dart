import 'dart:io';

import 'package:react_hono_flutter_template/core/sharing/data/datasources/share_platform_data_source.dart';
import 'package:react_hono_flutter_template/core/sharing/domain/repositories/i_share_repository.dart';

class ShareRepositoryImpl implements IShareRepository {
  const ShareRepositoryImpl(this._dataSource);

  final SharePlatformDataSource _dataSource;

  @override
  Future<void> shareFile(
    File file, {
    String? text,
    String? subject,
  }) {
    return _dataSource.shareFile(
      file,
      text: text,
      subject: subject,
    );
  }
}
