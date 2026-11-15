import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/domain/domain.dart';

sealed class ContactState extends Equatable {
  const ContactState();

  @override
  List<Object?> get props => [];
}

final class ContactInitial extends ContactState {
  const ContactInitial();
}

final class ContactLoading extends ContactState {
  const ContactLoading();
}

final class ContactLoaded extends ContactState {
  const ContactLoaded(this.contact);

  final ContactInfo contact;

  @override
  List<Object?> get props => [contact];
}

final class ContactFailure extends ContactState {
  const ContactFailure(this.message);

  final String message;

  @override
  List<Object?> get props => [message];
}
