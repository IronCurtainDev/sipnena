import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class LocationPlaceTile extends StatelessWidget {
  const LocationPlaceTile({
    required this.title,
    required this.subtitle,
    required this.onTap,
    this.leadingIcon,
    super.key,
  });

  final String title;
  final String subtitle;
  final VoidCallback onTap;
  final Widget? leadingIcon;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Row(
          children: [
            CircleAvatar(
              radius: 18,
              backgroundColor: const Color.fromRGBO(246, 246, 246, 1),
              child: leadingIcon ??
                  Icon(
                    Icons.location_on_outlined,
                    size: 20,
                    color: context.themeService.blackColor,
                  ),
            ),
            Gap.medium12,
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: context.bodyRegular14().bold,
                  ),
                  Gap.extraSmall2,
                  Text(
                    subtitle,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: context.bodyXSmall12(
                      color: context.themeService.hintTextColor,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
