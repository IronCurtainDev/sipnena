// ignore_for_file: comment_references

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A universal image widget that smartly handles Network, Asset, and SVG images.
///
/// Automatically detects input type based on the [url] string:
/// - **Network**: Starts with 'http' or 'https'
/// - **Asset**: Anything else
/// - **SVG**: Ends with '.svg'
///
/// ## Usage
/// ```dart
/// CommonImage(url: 'https://site.com/img.png') // Network Image
/// CommonImage(url: 'assets/logo.svg')          // Asset SVG
/// CommonImage(url: 'assets/banner.png')        // Asset PNG
/// ```
class CommonImage extends StatelessWidget {
  /// Creates a smart image widget.
  const CommonImage({
    required this.url,
    super.key,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.placeholder,
    this.errorWidget,
    this.borderRadius,
    this.color, // Useful for SVGs
    this.filterQuality = FilterQuality.medium,
    this.cacheWidth,
    this.cacheHeight,
  }) : _isCircle = false;

  /// Creates a circular image (avatar style).
  const CommonImage.circle({
    required this.url,
    required double radius,
    super.key,
    double? width,
    double? height,
    this.placeholder,
    this.errorWidget,
    this.color,
    this.filterQuality = FilterQuality.medium,
    this.cacheWidth,
    this.cacheHeight,
  })  : width = width ?? radius * 2,
        height = height ?? radius * 2,
        fit = BoxFit.cover,
        borderRadius = null,
        _isCircle = true;

  /// The URL or Path of the image.
  ///
  /// - `http...` -> Network
  /// - `assets/...` -> Asset
  /// - `...svg` -> SVG
  final String url;

  /// Width of the image.
  final double? width;

  /// Height of the image.
  final double? height;

  /// How the image should fit within its bounds.
  final BoxFit fit;

  /// Widget to show while loading (Network only).
  final Widget? placeholder;

  /// Widget to show on error.
  final Widget? errorWidget;

  /// Border radius for rounded corners.
  final BorderRadius? borderRadius;

  /// Color filter for SVGs or images.
  final Color? color;

  /// The quality of image filtering. Defaults to [FilterQuality.medium] for crisp rendering.
  final FilterQuality filterQuality;

  /// Optional explicit target cache width in physical pixels.
  final int? cacheWidth;

  /// Optional explicit target cache height in physical pixels.
  final int? cacheHeight;

  final bool _isCircle;

  bool get _isNetwork => url.startsWith('http');
  bool get _isSvg => url.toLowerCase().endsWith('.svg');

  @override
  Widget build(BuildContext context) {
    Widget imageContent;

    if (_isSvg) {
      imageContent = _SvgImageWidget(
        url: url,
        width: width,
        height: height,
        fit: fit,
        color: color,
        placeholder: placeholder,
        isNetwork: _isNetwork,
      );
    } else if (_isNetwork) {
      imageContent = _NetworkImageWidget(
        url: url,
        width: width,
        height: height,
        fit: fit,
        color: color,
        placeholder: placeholder,
        errorWidget: errorWidget,
        filterQuality: filterQuality,
        cacheWidth: cacheWidth,
        cacheHeight: cacheHeight,
      );
    } else {
      imageContent = _AssetImageWidget(
        url: url,
        width: width,
        height: height,
        fit: fit,
        color: color,
        errorWidget: errorWidget,
        filterQuality: filterQuality,
        cacheWidth: cacheWidth,
        cacheHeight: cacheHeight,
      );
    }

    if (_isCircle) {
      return imageContent.clipOval;
    }

    if (borderRadius != null) {
      return ClipRRect(borderRadius: borderRadius!, child: imageContent);
    }

    return imageContent;
  }
}

class _SvgImageWidget extends StatelessWidget {
  const _SvgImageWidget({
    required this.url,
    required this.isNetwork,
    required this.fit,
    this.width,
    this.height,
    this.color,
    this.placeholder,
  });

  final String url;
  final bool isNetwork;
  final double? width;
  final double? height;
  final BoxFit fit;
  final Color? color;
  final Widget? placeholder;

  @override
  Widget build(BuildContext context) {
    if (isNetwork) {
      return SvgPicture.network(
        url,
        width: width,
        height: height,
        fit: fit,
        colorFilter: color != null ? ColorFilter.mode(color!, BlendMode.srcIn) : null,
        placeholderBuilder: (context) => placeholder ?? _DefaultPlaceholderWidget(width: width, height: height),
      );
    }
    return SvgPicture.asset(
      url,
      width: width,
      height: height,
      fit: fit,
      colorFilter: color != null ? ColorFilter.mode(color!, BlendMode.srcIn) : null,
    );
  }
}

class _NetworkImageWidget extends StatelessWidget {
  const _NetworkImageWidget({
    required this.url,
    required this.fit,
    this.width,
    this.height,
    this.color,
    this.placeholder,
    this.errorWidget,
    this.filterQuality = FilterQuality.medium,
    this.cacheWidth,
    this.cacheHeight,
  });

  final String url;
  final double? width;
  final double? height;
  final BoxFit fit;
  final Color? color;
  final Widget? placeholder;
  final Widget? errorWidget;
  final FilterQuality filterQuality;
  final int? cacheWidth;
  final int? cacheHeight;

  @override
  Widget build(BuildContext context) {
    final dpr = MediaQuery.maybeDevicePixelRatioOf(context) ?? 1.0;
    final int? effectiveCacheWidth;
    final int? effectiveCacheHeight;

    if (cacheWidth != null || cacheHeight != null) {
      effectiveCacheWidth = cacheWidth;
      effectiveCacheHeight = cacheHeight;
    } else if (fit == BoxFit.fill) {
      effectiveCacheWidth = width != null && width! > 0 && width != double.infinity ? (width! * dpr).round() : null;
      effectiveCacheHeight = height != null && height! > 0 && height != double.infinity ? (height! * dpr).round() : null;
    } else {
      // For contain, cover, etc., only constrain the dominant dimension.
      // Passing both dimensions in Flutter's image decoder forcibly distorts
      // the intrinsic aspect ratio before BoxFit is applied.
      if (width != null && width! > 0 && width != double.infinity) {
        effectiveCacheWidth = (width! * dpr).round();
        effectiveCacheHeight = null;
      } else if (height != null && height! > 0 && height != double.infinity) {
        effectiveCacheWidth = null;
        effectiveCacheHeight = (height! * dpr).round();
      } else {
        effectiveCacheWidth = null;
        effectiveCacheHeight = null;
      }
    }

    return CachedNetworkImage(
      imageUrl: url,
      width: width,
      height: height,
      fit: fit,
      color: color,
      filterQuality: filterQuality,
      memCacheWidth: effectiveCacheWidth,
      memCacheHeight: effectiveCacheHeight,
      placeholder: (context, url) => placeholder ?? _DefaultPlaceholderWidget(width: width, height: height),
      errorWidget: (context, url, error) => errorWidget ?? _DefaultErrorWidget(width: width, height: height),
    );
  }
}

class _AssetImageWidget extends StatelessWidget {
  const _AssetImageWidget({
    required this.url,
    required this.fit,
    this.width,
    this.height,
    this.color,
    this.errorWidget,
    this.filterQuality = FilterQuality.medium,
    this.cacheWidth,
    this.cacheHeight,
  });

  final String url;
  final double? width;
  final double? height;
  final BoxFit fit;
  final Color? color;
  final Widget? errorWidget;
  final FilterQuality filterQuality;
  final int? cacheWidth;
  final int? cacheHeight;

  @override
  Widget build(BuildContext context) {
    final dpr = MediaQuery.maybeDevicePixelRatioOf(context) ?? 1.0;
    final int? effectiveCacheWidth;
    final int? effectiveCacheHeight;

    if (cacheWidth != null || cacheHeight != null) {
      effectiveCacheWidth = cacheWidth;
      effectiveCacheHeight = cacheHeight;
    } else if (fit == BoxFit.fill) {
      effectiveCacheWidth = width != null && width! > 0 && width != double.infinity ? (width! * dpr).round() : null;
      effectiveCacheHeight = height != null && height! > 0 && height != double.infinity ? (height! * dpr).round() : null;
    } else {
      // For contain, cover, etc., only constrain the dominant dimension.
      // Passing both dimensions in Flutter's image decoder forcibly distorts
      // the intrinsic aspect ratio before BoxFit is applied.
      if (width != null && width! > 0 && width != double.infinity) {
        effectiveCacheWidth = (width! * dpr).round();
        effectiveCacheHeight = null;
      } else if (height != null && height! > 0 && height != double.infinity) {
        effectiveCacheWidth = null;
        effectiveCacheHeight = (height! * dpr).round();
      } else {
        effectiveCacheWidth = null;
        effectiveCacheHeight = null;
      }
    }

    return Image.asset(
      url,
      width: width,
      height: height,
      fit: fit,
      color: color,
      filterQuality: filterQuality,
      cacheWidth: effectiveCacheWidth,
      cacheHeight: effectiveCacheHeight,
      errorBuilder: (context, error, stackTrace) => errorWidget ?? _DefaultErrorWidget(width: width, height: height),
    );
  }
}

class _DefaultPlaceholderWidget extends StatelessWidget {
  const _DefaultPlaceholderWidget({this.width, this.height});

  final double? width;
  final double? height;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Container(
      width: width,
      height: height,
      color: colorScheme.surfaceContainerHighest,
      child: Center(
        child: SizedBox(
          width: 24,
          height: 24,
          child: CircularProgressIndicator(
            strokeWidth: 2,
            color: colorScheme.primary,
          ),
        ),
      ),
    );
  }
}

class _DefaultErrorWidget extends StatelessWidget {
  const _DefaultErrorWidget({this.width, this.height});

  final double? width;
  final double? height;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Container(
      width: width,
      height: height,
      color: colorScheme.surfaceContainerHighest,
      child: Icon(
        Icons.broken_image,
        color: colorScheme.outline,
        size: 24,
      ),
    );
  }
}
