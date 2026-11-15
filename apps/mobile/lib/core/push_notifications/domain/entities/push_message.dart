import 'package:equatable/equatable.dart';

/// Clean domain entity representing an incoming push notification message.
class PushMessage extends Equatable {
  const PushMessage({
    this.uuid,
    this.title,
    this.body,
    this.data = const {},
  });

  final String? uuid;
  final String? title;
  final String? body;
  final Map<String, dynamic> data;

  @override
  List<Object?> get props => [uuid, title, body, data];
}
