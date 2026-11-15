import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class MoreMenuButton extends StatelessWidget {
  const MoreMenuButton({
    required this.title,
    required this.onPressed,
    this.icon,
    this.iconData,
    this.color,
    this.textColor,
    super.key,
  }) : assert(icon != null || iconData != null, 'Either icon or iconData must be provided');

  final String title;
  final VoidCallback onPressed;
  final String? icon;
  final IconData? iconData;
  final Color? color;
  final Color? textColor;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onPressed,
      borderRadius: BorderRadius.circular(40),
      child: Container(
        width: double.infinity,
        height: 52,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        decoration: BoxDecoration(
          color: context.colorScheme.surface,
          borderRadius: BorderRadius.circular(40),
          boxShadow: [
            BoxShadow(
              color: context.colorScheme.shadow.withValues(alpha: 0.08),
              spreadRadius: 0.2,
            ),
            BoxShadow(
              color: context.colorScheme.shadow.withValues(alpha: 0.04),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            if (iconData != null)
              Icon(
                iconData,
                size: 24,
                color: color ?? context.colorScheme.primary,
              )
            else if (icon != null)
              Image.asset(
                icon!,
                width: 24,
                height: 24,
                fit: BoxFit.cover,
                color: color,
              ),
            Gap.medium16,
            Expanded(
              child: Text(
                title,
                style: context.headline14(
                  fontWeight: FontWeight.w600,
                  color: textColor ?? context.colorScheme.onSurface,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
