import 'package:equatable/equatable.dart';

class SubmitStepThreeParams extends Equatable {
  const SubmitStepThreeParams({
    required this.occupation,
  });

  final String occupation;

  @override
  List<Object?> get props => [occupation];
}
