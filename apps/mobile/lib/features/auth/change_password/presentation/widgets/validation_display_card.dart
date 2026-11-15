import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class ValidationItem extends StatelessWidget {
  const ValidationItem({
    required this.text,
    required this.isValid,
    super.key,
  });

  final String text;
  final bool isValid;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        children: [
          Icon(
            isValid ? Icons.check_circle_outline : Icons.cancel_outlined,
            color: isValid ? context.themeService.successColor : context.themeService.hintTextColor,
            size: 20,
          ),
          Gap.small8,
          Text(
            text,
            style: context.bodyRegular14(
              color: isValid ? context.themeService.successColor : context.themeService.hintTextColor,
            ),
          ),
        ],
      ),
    );
  }
}
