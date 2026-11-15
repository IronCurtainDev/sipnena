import 'dart:io';

import 'package:react_hono_flutter_template/core/sharing/data/datasources/share_platform_data_source.dart';
import 'package:share_plus/share_plus.dart';

class SharePlatformDataSourceImpl implements SharePlatformDataSource {
  const SharePlatformDataSourceImpl({SharePlus? sharePlus}) : _sharePlus = sharePlus;

  final SharePlus? _sharePlus;

  SharePlus get _client => _sharePlus ?? SharePlus.instance;

  @override
  Future<void> shareFile(
    File file, {
    String? text,
    String? subject,
  }) async {
    await _client.share(
      ShareParams(
        files: [XFile(file.path)],
        text: text,
        subject: subject,
      ),
    );
  }
}
