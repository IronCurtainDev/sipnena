import 'package:equatable/equatable.dart';

sealed class ContactMessageState extends Equatable {
  const ContactMessageState();

  @override
  List<Object?> get props => [];
}

final class ContactMessageInitial extends ContactMessageState {
  const ContactMessageInitial();
}

final class ContactMessageLoading extends ContactMessageState {
  const ContactMessageLoading();
}

final class ContactMessageSuccess extends ContactMessageState {
  const ContactMessageSuccess();
}

final class ContactMessageFailure extends ContactMessageState {
  const ContactMessageFailure(this.message);

  final String message;

  @override
  List<Object?> get props => [message];
}
