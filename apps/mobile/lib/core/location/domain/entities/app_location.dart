import 'package:equatable/equatable.dart';

class AppLocation extends Equatable {
  const AppLocation({
    required this.latitude,
    required this.longitude,
  });

  final double latitude;
  final double longitude;

  @override
  List<Object?> get props => [latitude, longitude];
}
