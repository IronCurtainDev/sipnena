import 'package:equatable/equatable.dart';

class GetNotificationsParams extends Equatable {
  const GetNotificationsParams({required this.page});

  final int page;

  @override
  List<Object?> get props => [page];
}
