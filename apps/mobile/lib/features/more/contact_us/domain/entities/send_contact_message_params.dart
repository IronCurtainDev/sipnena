import 'package:equatable/equatable.dart';

/// Parameters for sending a contact/feedback message.
class SendContactMessageParams extends Equatable {
  const SendContactMessageParams({required this.message});

  final String message;

  @override
  List<Object?> get props => [message];
}
