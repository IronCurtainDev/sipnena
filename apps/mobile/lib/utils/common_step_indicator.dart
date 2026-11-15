import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class CommonStepIndicator extends StatelessWidget {
  const CommonStepIndicator({
    required this.currentStep,
    this.totalSteps = 4,
    super.key,
  });

  final int currentStep;
  final int totalSteps;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: List.generate(totalSteps, (index) {
        final step = index + 1;
        final isActive = step == currentStep;
        final isCompleted = step < currentStep;

        return Expanded(
          flex: index < totalSteps - 1 ? 1 : 0,
          child: Row(
            children: [
              StepIcon(isActive: isActive, isCompleted: isCompleted),
              if (index < totalSteps - 1) Expanded(child: StepConnector(isCompleted: isCompleted)),
            ],
          ),
        );
      }),
    );
  }
}

class StepIcon extends StatelessWidget {
  const StepIcon({
    required this.isActive,
    required this.isCompleted,
    super.key,
  });

  final bool isActive;
  final bool isCompleted;

  @override
  Widget build(BuildContext context) {
    final blackColor = context.themeService.blackColor;
    const greyColor = Color.fromRGBO(230, 230, 230, 1);
    const darkGreyColor = Color.fromRGBO(200, 200, 200, 1);

    // Completed Step: Black circle with checkmark
    if (isCompleted) {
      return Container(
        width: 24,
        height: 24,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: blackColor,
        ),
        child: Icon(
          Icons.check,
          color: context.themeService.whiteColor,
          size: 16,
        ),
      );
    }

    // Current Active Step: Black outer circle with black dot inside
    if (isActive) {
      return Container(
        width: 24,
        height: 24,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(
            color: blackColor,
            width: 1.5,
          ),
        ),
        padding: const EdgeInsets.all(4),
        child: Container(
          decoration: BoxDecoration(
            color: blackColor,
            shape: BoxShape.circle,
          ),
        ),
      );
    }

    // Inactive Step: Grey circle with grey dot
    return Container(
      width: 24,
      height: 24,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(
          color: greyColor,
          width: 1.5,
        ),
      ),
      padding: const EdgeInsets.all(4),
      child: Container(
        decoration: const BoxDecoration(
          color: darkGreyColor,
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}

class StepConnector extends StatelessWidget {
  const StepConnector({
    required this.isCompleted,
    super.key,
  });

  final bool isCompleted;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 4,
      margin: const EdgeInsets.symmetric(horizontal: 4),
      decoration: BoxDecoration(
        color: isCompleted ? context.themeService.blackColor : const Color.fromRGBO(210, 210, 210, 1),
        borderRadius: BorderRadius.circular(1),
      ),
    );
  }
}
