// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appName => 'Starter';

  @override
  String get signIn => 'Sign In';

  @override
  String get signUp => 'Create Account';

  @override
  String get signUpTitle => 'Sign Up';

  @override
  String get email => 'Email address';

  @override
  String get password => 'Password';

  @override
  String get forgotPassword => 'Reset Your Password';

  @override
  String get forgotPasswordQuestion => 'Forgot Password?';

  @override
  String get alreadyHaveAccount => 'Already have an account?';

  @override
  String get dontHaveAccount => 'Don\'t have an account?';

  @override
  String get firstName => 'First Name';

  @override
  String get lastName => 'Last Name';

  @override
  String get home => 'Home';

  @override
  String get explore => 'Explore';

  @override
  String get settings => 'Settings';

  @override
  String get profile => 'Profile';

  @override
  String get more => 'More';

  @override
  String get logout => 'Logout';

  @override
  String get cancel => 'Cancel';

  @override
  String get ok => 'OK';

  @override
  String get error => 'Error';

  @override
  String get success => 'Success';

  @override
  String get signInFailed => 'Sign In Failed';

  @override
  String get signUpFailed => 'Sign Up Failed';

  @override
  String get emailAlreadyRegisteredTitle => 'Email Already Registered';

  @override
  String get emailAlreadyRegisteredMessage =>
      'An account already exists with this email address. Sign in to continue. If you\'ve forgotten your password, you can reset it from the Sign In screen.';

  @override
  String get invalidEmail => 'Invalid Email';

  @override
  String get validEmailAddressRequired => 'Valid Email Address Required';

  @override
  String get validPasswordRequired => 'Valid Password Required';

  @override
  String get designSystem => 'Design System';

  @override
  String get helpSupport => 'Help & Support';

  @override
  String get about => 'About';

  @override
  String get account => 'Account';

  @override
  String get editProfile => 'Edit Profile';

  @override
  String get changePassword => 'Change Password';

  @override
  String get currentPassword => 'Current password';

  @override
  String get newPassword => 'New password';

  @override
  String get retypeNewPassword => 'Re-type new password';

  @override
  String get passwordChangedTitle => 'Password Changed';

  @override
  String get passwordChangedMessage => 'Your password has been changed.';

  @override
  String get changePasswordDescription => 'Stay secure and change your password.';

  @override
  String get yes => 'Yes';

  @override
  String get no => 'No';

  @override
  String get homeContent => 'Home Content';

  @override
  String get introSignIn => 'Sign In';

  @override
  String get introSignUp => 'Sign Up';

  @override
  String get introTagline => 'Clean Architecture & BLoC Starter';

  @override
  String get introTaglinePrefix => 'Clean Architecture & ';

  @override
  String get introTaglineSuffix => 'BLoC Starter';

  @override
  String get requestFailed => 'Request Failed';

  @override
  String get checkEmail => 'Please Check Your Email';

  @override
  String get passwordResetSent => 'A password reset link has been sent to your dedicated email';

  @override
  String get didntReceiveEmail => 'Didn\'t receive the email?';

  @override
  String get resend => 'Resend';

  @override
  String get enterEmailReset => 'Enter the email address linked to your account. We’ll email you a link to reset your password.';

  @override
  String get sendVerificationLink => 'Send Verification Link';

  @override
  String get submit => 'Submit';

  @override
  String get verification => 'Verify';

  @override
  String get logOut => 'Log Out';

  @override
  String get enterVerificationCode => 'Enter Verification Code';

  @override
  String get verificationCodeSent => 'Enter the verification code sent to';

  @override
  String get resendCode => 'Resend Code';

  @override
  String get verificationCodeResent => 'Verification code resent';

  @override
  String get or => 'Or';

  @override
  String get sendCodeMobile => 'Send the verification code to your mobile number?';

  @override
  String get sendCode => 'Send the code';

  @override
  String get didntReceiveCode => 'Didn\'t receive the code?';

  @override
  String get step1Title => 'Step 1: Personal Details';

  @override
  String get formContent => 'Form content goes here';

  @override
  String get agreeTo => 'By creating your account, you agree to our ';

  @override
  String get termsOfService => 'Terms & Conditions';

  @override
  String get and => ' and ';

  @override
  String get privacyPolicy => 'Privacy Policy';

  @override
  String get exploreApp => 'Explore The App';

  @override
  String get continueAction => 'Continue';

  @override
  String get myExampleTextOne => 'My Example Text One';

  @override
  String get myExampleTextTwo => 'My Example Text Two';

  @override
  String get myExampleTextThree => 'My Example Text Three';

  @override
  String get disposableEmailError => 'Please use a valid email address. Disposable emails are not allowed.';

  @override
  String get orContinueWith => 'Or continue with';

  @override
  String get enterEmailHint => 'Enter email';

  @override
  String get errorEnterEmail => 'Please enter your email';

  @override
  String get errorInvalidEmailAddress => 'Please enter a valid email\naddress.';

  @override
  String get errorEnterPassword => 'Please enter your password';

  @override
  String errorPasswordMinLength(int count) {
    return 'Password should contain minimum $count characters.';
  }

  @override
  String get errorPasswordNumber => 'Password should include at least one number.';

  @override
  String get errorPasswordSpecialCharacter => 'Password should include at least one special character.';

  @override
  String get termsAndPrivacyConfirm => ' and ';

  @override
  String get genericError => 'Something went wrong!';

  @override
  String get firstNameRequired => 'First name is required';

  @override
  String get lastNameRequired => 'Last name is required';

  @override
  String get phoneNumberRequired => 'Phone number is required';

  @override
  String get phoneNumberDigitsOnly => 'Please enter digits only';

  @override
  String get phoneNumberAusLength => 'Phone number must be 9 digits for Australia';

  @override
  String get phoneNumberTooShort => 'Phone number is too short';

  @override
  String get step2Title => 'Almost there!';

  @override
  String get phoneNumberOptional => 'Phone Number (Optional)';

  @override
  String get dateOfBirth => 'Date of Birth';

  @override
  String get completeProfile => 'Complete Profile';

  @override
  String get sessionExpired => 'Session Expired';

  @override
  String get uploadFromDevice => 'Upload from your device';

  @override
  String get uploadFormatSizeLimit => 'JPG, PNG or PDF • maximum 10 MB';

  @override
  String get unableToLoadImage => 'Unable to load image';

  @override
  String get imageUpdatedSuccess => 'Image updated successfully';

  @override
  String get useCamera => 'Use Camera';

  @override
  String get next => 'Next';

  @override
  String get onboardingAllSet => 'You\'re All Set';

  @override
  String get onboardingReadyToRide => 'You’re all set. \nExplore the app now.';

  @override
  String get onboardingStepOneDescription => 'Add a clear profile photo so your driver can easily recognise you at pickup.';

  @override
  String get errorProfilePhotoRequired => 'Please add a profile photo';

  @override
  String get firstNameWithAsterisk => 'First name*';

  @override
  String get lastNameWithAsterisk => 'Last name*';

  @override
  String get phoneNumberWithAsterisk => 'Phone number*';

  @override
  String get firstNameHint => 'Enter your first name here';

  @override
  String get lastNameHint => 'Enter your last name here';

  @override
  String get phoneNumberHint => 'Enter your phone number here';

  @override
  String get onboardingStepThreeDescription => 'Please share your current occupation to finish setting up your profile.';

  @override
  String get onboardingStepTwoDescription => 'Please enter your address details.';

  @override
  String get address => 'Address';

  @override
  String get addressHint => 'Enter your address';

  @override
  String get addressRequired => 'Address is required';

  @override
  String get occupation => 'Occupation';

  @override
  String get occupationHint => 'Enter your occupation';

  @override
  String get occupationRequired => 'Occupation is required';

  @override
  String get uploadDriversLicence => 'Upload Drivers Licence';

  @override
  String get licenceFront => 'Front';

  @override
  String get licenceBack => 'Back';

  @override
  String get uploadFrontDescription => 'Upload the front of your drivers licence.';

  @override
  String get uploadBackDescription => 'Upload the back of your drivers licence.';

  @override
  String get expiryDate => 'Expiry date';

  @override
  String get licenceNumber => 'Licence number';

  @override
  String get cardNumber => 'Card number';

  @override
  String get enterLicenceNumber => 'Enter licence number';

  @override
  String get enterCardNumber => 'Enter card number';

  @override
  String get errorSelectExpiryDate => 'Please select an expiry date';

  @override
  String get errorEnterLicenceNumber => 'Please enter licence number';

  @override
  String get errorEnterCardNumber => 'Please enter card number';

  @override
  String get save => 'Save';

  @override
  String get errorLicenceComplete => 'Please upload front and back licence photos and fill all fields';

  @override
  String get selectExpiryDate => 'Select expiry date';

  @override
  String get driversLicence => 'Drivers Licence';

  @override
  String get aboutUs => 'About Us';

  @override
  String get aboutUsDescription1 =>
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio. Imperdiet sed euismod nisi porta.';

  @override
  String get aboutUsDescription2 =>
      'Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Pellentesque nec nam aliquam sem et tortor. Etiam tempor orci eu lobortis elementum nibh tellus. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Suspendisse in est ante in nibh mauris cursus. Ut etiam sit amet nisl.';

  @override
  String get termsConditions => 'Terms & Conditions';

  @override
  String get contactUs => 'Contact Us';

  @override
  String get notificationsTitle => 'Notifications';

  @override
  String get managePaymentMethods => 'Manage Payment Methods';

  @override
  String get appSettings => 'App Settings';

  @override
  String get logoutConfirmTitle => 'Logout';

  @override
  String get logoutConfirmMessage => 'Are you sure you want to logout?';

  @override
  String get haveQuestion => 'Have a question?';

  @override
  String get getInTouch => 'Get in touch and we’ll get back to you.';

  @override
  String get messageLabel => 'Message';

  @override
  String get typeYourMessage => 'Type your message here';

  @override
  String get sendMessage => 'Send Message';

  @override
  String get loremIpsumShort =>
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio. Imperdiet sed euismod nisi porta.';

  @override
  String get loremIpsumMedium =>
      'Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Pellentesque nec nam aliquam sem et tortor. Etiam tempor orci eu lobortis elementum nibh tellus. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Suspendisse in est ante in nibh mauris cursus. Ut etiam sit amet nisl.';

  @override
  String get loremIpsumLong =>
      'Velit aliquet sagittis id consectetur purus ut faucibus. Lacinia quis vel eros donec ac odio tempor. Quam nulla porttitor massa id neque aliquam vestibulum. Sit amet nisl suscipit adipiscing bibendum est. Pellentesque habitant morbi tristique senectus et netus et. Quis eleifend quam adipiscing vitae. Ridiculus mus mauris vitae ultricies leo integer. Scelerisque felis imperdiet proin fermentum leo.';

  @override
  String get loremIpsumExtended =>
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  @override
  String get deleteAccount => 'Delete Account';

  @override
  String get deleteAccountConfirmMessage =>
      'Are you sure you want to delete your account?\n\nThis will permanently delete your profile and remove your access. This action cannot be undone.';

  @override
  String get deleteAction => 'Delete';

  @override
  String get permissionSettingsTitle => 'Permission Settings';

  @override
  String get saveChanges => 'Save Changes';

  @override
  String get noNotificationsYet => 'No notifications yet';

  @override
  String get notificationDetailsTitle => 'Notification Details';

  @override
  String get deleteNotification => 'Delete Notification';

  @override
  String get deleteNotificationConfirmMessage => 'Are you sure you want to delete this notification?';

  @override
  String get deleteAllNotifications => 'Delete All Notifications';

  @override
  String get deleteAllNotificationsConfirmMessage => 'Are you sure you want to delete all notifications?';

  @override
  String get notificationDeleted => 'Notification deleted successfully';

  @override
  String get allNotificationsDeleted => 'All notifications deleted successfully';

  @override
  String get rideHistory => 'Ride History';

  @override
  String get completed => 'Completed';

  @override
  String get cancelled => 'Cancelled';

  @override
  String get pending => 'Pending';

  @override
  String get ongoing => 'On Going';

  @override
  String get pickup => 'Pickup';

  @override
  String get dropoff => 'Drop-off';

  @override
  String get distance => 'Distance';

  @override
  String get duration => 'Duration';

  @override
  String get rideDetails => 'Ride Details';

  @override
  String get vehicleDriverDetails => 'Vehicle & Driver Details';

  @override
  String get vehicletype => 'Vehicle type';

  @override
  String get registration => 'Registration';

  @override
  String get driver => 'Driver';

  @override
  String get bookingref => 'Booking ref:';

  @override
  String get departed => 'Departed';

  @override
  String get arrived => 'Arrived';

  @override
  String get boarded => 'Boarded';

  @override
  String get pickedUp => 'Picked Up';

  @override
  String get passengers => 'Passengers';

  @override
  String get total => 'Total';

  @override
  String get date => 'Date';

  @override
  String get paymentMethod => 'Payment method';

  @override
  String get downloadpdf => 'Download PDF Receipt';

  @override
  String get bookingRideDetails => 'Ride Details';

  @override
  String get bookingNumberOfPassengers => 'Number of passengers';

  @override
  String get bookingPassengers => 'Passengers';

  @override
  String get bookingBikeRate => '\$5.00 per bike';

  @override
  String get bookingBikes => 'Bikes';

  @override
  String get bookingNumberOfBikes => 'Number of bikes';

  @override
  String get bookingRequestForRide => 'Request for this ride';

  @override
  String get bookingBabySeats => 'Baby Seats';

  @override
  String get bookingNumberOfBabySeats => 'Number of baby seats';

  @override
  String get bookingChooseYourVehicle => 'Choose Your Vehicle';

  @override
  String get bookingRoverX => 'Rover X';

  @override
  String get bookingSharedRide => 'Shared ride';

  @override
  String get bookingRoverRapid => 'Rover Rapid';

  @override
  String get bookingDirectRoute => 'Direct route';

  @override
  String get bookingTotalFare => 'Total Fare';

  @override
  String get bookingPayAndConfirm => 'Pay and Confirm';

  @override
  String get bookingPremium => 'Premium';

  @override
  String get addCardTitle => 'Add a Card';

  @override
  String get saveCardForFuture => 'Save this card for future payments';

  @override
  String get addCardAction => 'Add Card';

  @override
  String get expiryHint => 'MM/YY';

  @override
  String get cvvHint => 'CVV';

  @override
  String get cardNumberPlaceholder => '3454 5837 5725 1234';

  @override
  String get paymentMethodsTitle => 'Payment Methods';

  @override
  String get savedPaymentMethods => 'Saved Payment Methods';

  @override
  String get creditOrDebitCard => 'Credit or Debit Card';

  @override
  String payAmount(String amount) {
    return 'Pay $amount';
  }

  @override
  String get errorTimeout => 'Connection timeout';

  @override
  String get errorNetwork => 'Network error';

  @override
  String get errorServer => 'Server error';

  @override
  String get errorSessionExpired => 'Session expired';

  @override
  String get errorMissingApiKey => 'Missing API key';

  @override
  String get noItemsFound => 'No items found';

  @override
  String get noBookingsFound => 'No bookings history found';

  @override
  String get noInternetConnection => 'No Internet Connection';

  @override
  String get noInternetWhoops => 'Whoops!';

  @override
  String get noInternetConnectionMessage => 'No internet connection was found. Check your connection or try again.';

  @override
  String get noInternetLostConnectionMessage => 'It looks like you’ve lost your internet connection.\nPlease check your connection and try again.';

  @override
  String get tryAgain => 'Try Again';

  @override
  String get checkSettings => 'Check Settings';

  @override
  String get goToSettings => 'Go to Settings';

  @override
  String get removeSavedCards => 'Remove Saved Cards';

  @override
  String get setAsDefault => 'Set as Default';

  @override
  String get defaultCard => 'Default';

  @override
  String get cardDeletedSuccess => 'Payment method removed successfully';

  @override
  String get cardSetDefaultSuccess => 'Default payment method updated';

  @override
  String get cannotDeleteDefaultCard => 'Default card cannot be deleted. Please set another card as default first.';

  @override
  String get cannotDeleteDefaultCardTitle => 'Cannot Delete Default Card';

  @override
  String get confirmDeleteCardTitle => 'Remove Payment Method';

  @override
  String get confirmDeleteCardMessage => 'Are you sure you want to remove this payment method?';

  @override
  String get noSavedCardsFound => 'No saved cards found';

  @override
  String get recentDestinations => 'Recent destinations';

  @override
  String get recentDestinationsEmpty => 'No recent destinations found';

  @override
  String get nearby => 'Nearby';

  @override
  String get dropAPin => 'Drop a Pin';

  @override
  String get useCurrentLocation => 'Use My Current Location';

  @override
  String get findingYourDriver => 'Finding Your Driver';

  @override
  String get findingDriverDescription => 'We\'re assigning the nearest available driver to your request.';

  @override
  String get findingDriverWaitNotice => 'This usually takes less than a minute.\nPlease keep the app open.';

  @override
  String get weCouldntAssignDriver => 'We Couldn\'t Assign a Driver';

  @override
  String get noAvailableDriversNotice => 'Unfortunately, there aren\'t any available drivers at the moment.';

  @override
  String get bookingCancelledAutomatically => 'Your booking has been cancelled automatically.';

  @override
  String get fullRefundInitiatedPrefix => 'A full refund of ';

  @override
  String get fullRefundInitiatedSuffix => ' has been initiated to your original payment method.';

  @override
  String fullRefundInitiated(String amount) {
    return 'A full refund of $amount has been initiated to your original payment method.';
  }

  @override
  String get refundsProcessingTimeNotice => 'Refunds typically appear within 3-5 business days, depending on your bank.';

  @override
  String get trySearchingAvailableDriverAgainNotice => 'You can try searching for an available driver again.';

  @override
  String get cancelSearchRefundNoticePrefix => 'If you cancel the search and return home, your booking will be cancelled and a full refund of ';

  @override
  String get cancelSearchRefundNoticeSuffix =>
      ' will be initiated to your original payment method. Refunds typically appear within 3-5 business days, depending on your bank.';

  @override
  String get searchForAvailableDriverAgain => 'Search for an available driver again.';

  @override
  String get cancelAndGoBackToHome => 'Cancel and Go Back to Home';

  @override
  String get cancelSearchStartRefund => 'Cancel the search and start your refund.';

  @override
  String get backToHome => 'Back to Home';

  @override
  String get vehicleDetails => 'Vehicle details';

  @override
  String get vehicleArrivingIn => 'Vehicle arriving in';

  @override
  String get boardingNotice => 'Please be ready, you will have 2 minutes to board upon arrival.';

  @override
  String get cancelRide => 'Cancel Ride';

  @override
  String get cancelRideConfirmation => 'Are you sure you want to cancel your ride?';

  @override
  String get unableToOpenMessaging => 'Unable to open messaging app';

  @override
  String get driverContactUnavailable => 'Driver contact number is not available';

  @override
  String get timeSinceBooking => 'Time since booking';

  @override
  String get freeCancellationNotice => 'Free cancellation is available within the first two minutes.';

  @override
  String get confirmCancellation => 'Confirm Cancellation';

  @override
  String get keepMyRide => 'Keep My Ride';

  @override
  String get rideCancelled => 'Ride Cancelled';

  @override
  String get rideCancelledSuccessMessage => 'Your ride has been cancelled successfully.';

  @override
  String get cancellationFailed => 'Cancellation Failed';

  @override
  String get cancellationFeeWarning => 'Cancelling after 2 minutes incurs an extra cancellation fee. Are you sure you want to proceed?';

  @override
  String get cancellationFeeNotice => 'The 2-minute free cancellation period has ended. An extra cancellation fee applies.';

  @override
  String get cancellationPolicyReminder => 'Cancellation Policy Reminder';

  @override
  String get cancelWithin2Min => 'Cancel within 2 minutes of booking.';

  @override
  String get cancelAfter2Min => 'Cancel after 2 minutes.';

  @override
  String get vehicleLate15Min => 'Vehicle late over 15 minutes.';

  @override
  String get free => 'FREE';

  @override
  String get rideComplete => 'Ride Complete';

  @override
  String get youHaveArrived => 'You’ve Arrived!';

  @override
  String get dropOff => 'Drop-off';

  @override
  String get totalCharged => 'Total charged';

  @override
  String get rateUs => 'Rate Us';

  @override
  String get comment => 'Comment';

  @override
  String get enterYourCommentHere => 'Enter your comment here.';

  @override
  String get whatCouldWeImprove => 'What could we improve?';

  @override
  String get latePickup => 'Late Pickup';

  @override
  String get driverBehaviour => 'Driver Behaviour';

  @override
  String get cleanliness => 'Cleanliness';

  @override
  String get comfort => 'Comfort';

  @override
  String get routeIssue => 'Route Issue';

  @override
  String get addATip => 'Add a Tip';

  @override
  String get tipGoesToDriver => '100% of the tip goes to your driver';

  @override
  String get oneDollar => '\$1.00';

  @override
  String get twoDollars => '\$2.00';

  @override
  String get noTip => 'No Tip';

  @override
  String get customAmount => 'Custom amount (\$)';

  @override
  String get enterOtherAmount => 'Enter other amount';

  @override
  String get payTip => 'Pay Tip';

  @override
  String get continueWithoutTip => 'Continue without tip';

  @override
  String get thankYouForFeedback => 'Thank you for your feedback!';

  @override
  String get ratingSubmitted => 'Rating Submitted';

  @override
  String get checkAvailability => 'Check Availability';

  @override
  String get serviceabilityRetry => 'We couldn\'t check availability. Please try again.';

  @override
  String get locationOutsideServiceArea => 'Location outside service area. Please choose another location.';

  @override
  String get tipSentSuccessTitle => 'Thank You!';

  @override
  String get tipSentSuccessMessage => 'Your tip has been sent to your driver.';

  @override
  String get continueWithoutTipTitle => 'Thank You!';

  @override
  String get continueWithoutTipMessage => 'Thank you. We hope to see you again soon.';

  @override
  String get thanksForYourFeedbackTitle => 'Thanks for Your Feedback';

  @override
  String get thanksForYourFeedbackMessage => 'Thanks for rating your ride. We look forward to seeing you again.';

  @override
  String get locationServiceDisabledTitle => 'Location Services Disabled';

  @override
  String get locationServiceDisabledMessage =>
      'Location services are turned off on your device. Please enable location services in your device settings to use this feature.';

  @override
  String get locationPermissionDeniedTitle => 'Location Permission Required';

  @override
  String get locationPermissionDeniedMessage =>
      'Location access is disabled. Please allow location permissions in your device settings to enable this feature.';

  @override
  String get disableLocationPermissionTitle => 'Disable Location Permission';

  @override
  String get disableLocationPermissionMessage => 'To disable location permissions, please turn off Location in your device settings.';
}
