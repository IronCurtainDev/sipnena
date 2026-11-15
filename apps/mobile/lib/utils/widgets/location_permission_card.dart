import 'package:flutter/cupertino.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class LocationPermissionCard extends StatelessWidget {
  const LocationPermissionCard({
    required this.enabled,
    required this.onChanged,
    super.key,
  });

  final bool enabled;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: context.themeService.blackColor),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Image.asset(
                      AppImages.location,
                      width: 16,
                      height: 16,
                    ),
                    Gap.small8,
                    Text(
                      'Used for pickup and ride tracking',
                      style: context.bodyXSmall12(color: context.themeService.hintTextColor),
                    ),
                  ],
                ),
                Text(
                  'Location Services',
                  style: context.headline16(fontWeight: FontWeight.w700),
                ),
              ],
            ),
          ),
          CupertinoSwitch(
            value: enabled,
            onChanged: onChanged,
          ),
        ],
      ),
    );
  }
}
