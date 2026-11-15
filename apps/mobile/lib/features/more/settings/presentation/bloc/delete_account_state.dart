import 'package:equatable/equatable.dart';

sealed class DeleteAccountState extends Equatable {
  const DeleteAccountState();

  @override
  List<Object?> get props => [];
}

final class DeleteAccountInitial extends DeleteAccountState {}

final class DeleteAccountLoading extends DeleteAccountState {}

final class DeleteAccountSuccess extends DeleteAccountState {}

final class DeleteAccountFailure extends DeleteAccountState {
  const DeleteAccountFailure(this.message);

  final String message;

  @override
  List<Object?> get props => [message];
}
