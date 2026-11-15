import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/domain/entities/get_notifications_params.dart';

class GetNotificationsRequestModel extends Equatable {
  const GetNotificationsRequestModel({required this.page});

  factory GetNotificationsRequestModel.fromEntity(GetNotificationsParams params) {
    return GetNotificationsRequestModel(page: params.page);
  }

  final int page;

  Map<String, dynamic> toJson() => {'page': page};

  @override
  List<Object?> get props => [page];
}
