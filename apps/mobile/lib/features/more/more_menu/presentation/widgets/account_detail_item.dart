import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class AccountDetailItem extends StatelessWidget {
  const AccountDetailItem({
    required this.label,
    required this.value,
    super.key,
  });

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
      decoration: BoxDecoration(
        color: context.themeService.whiteColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: const Color.fromRGBO(230, 230, 230, 1),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: context.bodyRegular14(
              color: context.themeService.blackColor,
              fontWeight: FontWeight.w400,
            ),
          ),
          Gap.extraSmall4,
          Expanded(
            child: Text(
              value,
              textAlign: TextAlign.end,
              overflow: TextOverflow.ellipsis,
              style: context.bodyRegular14(
                color: context.themeService.hintTextColor,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
