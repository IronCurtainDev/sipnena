import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class CommonBarButton extends StatelessWidget {
  const CommonBarButton({
    super.key,
    this.onTap,
  });

  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        decoration: BoxDecoration(
          color: context.themeService.whiteColor,
          borderRadius: BorderRadius.circular(24),
          border: Border.all(
            color: context.themeService.commonTextColor.withAlpha(13),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withAlpha(8),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Text(
              'Visit Our Website',
              style: context.buttonSmall14(
                fontWeight: FontWeight.w400,
                color: context.themeService.commonTextColor,
              ),
            ),
            const Spacer(),
            Icon(
              Icons.open_in_new_rounded,
              size: 20,
              color: context.themeService.commonTextColor,
            ),
          ],
        ),
      ),
    );
  }
}
