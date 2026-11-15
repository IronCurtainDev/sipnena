import 'package:equatable/equatable.dart';

class MarkAsReadParams extends Equatable {
  const MarkAsReadParams({required this.uuid});

  final String uuid;

  @override
  List<Object?> get props => [uuid];
}
