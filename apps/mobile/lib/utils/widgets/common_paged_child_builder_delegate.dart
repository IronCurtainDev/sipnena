import 'package:flutter/material.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A standardized [PagedChildBuilderDelegate] that pre-wires
/// theme-consistent shimmer/loaders, new page indicators, empty states, and error handling
/// for [PagedListView] and [PagedSliverList].
///
/// **Problem Solved:**
/// In `infinite_scroll_pagination` v5, every paginated list must define a
/// [PagedChildBuilderDelegate] with separate builders for loading the first page,
/// loading subsequent pages, displaying empty states, and handling errors.
/// Without this utility, developers must manually construct 4–5 indicator builders
/// on every screen, often resulting in hardcoded raw widgets (e.g. [CircularProgressIndicator],
/// inline [Text] without theme typography, or raw [EdgeInsets]), leading to visual
/// inconsistency and excessive boilerplate duplication across the app.
///
/// **Benefits:**
/// 1. **DRY Principle**: Eliminates ~25 lines of repetitive builder boilerplate per paginated screen.
/// 2. **Design System Compliance**: Enforces app-wide theme consistency by automatically wiring
///    [CommonShimmerList], [CommonNewPageProgressIndicator], [CommonNoItemsFound], and [CommonErrorState].
/// 3. **Declarative API**: Configure empty state titles/icons, error messages, retry callbacks,
///    and shimmers as clean constructor properties without writing boilerplate builder closures.
/// 4. **Flexible Overrides**: Any builder ([firstPageProgressIndicatorBuilder],
///    [newPageProgressIndicatorBuilder], [noItemsFoundIndicatorBuilder], [firstPageErrorIndicatorBuilder],
///    or [newPageErrorIndicatorBuilder]) can still be fully overridden if a bespoke UI is required.
///
/// **Before (Without `CommonPagedChildBuilderDelegate`):**
/// ```dart
/// builderDelegate: PagedChildBuilderDelegate<Booking>(
///   itemBuilder: (context, history, index) => TripHistoryCard(history: history),
///   firstPageProgressIndicatorBuilder: (context) => const CommonShimmerList(
///     itemCount: 3,
///     height: 100,
///     padding: EdgeInsets.only(top: 16), // Raw padding
///   ),
///   newPageProgressIndicatorBuilder: (context) => const Center(
///     child: CircularProgressIndicator(), // Raw Flutter widget
///   ),
///   noItemsFoundIndicatorBuilder: (context) => Center(
///     child: Text(
///       context.l10n.noBookingsFound,
///       style: context.bodyRegular16(),
///     ),
///   ),
///   firstPageErrorIndicatorBuilder: (context) => Center(
///     child: Text(
///       pagingController.error.toString(),
///       style: context.bodyRegular16(),
///       textAlign: TextAlign.center,
///     ),
///   ),
/// )
/// ```
///
/// **After (With `CommonPagedChildBuilderDelegate`):**
/// ```dart
/// builderDelegate: CommonPagedChildBuilderDelegate<Booking>(
///   itemBuilder: (context, history, index) => TripHistoryCard(history: history),
///   shimmer: const HistoryListShimmer(),
///   noItemsTitle: context.l10n.noBookingsFound,
///   noItemsIcon: Icons.history_rounded,
///   firstPageErrorMessage: pagingController.error?.toString(),
///   onRetry: pagingController.refresh,
/// )
/// ```
class CommonPagedChildBuilderDelegate<ItemType> extends PagedChildBuilderDelegate<ItemType> {
  /// Creates a standardized [PagedChildBuilderDelegate] that pre-wires
  /// theme-consistent shimmer/loaders, new page indicators, empty states, and error handling
  /// for [PagedListView] and [PagedSliverList].
  ///
  /// **Problem Solved:**
  /// In `infinite_scroll_pagination` v5, every paginated list must define a
  /// [PagedChildBuilderDelegate] with separate builders for loading the first page,
  /// loading subsequent pages, displaying empty states, and handling errors.
  /// Without this utility, developers must manually construct 4–5 indicator builders
  /// on every screen, often resulting in hardcoded raw widgets (e.g. [CircularProgressIndicator],
  /// inline [Text] without theme typography, or raw [EdgeInsets]), leading to visual
  /// inconsistency and excessive boilerplate duplication across the app.
  ///
  /// **Benefits:**
  /// 1. **DRY Principle**: Eliminates ~25 lines of repetitive builder boilerplate per paginated screen.
  /// 2. **Design System Compliance**: Enforces app-wide theme consistency by automatically wiring
  ///    [CommonShimmerList], [CommonNewPageProgressIndicator], [CommonNoItemsFound], and [CommonErrorState].
  /// 3. **Declarative API**: Configure empty state titles/icons, error messages, retry callbacks,
  ///    and shimmers as clean constructor properties without writing boilerplate builder closures.
  /// 4. **Flexible Overrides**: Any builder ([firstPageProgressIndicatorBuilder],
  ///    [newPageProgressIndicatorBuilder], [noItemsFoundIndicatorBuilder], [firstPageErrorIndicatorBuilder],
  ///    or [newPageErrorIndicatorBuilder]) can still be fully overridden if a bespoke UI is required.
  ///
  /// **Before (Without `CommonPagedChildBuilderDelegate`):**
  /// ```dart
  /// builderDelegate: PagedChildBuilderDelegate<Booking>(
  ///   itemBuilder: (context, history, index) => TripHistoryCard(history: history),
  ///   firstPageProgressIndicatorBuilder: (context) => const CommonShimmerList(
  ///     itemCount: 3,
  ///     height: 100,
  ///     padding: EdgeInsets.only(top: 16), // Raw padding
  ///   ),
  ///   newPageProgressIndicatorBuilder: (context) => const Center(
  ///     child: CircularProgressIndicator(), // Raw Flutter widget
  ///   ),
  ///   noItemsFoundIndicatorBuilder: (context) => Center(
  ///     child: Text(
  ///       context.l10n.noBookingsFound,
  ///       style: context.bodyRegular16(),
  ///     ),
  ///   ),
  ///   firstPageErrorIndicatorBuilder: (context) => Center(
  ///     child: Text(
  ///       pagingController.error.toString(),
  ///       style: context.bodyRegular16(),
  ///       textAlign: TextAlign.center,
  ///     ),
  ///   ),
  /// )
  /// ```
  ///
  /// **After (With `CommonPagedChildBuilderDelegate`):**
  /// ```dart
  /// builderDelegate: CommonPagedChildBuilderDelegate<Booking>(
  ///   itemBuilder: (context, history, index) => TripHistoryCard(history: history),
  ///   shimmer: const HistoryListShimmer(),
  ///   noItemsTitle: context.l10n.noBookingsFound,
  ///   noItemsIcon: Icons.history_rounded,
  ///   firstPageErrorMessage: pagingController.error?.toString(),
  ///   onRetry: pagingController.refresh,
  /// )
  /// ```
  CommonPagedChildBuilderDelegate({
    required super.itemBuilder,
    WidgetBuilder? firstPageProgressIndicatorBuilder,
    WidgetBuilder? newPageProgressIndicatorBuilder,
    WidgetBuilder? noItemsFoundIndicatorBuilder,
    WidgetBuilder? firstPageErrorIndicatorBuilder,
    super.newPageErrorIndicatorBuilder,
    super.noMoreItemsIndicatorBuilder,
    super.animateTransitions,
    super.transitionDuration,

    /// A convenience shimmer widget (e.g. [CommonShimmerList] or a feature-specific shimmer)
    /// displayed while the initial page is loading.
    Widget? shimmer,

    /// Title text displayed in the default [CommonNoItemsFound] widget when no items are returned.
    String? noItemsTitle,

    /// Optional subtitle text displayed in the default [CommonNoItemsFound] widget.
    String? noItemsSubtitle,

    /// Icon displayed in the default [CommonNoItemsFound] widget. Defaults to [Icons.search_off_rounded].
    IconData? noItemsIcon,

    /// Optional custom illustration widget displayed in the default [CommonNoItemsFound] widget instead of an icon.
    Widget? noItemsIllustration,

    /// Error message displayed in the default [CommonErrorState] widget when first page loading fails.
    String? firstPageErrorMessage,

    /// Callback invoked when the user taps retry in [CommonErrorState].
    VoidCallback? onRetry,
  }) : super(
          firstPageProgressIndicatorBuilder:
              firstPageProgressIndicatorBuilder ?? (shimmer != null ? (_) => shimmer : (_) => const Center(child: CommonCircularLoader())),
          newPageProgressIndicatorBuilder: newPageProgressIndicatorBuilder ?? (_) => const CommonNewPageProgressIndicator(),
          noItemsFoundIndicatorBuilder: noItemsFoundIndicatorBuilder ??
              ((context) => CommonNoItemsFound(
                    title: noItemsTitle ?? context.l10n.noItemsFound,
                    subtitle: noItemsSubtitle,
                    icon: noItemsIcon,
                    illustration: noItemsIllustration,
                  )),
          firstPageErrorIndicatorBuilder: firstPageErrorIndicatorBuilder ??
              ((context) => CommonErrorState(
                    message: firstPageErrorMessage ?? context.l10n.genericError,
                    onRetry: onRetry,
                  )),
        );
}
