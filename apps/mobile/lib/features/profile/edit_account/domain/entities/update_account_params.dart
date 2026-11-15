import 'package:equatable/equatable.dart';

/// Parameters for updating account details.
class UpdateAccountParams extends Equatable {
  const UpdateAccountParams({
    this.firstName,
    this.lastName,
    this.phoneNumber,
  });

  final String? firstName;
  final String? lastName;
  final String? phoneNumber;

  @override
  List<Object?> get props => [firstName, lastName, phoneNumber];
}
