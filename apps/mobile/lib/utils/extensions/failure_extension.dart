import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/core/error/failures.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Extension on [Failure] to easily map domain failures to localized UI strings.
extension FailureL10nExtension on Failure {
  /// Returns a localized, user-friendly error message based on the failure type.
  String localizedMessage(BuildContext context) {
    if (this is NetworkFailure) {
      if (message.toLowerCase().contains('timeout')) {
        return context.l10n.errorTimeout;
      }
      return context.l10n.errorNetwork;
    }

    if (this is ServerFailure) {
      return context.l10n.errorServer;
    }

    if (this is AuthFailure) {
      return context.l10n.errorSessionExpired;
    }

    if (this is ApiKeyFailure) {
      return context.l10n.errorMissingApiKey;
    }

    if (this is OutsideCorridorFailure) {
      return context.l10n.locationOutsideServiceArea;
    }

    if (this is ValidationFailure) {
      // Return the raw validation message if it's safe for the user,
      // otherwise fallback to a generic validation message.
      return message.isNotEmpty ? message : context.l10n.genericError;
    }

    return message.isNotEmpty ? message : context.l10n.genericError;
  }
}
