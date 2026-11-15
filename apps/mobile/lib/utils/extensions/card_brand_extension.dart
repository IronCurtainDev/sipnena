import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:react_hono_flutter_template/utils/assets/images.dart';

/// Extension on [String] to resolve credit card brand images and vector icons.
extension CardBrandExtension on String {
  /// Resolves the local image asset path for this card brand string.
  String get cardBrandAsset {
    final lowerBrand = toLowerCase();
    if (lowerBrand.contains('visa')) {
      return AppImages.visa;
    } else if (lowerBrand.contains('master') || lowerBrand.contains('mc')) {
      return AppImages.mastercard;
    } else if (lowerBrand.contains('american') || lowerBrand.contains('amex')) {
      return AppImages.americanExpress;
    }
    return AppImages.card;
  }

  /// Convenience alias for [cardBrandAsset].
  String get brandAsset => cardBrandAsset;

  /// Resolves the vector font awesome icon for this card brand string.
  FaIconData get cardBrandIcon {
    final lowerBrand = toLowerCase();
    if (lowerBrand.contains('visa')) {
      return FontAwesomeIcons.ccVisa;
    } else if (lowerBrand.contains('master') || lowerBrand.contains('mc')) {
      return FontAwesomeIcons.ccMastercard;
    } else if (lowerBrand.contains('american') || lowerBrand.contains('amex')) {
      return FontAwesomeIcons.ccAmex;
    } else if (lowerBrand.contains('discover')) {
      return FontAwesomeIcons.ccDiscover;
    } else if (lowerBrand.contains('jcb')) {
      return FontAwesomeIcons.ccJcb;
    }
    return FontAwesomeIcons.creditCard;
  }

  /// Convenience alias for [cardBrandIcon].
  FaIconData get brandIcon => cardBrandIcon;
}
