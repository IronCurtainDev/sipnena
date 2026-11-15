import 'package:equatable/equatable.dart';

abstract class GetNotificationsState extends Equatable {
  const GetNotificationsState();

  @override
  List<Object?> get props => [];
}

class GetNotificationsInitial extends GetNotificationsState {
  const GetNotificationsInitial();
}
