import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class CommonLargeTitleHeader extends StatelessWidget implements PreferredSizeWidget {
  const CommonLargeTitleHeader({
    this.title = '',
    this.titleStyle,
    this.showBackButton = false,
    this.actions,
    super.key,
  });

  final String title;
  final TextStyle? titleStyle;
  final bool showBackButton;
  final List<Widget>? actions;

  @override
  Widget build(BuildContext context) {
    return CommonAppBar(
      title: titleStyle != null ? Text(title, style: titleStyle) : title,
      showBackButton: showBackButton,
      actions: actions,
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
