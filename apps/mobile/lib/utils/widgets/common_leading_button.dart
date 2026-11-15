import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class LeadingButton extends StatelessWidget {
  const LeadingButton({required this.icon, this.width, this.height, this.iconColor, this.color, super.key, this.onPressed});
  final IconData icon;
  final double? width;
  final double? height;
  final Color? iconColor;
  final Color? color;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Container(
        width: width ?? 44,
        height: height ?? 44,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(18),
          color: color ?? context.themeService.whiteColor,
        ),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(5, 0, 0, 0),
          child: IconButton(
            icon: Icon(
              icon,
              size: 16,
              color: iconColor ?? context.colorScheme.primary,
              weight: 700,
            ),
            onPressed: onPressed ??
                () {
                  Navigator.of(context).pop();
                },
          ),
        ),
      ),
    );
  }
}
