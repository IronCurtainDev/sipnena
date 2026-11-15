import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/app/theme/app_theme_extension.dart';

class CommonDivider extends StatelessWidget {
  const CommonDivider({
    super.key,
    this.height = 1,
    this.thickness = 1,
    this.color,
  });
  final double height;
  final double thickness;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return Divider(
      height: height,
      thickness: thickness,
      color: color ?? context.themeService.blackColor.withValues(alpha: 0.08),
    );
  }
}
