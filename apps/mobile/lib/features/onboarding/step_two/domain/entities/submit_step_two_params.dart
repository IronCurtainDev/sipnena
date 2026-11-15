import 'package:equatable/equatable.dart';

class SubmitStepTwoParams extends Equatable {
  const SubmitStepTwoParams({
    required this.address,
  });

  final String address;

  @override
  List<Object?> get props => [address];
}
