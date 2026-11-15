import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/domain/domain.dart';

class LegalContentModel extends Equatable {
  const LegalContentModel({
    required this.key,
    required this.title,
    required this.content,
  });

  factory LegalContentModel.fromJson(
    Map<String, dynamic> json, {
    required String fallbackKey,
  }) {
    final payload = json['payload'];
    final data = payload is Map<String, dynamic> ? payload : <String, dynamic>{};

    return LegalContentModel.fromPayload(data, fallbackKey: fallbackKey);
  }

  factory LegalContentModel.fromPayload(
    Map<String, dynamic> data, {
    required String fallbackKey,
  }) {
    final key = _firstNonEmpty([
      data['key'],
      data['name'],
      fallbackKey,
    ]);

    final title = _firstNonEmpty([
      data['title'],
      data['label'],
      data['name'],
      key,
    ]);

    final content = _firstNonEmpty([
      data['value'],
      data['content'],
      data['description'],
      data['text'],
      data['body'],
    ]);

    return LegalContentModel(
      key: key,
      title: title,
      content: content,
    );
  }

  factory LegalContentModel.fromEntity(LegalContent entity) {
    return LegalContentModel(
      key: entity.key,
      title: entity.title,
      content: entity.content,
    );
  }

  final String key;
  final String title;
  final String content;

  LegalContent toEntity() {
    return LegalContent(
      key: key,
      title: title,
      content: content,
    );
  }

  static String _firstNonEmpty(List<dynamic> values) {
    for (final value in values) {
      final text = value?.toString().trim() ?? '';
      if (text.isNotEmpty) {
        return text;
      }
    }
    return '';
  }

  @override
  List<Object?> get props => [key, title, content];
}
