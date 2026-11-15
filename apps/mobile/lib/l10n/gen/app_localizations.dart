import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_en.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'gen/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale) : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate = _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates = <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[Locale('en')];

  /// The name of the application
  ///
  /// In en, this message translates to:
  /// **'Starter'**
  String get appName;

  /// Label for sign in button or title
  ///
  /// In en, this message translates to:
  /// **'Sign In'**
  String get signIn;

  /// Label for sign up button or title
  ///
  /// In en, this message translates to:
  /// **'Create Account'**
  String get signUp;

  /// Title for the sign up form
  ///
  /// In en, this message translates to:
  /// **'Sign Up'**
  String get signUpTitle;

  /// Label for email input
  ///
  /// In en, this message translates to:
  /// **'Email address'**
  String get email;

  /// Label for password input
  ///
  /// In en, this message translates to:
  /// **'Password'**
  String get password;

  /// Text for forgot password link
  ///
  /// In en, this message translates to:
  /// **'Reset Your Password'**
  String get forgotPassword;

  /// Text for forgot password button on sign in screen
  ///
  /// In en, this message translates to:
  /// **'Forgot Password?'**
  String get forgotPasswordQuestion;

  /// Prompt for users who already have an account
  ///
  /// In en, this message translates to:
  /// **'Already have an account?'**
  String get alreadyHaveAccount;

  /// Prompt for users who don't have an account
  ///
  /// In en, this message translates to:
  /// **'Don\'t have an account?'**
  String get dontHaveAccount;

  /// Label for first name input
  ///
  /// In en, this message translates to:
  /// **'First Name'**
  String get firstName;

  /// Label for last name input
  ///
  /// In en, this message translates to:
  /// **'Last Name'**
  String get lastName;

  /// Title for home page
  ///
  /// In en, this message translates to:
  /// **'Home'**
  String get home;

  /// Title for explore page
  ///
  /// In en, this message translates to:
  /// **'Explore'**
  String get explore;

  /// Title for settings page
  ///
  /// In en, this message translates to:
  /// **'Settings'**
  String get settings;

  /// Title for profile page
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get profile;

  /// Title for more page
  ///
  /// In en, this message translates to:
  /// **'More'**
  String get more;

  /// Label for logout action
  ///
  /// In en, this message translates to:
  /// **'Logout'**
  String get logout;

  /// Label for cancel action
  ///
  /// In en, this message translates to:
  /// **'Cancel'**
  String get cancel;

  /// Label for OK action
  ///
  /// In en, this message translates to:
  /// **'OK'**
  String get ok;

  /// Generic error title
  ///
  /// In en, this message translates to:
  /// **'Error'**
  String get error;

  /// Generic success title
  ///
  /// In en, this message translates to:
  /// **'Success'**
  String get success;

  /// Error message when sign in fails
  ///
  /// In en, this message translates to:
  /// **'Sign In Failed'**
  String get signInFailed;

  /// Error message when sign up fails
  ///
  /// In en, this message translates to:
  /// **'Sign Up Failed'**
  String get signUpFailed;

  /// Title for email already registered dialog
  ///
  /// In en, this message translates to:
  /// **'Email Already Registered'**
  String get emailAlreadyRegisteredTitle;

  /// Message for email already registered dialog
  ///
  /// In en, this message translates to:
  /// **'An account already exists with this email address. Sign in to continue. If you\'ve forgotten your password, you can reset it from the Sign In screen.'**
  String get emailAlreadyRegisteredMessage;

  /// Error message for invalid email format
  ///
  /// In en, this message translates to:
  /// **'Invalid Email'**
  String get invalidEmail;

  /// Popup title for invalid email address validation
  ///
  /// In en, this message translates to:
  /// **'Valid Email Address Required'**
  String get validEmailAddressRequired;

  /// Popup title for invalid password validation
  ///
  /// In en, this message translates to:
  /// **'Valid Password Required'**
  String get validPasswordRequired;

  /// Title for design system page
  ///
  /// In en, this message translates to:
  /// **'Design System'**
  String get designSystem;

  /// Title for help and support page
  ///
  /// In en, this message translates to:
  /// **'Help & Support'**
  String get helpSupport;

  /// Title for about page
  ///
  /// In en, this message translates to:
  /// **'About'**
  String get about;

  /// Title for account page
  ///
  /// In en, this message translates to:
  /// **'Account'**
  String get account;

  /// Label for edit profile button
  ///
  /// In en, this message translates to:
  /// **'Edit Profile'**
  String get editProfile;

  /// Label for change password button
  ///
  /// In en, this message translates to:
  /// **'Change Password'**
  String get changePassword;

  /// Label for current password field
  ///
  /// In en, this message translates to:
  /// **'Current password'**
  String get currentPassword;

  /// Label for new password field
  ///
  /// In en, this message translates to:
  /// **'New password'**
  String get newPassword;

  /// Label for confirm new password field
  ///
  /// In en, this message translates to:
  /// **'Re-type new password'**
  String get retypeNewPassword;

  /// Title when password is changed successfully
  ///
  /// In en, this message translates to:
  /// **'Password Changed'**
  String get passwordChangedTitle;

  /// Message when password is changed successfully
  ///
  /// In en, this message translates to:
  /// **'Your password has been changed.'**
  String get passwordChangedMessage;

  /// Description text for change password page
  ///
  /// In en, this message translates to:
  /// **'Stay secure and change your password.'**
  String get changePasswordDescription;

  /// Label for yes action
  ///
  /// In en, this message translates to:
  /// **'Yes'**
  String get yes;

  /// Label for no action
  ///
  /// In en, this message translates to:
  /// **'No'**
  String get no;

  /// Content placeholder for home page
  ///
  /// In en, this message translates to:
  /// **'Home Content'**
  String get homeContent;

  /// Sign In button on intro page
  ///
  /// In en, this message translates to:
  /// **'Sign In'**
  String get introSignIn;

  /// Sign Up button on intro page
  ///
  /// In en, this message translates to:
  /// **'Sign Up'**
  String get introSignUp;

  /// Tagline displayed on the intro page
  ///
  /// In en, this message translates to:
  /// **'Clean Architecture & BLoC Starter'**
  String get introTagline;

  /// Intro page tagline prefix before emphasized word
  ///
  /// In en, this message translates to:
  /// **'Clean Architecture & '**
  String get introTaglinePrefix;

  /// Intro page tagline suffix shown in italic
  ///
  /// In en, this message translates to:
  /// **'BLoC Starter'**
  String get introTaglineSuffix;

  /// Error title when request fails
  ///
  /// In en, this message translates to:
  /// **'Request Failed'**
  String get requestFailed;

  /// Title for email check instruction
  ///
  /// In en, this message translates to:
  /// **'Please Check Your Email'**
  String get checkEmail;

  /// Message confirming password reset link sent
  ///
  /// In en, this message translates to:
  /// **'A password reset link has been sent to your dedicated email'**
  String get passwordResetSent;

  /// Question for missing email
  ///
  /// In en, this message translates to:
  /// **'Didn\'t receive the email?'**
  String get didntReceiveEmail;

  /// Label for resend action
  ///
  /// In en, this message translates to:
  /// **'Resend'**
  String get resend;

  /// Instruction for password reset
  ///
  /// In en, this message translates to:
  /// **'Enter the email address linked to your account. We’ll email you a link to reset your password.'**
  String get enterEmailReset;

  /// Label for forgot password submit button
  ///
  /// In en, this message translates to:
  /// **'Send Verification Link'**
  String get sendVerificationLink;

  /// Label for submit action
  ///
  /// In en, this message translates to:
  /// **'Submit'**
  String get submit;

  /// Title for verification page
  ///
  /// In en, this message translates to:
  /// **'Verify'**
  String get verification;

  /// Label for logout action
  ///
  /// In en, this message translates to:
  /// **'Log Out'**
  String get logOut;

  /// Instruction to enter code
  ///
  /// In en, this message translates to:
  /// **'Enter Verification Code'**
  String get enterVerificationCode;

  /// Message confirming code sent
  ///
  /// In en, this message translates to:
  /// **'Enter the verification code sent to'**
  String get verificationCodeSent;

  /// Label for resend code action
  ///
  /// In en, this message translates to:
  /// **'Resend Code'**
  String get resendCode;

  /// Notification when verification code is resent
  ///
  /// In en, this message translates to:
  /// **'Verification code resent'**
  String get verificationCodeResent;

  /// Divider text
  ///
  /// In en, this message translates to:
  /// **'Or'**
  String get or;

  /// Question to send code to mobile
  ///
  /// In en, this message translates to:
  /// **'Send the verification code to your mobile number?'**
  String get sendCodeMobile;

  /// Label for send code action
  ///
  /// In en, this message translates to:
  /// **'Send the code'**
  String get sendCode;

  /// Question for missing code
  ///
  /// In en, this message translates to:
  /// **'Didn\'t receive the code?'**
  String get didntReceiveCode;

  /// Title for step 1 of profile completion
  ///
  /// In en, this message translates to:
  /// **'Step 1: Personal Details'**
  String get step1Title;

  /// Placeholder for form content
  ///
  /// In en, this message translates to:
  /// **'Form content goes here'**
  String get formContent;

  /// Terms agreement prefix
  ///
  /// In en, this message translates to:
  /// **'By creating your account, you agree to our '**
  String get agreeTo;

  /// Link text for terms
  ///
  /// In en, this message translates to:
  /// **'Terms & Conditions'**
  String get termsOfService;

  /// Conjunction text
  ///
  /// In en, this message translates to:
  /// **' and '**
  String get and;

  /// Title for privacy policy
  ///
  /// In en, this message translates to:
  /// **'Privacy Policy'**
  String get privacyPolicy;

  /// Label for explore app action
  ///
  /// In en, this message translates to:
  /// **'Explore The App'**
  String get exploreApp;

  /// Label for continue action
  ///
  /// In en, this message translates to:
  /// **'Continue'**
  String get continueAction;

  /// Label for the example text one
  ///
  /// In en, this message translates to:
  /// **'My Example Text One'**
  String get myExampleTextOne;

  /// Label for the example text two
  ///
  /// In en, this message translates to:
  /// **'My Example Text Two'**
  String get myExampleTextTwo;

  /// Label for the example text three
  ///
  /// In en, this message translates to:
  /// **'My Example Text Three'**
  String get myExampleTextThree;

  /// Error message for disposable email
  ///
  /// In en, this message translates to:
  /// **'Please use a valid email address. Disposable emails are not allowed.'**
  String get disposableEmailError;

  /// Text between auth separators
  ///
  /// In en, this message translates to:
  /// **'Or continue with'**
  String get orContinueWith;

  /// Hint text for email input
  ///
  /// In en, this message translates to:
  /// **'Enter email'**
  String get enterEmailHint;

  /// Error when email is empty
  ///
  /// In en, this message translates to:
  /// **'Please enter your email'**
  String get errorEnterEmail;

  /// Error when email format is invalid
  ///
  /// In en, this message translates to:
  /// **'Please enter a valid email\naddress.'**
  String get errorInvalidEmailAddress;

  /// Error when password is empty
  ///
  /// In en, this message translates to:
  /// **'Please enter your password'**
  String get errorEnterPassword;

  /// Error when password is shorter than minimum length
  ///
  /// In en, this message translates to:
  /// **'Password should contain minimum {count} characters.'**
  String errorPasswordMinLength(int count);

  /// Error when password does not contain a number
  ///
  /// In en, this message translates to:
  /// **'Password should include at least one number.'**
  String get errorPasswordNumber;

  /// Error when password does not contain a special character
  ///
  /// In en, this message translates to:
  /// **'Password should include at least one special character.'**
  String get errorPasswordSpecialCharacter;

  /// Text connecting terms and privacy policy
  ///
  /// In en, this message translates to:
  /// **' and '**
  String get termsAndPrivacyConfirm;

  /// Generic error message
  ///
  /// In en, this message translates to:
  /// **'Something went wrong!'**
  String get genericError;

  /// Error message when first name is missing
  ///
  /// In en, this message translates to:
  /// **'First name is required'**
  String get firstNameRequired;

  /// Error message when last name is missing
  ///
  /// In en, this message translates to:
  /// **'Last name is required'**
  String get lastNameRequired;

  /// Error message when phone number is missing
  ///
  /// In en, this message translates to:
  /// **'Phone number is required'**
  String get phoneNumberRequired;

  /// Error message when phone number contains non-digits
  ///
  /// In en, this message translates to:
  /// **'Please enter digits only'**
  String get phoneNumberDigitsOnly;

  /// Error message when Australian phone number is not 9 digits
  ///
  /// In en, this message translates to:
  /// **'Phone number must be 9 digits for Australia'**
  String get phoneNumberAusLength;

  /// Error message when phone number is too short
  ///
  /// In en, this message translates to:
  /// **'Phone number is too short'**
  String get phoneNumberTooShort;

  /// Title for step 2 of profile completion
  ///
  /// In en, this message translates to:
  /// **'Almost there!'**
  String get step2Title;

  /// Hint text for optional phone number input
  ///
  /// In en, this message translates to:
  /// **'Phone Number (Optional)'**
  String get phoneNumberOptional;

  /// Label for date of birth input
  ///
  /// In en, this message translates to:
  /// **'Date of Birth'**
  String get dateOfBirth;

  /// Label for complete profile button
  ///
  /// In en, this message translates to:
  /// **'Complete Profile'**
  String get completeProfile;

  /// Error title when session expires
  ///
  /// In en, this message translates to:
  /// **'Session Expired'**
  String get sessionExpired;

  /// Text for uploading from device
  ///
  /// In en, this message translates to:
  /// **'Upload from your device'**
  String get uploadFromDevice;

  /// Format and size limit text for uploads
  ///
  /// In en, this message translates to:
  /// **'JPG, PNG or PDF • maximum 10 MB'**
  String get uploadFormatSizeLimit;

  /// Error message when image fails to load
  ///
  /// In en, this message translates to:
  /// **'Unable to load image'**
  String get unableToLoadImage;

  /// Success message when image is updated
  ///
  /// In en, this message translates to:
  /// **'Image updated successfully'**
  String get imageUpdatedSuccess;

  /// Label for use camera button
  ///
  /// In en, this message translates to:
  /// **'Use Camera'**
  String get useCamera;

  /// Label for next button
  ///
  /// In en, this message translates to:
  /// **'Next'**
  String get next;

  /// Title for the final onboarding step
  ///
  /// In en, this message translates to:
  /// **'You\'re All Set'**
  String get onboardingAllSet;

  /// Description for the final onboarding step
  ///
  /// In en, this message translates to:
  /// **'You’re all set. \nExplore the app now.'**
  String get onboardingReadyToRide;

  /// Description for step one of onboarding
  ///
  /// In en, this message translates to:
  /// **'Add a clear profile photo so your driver can easily recognise you at pickup.'**
  String get onboardingStepOneDescription;

  /// Error message when profile photo is missing
  ///
  /// In en, this message translates to:
  /// **'Please add a profile photo'**
  String get errorProfilePhotoRequired;

  /// Label for first name with asterisk
  ///
  /// In en, this message translates to:
  /// **'First name*'**
  String get firstNameWithAsterisk;

  /// Label for last name with asterisk
  ///
  /// In en, this message translates to:
  /// **'Last name*'**
  String get lastNameWithAsterisk;

  /// Label for phone number with asterisk
  ///
  /// In en, this message translates to:
  /// **'Phone number*'**
  String get phoneNumberWithAsterisk;

  /// Hint for first name field
  ///
  /// In en, this message translates to:
  /// **'Enter your first name here'**
  String get firstNameHint;

  /// Hint for last name field
  ///
  /// In en, this message translates to:
  /// **'Enter your last name here'**
  String get lastNameHint;

  /// Hint for phone number field
  ///
  /// In en, this message translates to:
  /// **'Enter your phone number here'**
  String get phoneNumberHint;

  /// Description for step three of onboarding
  ///
  /// In en, this message translates to:
  /// **'Please share your current occupation to finish setting up your profile.'**
  String get onboardingStepThreeDescription;

  /// Description for step two of onboarding
  ///
  /// In en, this message translates to:
  /// **'Please enter your address details.'**
  String get onboardingStepTwoDescription;

  /// Label for address field
  ///
  /// In en, this message translates to:
  /// **'Address'**
  String get address;

  /// Hint for address field
  ///
  /// In en, this message translates to:
  /// **'Enter your address'**
  String get addressHint;

  /// Validation message when address is empty
  ///
  /// In en, this message translates to:
  /// **'Address is required'**
  String get addressRequired;

  /// Label for occupation field
  ///
  /// In en, this message translates to:
  /// **'Occupation'**
  String get occupation;

  /// Hint for occupation field
  ///
  /// In en, this message translates to:
  /// **'Enter your occupation'**
  String get occupationHint;

  /// Validation message when occupation is empty
  ///
  /// In en, this message translates to:
  /// **'Occupation is required'**
  String get occupationRequired;

  /// Title for upload drivers licence page
  ///
  /// In en, this message translates to:
  /// **'Upload Drivers Licence'**
  String get uploadDriversLicence;

  /// Label for front of licence
  ///
  /// In en, this message translates to:
  /// **'Front'**
  String get licenceFront;

  /// Label for back of licence
  ///
  /// In en, this message translates to:
  /// **'Back'**
  String get licenceBack;

  /// Description for uploading front of licence
  ///
  /// In en, this message translates to:
  /// **'Upload the front of your drivers licence.'**
  String get uploadFrontDescription;

  /// Description for uploading back of licence
  ///
  /// In en, this message translates to:
  /// **'Upload the back of your drivers licence.'**
  String get uploadBackDescription;

  /// Label for expiry date
  ///
  /// In en, this message translates to:
  /// **'Expiry date'**
  String get expiryDate;

  /// Label for licence number
  ///
  /// In en, this message translates to:
  /// **'Licence number'**
  String get licenceNumber;

  /// Label for card number
  ///
  /// In en, this message translates to:
  /// **'Card number'**
  String get cardNumber;

  /// Hint for licence number
  ///
  /// In en, this message translates to:
  /// **'Enter licence number'**
  String get enterLicenceNumber;

  /// Hint for card number
  ///
  /// In en, this message translates to:
  /// **'Enter card number'**
  String get enterCardNumber;

  /// Error message for empty expiry date
  ///
  /// In en, this message translates to:
  /// **'Please select an expiry date'**
  String get errorSelectExpiryDate;

  /// Error message for empty licence number
  ///
  /// In en, this message translates to:
  /// **'Please enter licence number'**
  String get errorEnterLicenceNumber;

  /// Error message for empty card number
  ///
  /// In en, this message translates to:
  /// **'Please enter card number'**
  String get errorEnterCardNumber;

  /// Label for save button
  ///
  /// In en, this message translates to:
  /// **'Save'**
  String get save;

  /// Error message when licence details are incomplete
  ///
  /// In en, this message translates to:
  /// **'Please upload front and back licence photos and fill all fields'**
  String get errorLicenceComplete;

  /// Help text for date picker
  ///
  /// In en, this message translates to:
  /// **'Select expiry date'**
  String get selectExpiryDate;

  /// Text for drivers licence
  ///
  /// In en, this message translates to:
  /// **'Drivers Licence'**
  String get driversLicence;

  /// Title for about us page
  ///
  /// In en, this message translates to:
  /// **'About Us'**
  String get aboutUs;

  /// First paragraph of about us description
  ///
  /// In en, this message translates to:
  /// **'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio. Imperdiet sed euismod nisi porta.'**
  String get aboutUsDescription1;

  /// Second paragraph of about us description
  ///
  /// In en, this message translates to:
  /// **'Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Pellentesque nec nam aliquam sem et tortor. Etiam tempor orci eu lobortis elementum nibh tellus. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Suspendisse in est ante in nibh mauris cursus. Ut etiam sit amet nisl.'**
  String get aboutUsDescription2;

  /// Title for terms and conditions
  ///
  /// In en, this message translates to:
  /// **'Terms & Conditions'**
  String get termsConditions;

  /// Title for contact us
  ///
  /// In en, this message translates to:
  /// **'Contact Us'**
  String get contactUs;

  /// Title for notifications
  ///
  /// In en, this message translates to:
  /// **'Notifications'**
  String get notificationsTitle;

  /// Title for payment methods
  ///
  /// In en, this message translates to:
  /// **'Manage Payment Methods'**
  String get managePaymentMethods;

  /// Title for app settings
  ///
  /// In en, this message translates to:
  /// **'App Settings'**
  String get appSettings;

  /// Title for logout confirmation dialog
  ///
  /// In en, this message translates to:
  /// **'Logout'**
  String get logoutConfirmTitle;

  /// Message for logout confirmation dialog
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to logout?'**
  String get logoutConfirmMessage;

  /// Text for 'Have a question?'
  ///
  /// In en, this message translates to:
  /// **'Have a question?'**
  String get haveQuestion;

  /// Description for contact us
  ///
  /// In en, this message translates to:
  /// **'Get in touch and we’ll get back to you.'**
  String get getInTouch;

  /// Label for message field
  ///
  /// In en, this message translates to:
  /// **'Message'**
  String get messageLabel;

  /// Hint for message field
  ///
  /// In en, this message translates to:
  /// **'Type your message here'**
  String get typeYourMessage;

  /// Button label to send message to driver
  ///
  /// In en, this message translates to:
  /// **'Send Message'**
  String get sendMessage;

  /// Short lorem ipsum text
  ///
  /// In en, this message translates to:
  /// **'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio. Imperdiet sed euismod nisi porta.'**
  String get loremIpsumShort;

  /// Medium lorem ipsum text
  ///
  /// In en, this message translates to:
  /// **'Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Pellentesque nec nam aliquam sem et tortor. Etiam tempor orci eu lobortis elementum nibh tellus. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Suspendisse in est ante in nibh mauris cursus. Ut etiam sit amet nisl.'**
  String get loremIpsumMedium;

  /// Long lorem ipsum text
  ///
  /// In en, this message translates to:
  /// **'Velit aliquet sagittis id consectetur purus ut faucibus. Lacinia quis vel eros donec ac odio tempor. Quam nulla porttitor massa id neque aliquam vestibulum. Sit amet nisl suscipit adipiscing bibendum est. Pellentesque habitant morbi tristique senectus et netus et. Quis eleifend quam adipiscing vitae. Ridiculus mus mauris vitae ultricies leo integer. Scelerisque felis imperdiet proin fermentum leo.'**
  String get loremIpsumLong;

  /// Extended lorem ipsum text
  ///
  /// In en, this message translates to:
  /// **'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'**
  String get loremIpsumExtended;

  /// Title for delete account
  ///
  /// In en, this message translates to:
  /// **'Delete Account'**
  String get deleteAccount;

  /// Message for delete account confirmation
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to delete your account?\n\nThis will permanently delete your profile and remove your access. This action cannot be undone.'**
  String get deleteAccountConfirmMessage;

  /// Label for delete action
  ///
  /// In en, this message translates to:
  /// **'Delete'**
  String get deleteAction;

  /// Title for permission settings
  ///
  /// In en, this message translates to:
  /// **'Permission Settings'**
  String get permissionSettingsTitle;

  /// Label for save changes button
  ///
  /// In en, this message translates to:
  /// **'Save Changes'**
  String get saveChanges;

  /// Text when there are no notifications
  ///
  /// In en, this message translates to:
  /// **'No notifications yet'**
  String get noNotificationsYet;

  /// Title for notification details page
  ///
  /// In en, this message translates to:
  /// **'Notification Details'**
  String get notificationDetailsTitle;

  /// Title for delete notification dialog
  ///
  /// In en, this message translates to:
  /// **'Delete Notification'**
  String get deleteNotification;

  /// Message for delete notification confirmation
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to delete this notification?'**
  String get deleteNotificationConfirmMessage;

  /// Title for delete all notifications dialog
  ///
  /// In en, this message translates to:
  /// **'Delete All Notifications'**
  String get deleteAllNotifications;

  /// Message for delete all notifications confirmation
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to delete all notifications?'**
  String get deleteAllNotificationsConfirmMessage;

  /// Success message when a notification is deleted
  ///
  /// In en, this message translates to:
  /// **'Notification deleted successfully'**
  String get notificationDeleted;

  /// Success message when all notifications are deleted
  ///
  /// In en, this message translates to:
  /// **'All notifications deleted successfully'**
  String get allNotificationsDeleted;

  /// Title for ride history page
  ///
  /// In en, this message translates to:
  /// **'Ride History'**
  String get rideHistory;

  /// Complete Text
  ///
  /// In en, this message translates to:
  /// **'Completed'**
  String get completed;

  /// Cancelled Text
  ///
  /// In en, this message translates to:
  /// **'Cancelled'**
  String get cancelled;

  /// Pending Text
  ///
  /// In en, this message translates to:
  /// **'Pending'**
  String get pending;

  /// On Going Text
  ///
  /// In en, this message translates to:
  /// **'On Going'**
  String get ongoing;

  /// Pickup location label
  ///
  /// In en, this message translates to:
  /// **'Pickup'**
  String get pickup;

  /// Drop-off Text
  ///
  /// In en, this message translates to:
  /// **'Drop-off'**
  String get dropoff;

  /// Distance Text
  ///
  /// In en, this message translates to:
  /// **'Distance'**
  String get distance;

  /// Duration Text
  ///
  /// In en, this message translates to:
  /// **'Duration'**
  String get duration;

  /// Ride Details Text
  ///
  /// In en, this message translates to:
  /// **'Ride Details'**
  String get rideDetails;

  /// Vehicle & Driver Details Text
  ///
  /// In en, this message translates to:
  /// **'Vehicle & Driver Details'**
  String get vehicleDriverDetails;

  /// Vehicle type Text
  ///
  /// In en, this message translates to:
  /// **'Vehicle type'**
  String get vehicletype;

  /// Registration Text
  ///
  /// In en, this message translates to:
  /// **'Registration'**
  String get registration;

  /// Driver Text
  ///
  /// In en, this message translates to:
  /// **'Driver'**
  String get driver;

  /// Booking ref Text
  ///
  /// In en, this message translates to:
  /// **'Booking ref:'**
  String get bookingref;

  /// Departed Text
  ///
  /// In en, this message translates to:
  /// **'Departed'**
  String get departed;

  /// Arrived Text
  ///
  /// In en, this message translates to:
  /// **'Arrived'**
  String get arrived;

  /// Boarded Text
  ///
  /// In en, this message translates to:
  /// **'Boarded'**
  String get boarded;

  /// Picked Up Text
  ///
  /// In en, this message translates to:
  /// **'Picked Up'**
  String get pickedUp;

  /// Passengers Text
  ///
  /// In en, this message translates to:
  /// **'Passengers'**
  String get passengers;

  /// Total Text
  ///
  /// In en, this message translates to:
  /// **'Total'**
  String get total;

  /// Date Text
  ///
  /// In en, this message translates to:
  /// **'Date'**
  String get date;

  /// Payment method Text
  ///
  /// In en, this message translates to:
  /// **'Payment method'**
  String get paymentMethod;

  /// Download PDF Receipt Text
  ///
  /// In en, this message translates to:
  /// **'Download PDF Receipt'**
  String get downloadpdf;

  /// Title for the booking details sheet
  ///
  /// In en, this message translates to:
  /// **'Ride Details'**
  String get bookingRideDetails;

  /// Passenger quantity helper label
  ///
  /// In en, this message translates to:
  /// **'Number of passengers'**
  String get bookingNumberOfPassengers;

  /// Passenger booking option label
  ///
  /// In en, this message translates to:
  /// **'Passengers'**
  String get bookingPassengers;

  /// Bike price helper label
  ///
  /// In en, this message translates to:
  /// **'\$5.00 per bike'**
  String get bookingBikeRate;

  /// Bike booking option label
  ///
  /// In en, this message translates to:
  /// **'Bikes'**
  String get bookingBikes;

  /// Bike quantity label
  ///
  /// In en, this message translates to:
  /// **'Number of bikes'**
  String get bookingNumberOfBikes;

  /// Baby seat helper label
  ///
  /// In en, this message translates to:
  /// **'Request for this ride'**
  String get bookingRequestForRide;

  /// Baby seat booking option label
  ///
  /// In en, this message translates to:
  /// **'Baby Seats'**
  String get bookingBabySeats;

  /// Baby seat quantity label
  ///
  /// In en, this message translates to:
  /// **'Number of baby seats'**
  String get bookingNumberOfBabySeats;

  /// Choose vehicle title label
  ///
  /// In en, this message translates to:
  /// **'Choose Your Vehicle'**
  String get bookingChooseYourVehicle;

  /// Rover X car label
  ///
  /// In en, this message translates to:
  /// **'Rover X'**
  String get bookingRoverX;

  /// Shared ride helper label
  ///
  /// In en, this message translates to:
  /// **'Shared ride'**
  String get bookingSharedRide;

  /// Rover Rapid car label
  ///
  /// In en, this message translates to:
  /// **'Rover Rapid'**
  String get bookingRoverRapid;

  /// Direct route helper label
  ///
  /// In en, this message translates to:
  /// **'Direct route'**
  String get bookingDirectRoute;

  /// Total fare label
  ///
  /// In en, this message translates to:
  /// **'Total Fare'**
  String get bookingTotalFare;

  /// Pay and confirm action button
  ///
  /// In en, this message translates to:
  /// **'Pay and Confirm'**
  String get bookingPayAndConfirm;

  /// Premium badge text
  ///
  /// In en, this message translates to:
  /// **'Premium'**
  String get bookingPremium;

  /// Title for add card bottom sheet
  ///
  /// In en, this message translates to:
  /// **'Add a Card'**
  String get addCardTitle;

  /// Checkbox label for saving card for future payments
  ///
  /// In en, this message translates to:
  /// **'Save this card for future payments'**
  String get saveCardForFuture;

  /// Button label for adding card
  ///
  /// In en, this message translates to:
  /// **'Add Card'**
  String get addCardAction;

  /// Hint text for card expiry date
  ///
  /// In en, this message translates to:
  /// **'MM/YY'**
  String get expiryHint;

  /// Hint text for card security code CVV
  ///
  /// In en, this message translates to:
  /// **'CVV'**
  String get cvvHint;

  /// Placeholder for credit card number input
  ///
  /// In en, this message translates to:
  /// **'3454 5837 5725 1234'**
  String get cardNumberPlaceholder;

  /// Title for payment methods page
  ///
  /// In en, this message translates to:
  /// **'Payment Methods'**
  String get paymentMethodsTitle;

  /// Header for saved payment methods section
  ///
  /// In en, this message translates to:
  /// **'Saved Payment Methods'**
  String get savedPaymentMethods;

  /// Label for credit or debit card option
  ///
  /// In en, this message translates to:
  /// **'Credit or Debit Card'**
  String get creditOrDebitCard;

  /// Label for pay button with amount
  ///
  /// In en, this message translates to:
  /// **'Pay {amount}'**
  String payAmount(String amount);

  /// Error message when connection times out
  ///
  /// In en, this message translates to:
  /// **'Connection timeout'**
  String get errorTimeout;

  /// Error message for network failure
  ///
  /// In en, this message translates to:
  /// **'Network error'**
  String get errorNetwork;

  /// Error message for server failure
  ///
  /// In en, this message translates to:
  /// **'Server error'**
  String get errorServer;

  /// Error message for session expiration
  ///
  /// In en, this message translates to:
  /// **'Session expired'**
  String get errorSessionExpired;

  /// Error message for missing API key
  ///
  /// In en, this message translates to:
  /// **'Missing API key'**
  String get errorMissingApiKey;

  /// Default text shown when a list or search result has no items
  ///
  /// In en, this message translates to:
  /// **'No items found'**
  String get noItemsFound;

  /// Text shown when the booking history is empty
  ///
  /// In en, this message translates to:
  /// **'No bookings history found'**
  String get noBookingsFound;

  /// Error message when device has no internet connection
  ///
  /// In en, this message translates to:
  /// **'No Internet Connection'**
  String get noInternetConnection;

  /// Title shown in the no internet connection dialog
  ///
  /// In en, this message translates to:
  /// **'Whoops!'**
  String get noInternetWhoops;

  /// Message shown in the no internet connection dialog
  ///
  /// In en, this message translates to:
  /// **'No internet connection was found. Check your connection or try again.'**
  String get noInternetConnectionMessage;

  /// Message explaining loss of internet connection on full-screen offline overlay
  ///
  /// In en, this message translates to:
  /// **'It looks like you’ve lost your internet connection.\nPlease check your connection and try again.'**
  String get noInternetLostConnectionMessage;

  /// Label for retrying an action
  ///
  /// In en, this message translates to:
  /// **'Try Again'**
  String get tryAgain;

  /// Label for opening device settings
  ///
  /// In en, this message translates to:
  /// **'Check Settings'**
  String get checkSettings;

  /// Label for go to settings button
  ///
  /// In en, this message translates to:
  /// **'Go to Settings'**
  String get goToSettings;

  /// Title for remove saved cards screen
  ///
  /// In en, this message translates to:
  /// **'Remove Saved Cards'**
  String get removeSavedCards;

  /// Label for set as default button
  ///
  /// In en, this message translates to:
  /// **'Set as Default'**
  String get setAsDefault;

  /// Label for default card badge
  ///
  /// In en, this message translates to:
  /// **'Default'**
  String get defaultCard;

  /// Snackbar message when a card is deleted successfully
  ///
  /// In en, this message translates to:
  /// **'Payment method removed successfully'**
  String get cardDeletedSuccess;

  /// Snackbar message when default card is updated successfully
  ///
  /// In en, this message translates to:
  /// **'Default payment method updated'**
  String get cardSetDefaultSuccess;

  /// Alert dialog message when user attempts to delete default card
  ///
  /// In en, this message translates to:
  /// **'Default card cannot be deleted. Please set another card as default first.'**
  String get cannotDeleteDefaultCard;

  /// Alert dialog title when user attempts to delete default card
  ///
  /// In en, this message translates to:
  /// **'Cannot Delete Default Card'**
  String get cannotDeleteDefaultCardTitle;

  /// Confirmation dialog title when user attempts to delete a non-default card
  ///
  /// In en, this message translates to:
  /// **'Remove Payment Method'**
  String get confirmDeleteCardTitle;

  /// Confirmation dialog message when user attempts to delete a non-default card
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to remove this payment method?'**
  String get confirmDeleteCardMessage;

  /// Empty state title when there are no saved payment cards
  ///
  /// In en, this message translates to:
  /// **'No saved cards found'**
  String get noSavedCardsFound;

  /// Section header for recent destinations in location search
  ///
  /// In en, this message translates to:
  /// **'Recent destinations'**
  String get recentDestinations;

  /// Empty state text for recent destinations
  ///
  /// In en, this message translates to:
  /// **'No recent destinations found'**
  String get recentDestinationsEmpty;

  /// Section header for nearby locations in location search
  ///
  /// In en, this message translates to:
  /// **'Nearby'**
  String get nearby;

  /// Button label for drop a pin on map action
  ///
  /// In en, this message translates to:
  /// **'Drop a Pin'**
  String get dropAPin;

  /// Button label to use device GPS current location
  ///
  /// In en, this message translates to:
  /// **'Use My Current Location'**
  String get useCurrentLocation;

  /// Title for finding driver bottom sheet
  ///
  /// In en, this message translates to:
  /// **'Finding Your Driver'**
  String get findingYourDriver;

  /// Description explaining driver assignment in progress
  ///
  /// In en, this message translates to:
  /// **'We\'re assigning the nearest available driver to your request.'**
  String get findingDriverDescription;

  /// Wait notice at bottom of finding driver sheet
  ///
  /// In en, this message translates to:
  /// **'This usually takes less than a minute.\nPlease keep the app open.'**
  String get findingDriverWaitNotice;

  /// Title for request cancelled page when driver is not assigned
  ///
  /// In en, this message translates to:
  /// **'We Couldn\'t Assign a Driver'**
  String get weCouldntAssignDriver;

  /// Notice stating no available drivers
  ///
  /// In en, this message translates to:
  /// **'Unfortunately, there aren\'t any available drivers at the moment.'**
  String get noAvailableDriversNotice;

  /// Notice stating booking cancellation
  ///
  /// In en, this message translates to:
  /// **'Your booking has been cancelled automatically.'**
  String get bookingCancelledAutomatically;

  /// Prefix text before the refunded amount
  ///
  /// In en, this message translates to:
  /// **'A full refund of '**
  String get fullRefundInitiatedPrefix;

  /// Suffix text after the refunded amount
  ///
  /// In en, this message translates to:
  /// **' has been initiated to your original payment method.'**
  String get fullRefundInitiatedSuffix;

  /// Notice stating refund initiation
  ///
  /// In en, this message translates to:
  /// **'A full refund of {amount} has been initiated to your original payment method.'**
  String fullRefundInitiated(String amount);

  /// Notice stating refund processing duration
  ///
  /// In en, this message translates to:
  /// **'Refunds typically appear within 3-5 business days, depending on your bank.'**
  String get refundsProcessingTimeNotice;

  /// Notice prompting user to try searching for a driver again
  ///
  /// In en, this message translates to:
  /// **'You can try searching for an available driver again.'**
  String get trySearchingAvailableDriverAgainNotice;

  /// Prefix text before the refund amount in driver-not-found cancellation notice
  ///
  /// In en, this message translates to:
  /// **'If you cancel the search and return home, your booking will be cancelled and a full refund of '**
  String get cancelSearchRefundNoticePrefix;

  /// Suffix text after the refund amount in driver-not-found cancellation notice
  ///
  /// In en, this message translates to:
  /// **' will be initiated to your original payment method. Refunds typically appear within 3-5 business days, depending on your bank.'**
  String get cancelSearchRefundNoticeSuffix;

  /// Subtitle under Try Again button
  ///
  /// In en, this message translates to:
  /// **'Search for an available driver again.'**
  String get searchForAvailableDriverAgain;

  /// Label for cancel and go back to home button
  ///
  /// In en, this message translates to:
  /// **'Cancel and Go Back to Home'**
  String get cancelAndGoBackToHome;

  /// Subtitle under Cancel and Go Back to Home button
  ///
  /// In en, this message translates to:
  /// **'Cancel the search and start your refund.'**
  String get cancelSearchStartRefund;

  /// Button label to navigate back to home screen
  ///
  /// In en, this message translates to:
  /// **'Back to Home'**
  String get backToHome;

  /// Subtitle for vehicle details card
  ///
  /// In en, this message translates to:
  /// **'Vehicle details'**
  String get vehicleDetails;

  /// Header for vehicle arriving timer card
  ///
  /// In en, this message translates to:
  /// **'Vehicle arriving in'**
  String get vehicleArrivingIn;

  /// Notice for boarding arrival time limit
  ///
  /// In en, this message translates to:
  /// **'Please be ready, you will have 2 minutes to board upon arrival.'**
  String get boardingNotice;

  /// Button label to cancel the ongoing ride
  ///
  /// In en, this message translates to:
  /// **'Cancel Ride'**
  String get cancelRide;

  /// Confirmation message when user attempts to cancel ride
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to cancel your ride?'**
  String get cancelRideConfirmation;

  /// Error message when opening messaging or SMS app fails
  ///
  /// In en, this message translates to:
  /// **'Unable to open messaging app'**
  String get unableToOpenMessaging;

  /// Error message when driver phone number is unavailable
  ///
  /// In en, this message translates to:
  /// **'Driver contact number is not available'**
  String get driverContactUnavailable;

  /// Label for time elapsed since booking
  ///
  /// In en, this message translates to:
  /// **'Time since booking'**
  String get timeSinceBooking;

  /// Notice indicating free cancellation availability window
  ///
  /// In en, this message translates to:
  /// **'Free cancellation is available within the first two minutes.'**
  String get freeCancellationNotice;

  /// Button label to confirm ride cancellation
  ///
  /// In en, this message translates to:
  /// **'Confirm Cancellation'**
  String get confirmCancellation;

  /// Button label to retain the current ride
  ///
  /// In en, this message translates to:
  /// **'Keep My Ride'**
  String get keepMyRide;

  /// Title for ride cancelled alert dialog
  ///
  /// In en, this message translates to:
  /// **'Ride Cancelled'**
  String get rideCancelled;

  /// Message for ride cancelled alert dialog
  ///
  /// In en, this message translates to:
  /// **'Your ride has been cancelled successfully.'**
  String get rideCancelledSuccessMessage;

  /// Title for ride cancellation failure alert dialog
  ///
  /// In en, this message translates to:
  /// **'Cancellation Failed'**
  String get cancellationFailed;

  /// Warning confirmation message before cancelling when cancellation fee applies
  ///
  /// In en, this message translates to:
  /// **'Cancelling after 2 minutes incurs an extra cancellation fee. Are you sure you want to proceed?'**
  String get cancellationFeeWarning;

  /// Notice indicating cancellation fee applies after 2 minutes
  ///
  /// In en, this message translates to:
  /// **'The 2-minute free cancellation period has ended. An extra cancellation fee applies.'**
  String get cancellationFeeNotice;

  /// Title for the cancellation policy popup
  ///
  /// In en, this message translates to:
  /// **'Cancellation Policy Reminder'**
  String get cancellationPolicyReminder;

  /// Policy condition for cancellation within 2 minutes
  ///
  /// In en, this message translates to:
  /// **'Cancel within 2 minutes of booking.'**
  String get cancelWithin2Min;

  /// Policy condition for cancellation after 2 minutes
  ///
  /// In en, this message translates to:
  /// **'Cancel after 2 minutes.'**
  String get cancelAfter2Min;

  /// Policy condition when vehicle is late over 15 minutes
  ///
  /// In en, this message translates to:
  /// **'Vehicle late over 15 minutes.'**
  String get vehicleLate15Min;

  /// Free of charge label
  ///
  /// In en, this message translates to:
  /// **'FREE'**
  String get free;

  /// Title for ride complete page
  ///
  /// In en, this message translates to:
  /// **'Ride Complete'**
  String get rideComplete;

  /// Headline text on ride complete
  ///
  /// In en, this message translates to:
  /// **'You’ve Arrived!'**
  String get youHaveArrived;

  /// Drop-off location label
  ///
  /// In en, this message translates to:
  /// **'Drop-off'**
  String get dropOff;

  /// Label for total charged amount
  ///
  /// In en, this message translates to:
  /// **'Total charged'**
  String get totalCharged;

  /// Title for rating section
  ///
  /// In en, this message translates to:
  /// **'Rate Us'**
  String get rateUs;

  /// Comment field label
  ///
  /// In en, this message translates to:
  /// **'Comment'**
  String get comment;

  /// Hint text for comment input field
  ///
  /// In en, this message translates to:
  /// **'Enter your comment here.'**
  String get enterYourCommentHere;

  /// Title for improvement reasons section
  ///
  /// In en, this message translates to:
  /// **'What could we improve?'**
  String get whatCouldWeImprove;

  /// Improvement reason: late pickup
  ///
  /// In en, this message translates to:
  /// **'Late Pickup'**
  String get latePickup;

  /// Improvement reason: driver behaviour
  ///
  /// In en, this message translates to:
  /// **'Driver Behaviour'**
  String get driverBehaviour;

  /// Improvement reason: cleanliness
  ///
  /// In en, this message translates to:
  /// **'Cleanliness'**
  String get cleanliness;

  /// Improvement reason: comfort
  ///
  /// In en, this message translates to:
  /// **'Comfort'**
  String get comfort;

  /// Improvement reason: route issue
  ///
  /// In en, this message translates to:
  /// **'Route Issue'**
  String get routeIssue;

  /// Title for add tip bottom sheet
  ///
  /// In en, this message translates to:
  /// **'Add a Tip'**
  String get addATip;

  /// Notice that tips go directly to the driver
  ///
  /// In en, this message translates to:
  /// **'100% of the tip goes to your driver'**
  String get tipGoesToDriver;

  /// One dollar tip option
  ///
  /// In en, this message translates to:
  /// **'\$1.00'**
  String get oneDollar;

  /// Two dollars tip option
  ///
  /// In en, this message translates to:
  /// **'\$2.00'**
  String get twoDollars;

  /// No tip option
  ///
  /// In en, this message translates to:
  /// **'No Tip'**
  String get noTip;

  /// Label for custom tip amount
  ///
  /// In en, this message translates to:
  /// **'Custom amount (\$)'**
  String get customAmount;

  /// Hint text for custom tip amount
  ///
  /// In en, this message translates to:
  /// **'Enter other amount'**
  String get enterOtherAmount;

  /// Button label to pay tip
  ///
  /// In en, this message translates to:
  /// **'Pay Tip'**
  String get payTip;

  /// Button label when no tip is selected
  ///
  /// In en, this message translates to:
  /// **'Continue without tip'**
  String get continueWithoutTip;

  /// Success message after submitting rating
  ///
  /// In en, this message translates to:
  /// **'Thank you for your feedback!'**
  String get thankYouForFeedback;

  /// Rating submitted successfully message
  ///
  /// In en, this message translates to:
  /// **'Rating Submitted'**
  String get ratingSubmitted;

  /// Button label for checking whether a resolved trip is serviceable
  ///
  /// In en, this message translates to:
  /// **'Check Availability'**
  String get checkAvailability;

  /// Retry message shown when the serviceability request fails
  ///
  /// In en, this message translates to:
  /// **'We couldn\'t check availability. Please try again.'**
  String get serviceabilityRetry;

  /// Fallback error message when a trip is outside the available service area
  ///
  /// In en, this message translates to:
  /// **'Location outside service area. Please choose another location.'**
  String get locationOutsideServiceArea;

  /// Title for tip sent successfully dialog
  ///
  /// In en, this message translates to:
  /// **'Thank You!'**
  String get tipSentSuccessTitle;

  /// Message for tip sent successfully dialog
  ///
  /// In en, this message translates to:
  /// **'Your tip has been sent to your driver.'**
  String get tipSentSuccessMessage;

  /// Title for continue without tip dialog
  ///
  /// In en, this message translates to:
  /// **'Thank You!'**
  String get continueWithoutTipTitle;

  /// Message for continue without tip dialog
  ///
  /// In en, this message translates to:
  /// **'Thank you. We hope to see you again soon.'**
  String get continueWithoutTipMessage;

  /// Title for rating and feedback submitted dialog
  ///
  /// In en, this message translates to:
  /// **'Thanks for Your Feedback'**
  String get thanksForYourFeedbackTitle;

  /// Message for rating and feedback submitted dialog
  ///
  /// In en, this message translates to:
  /// **'Thanks for rating your ride. We look forward to seeing you again.'**
  String get thanksForYourFeedbackMessage;

  /// Title for location services disabled dialog
  ///
  /// In en, this message translates to:
  /// **'Location Services Disabled'**
  String get locationServiceDisabledTitle;

  /// Message for location services disabled dialog
  ///
  /// In en, this message translates to:
  /// **'Location services are turned off on your device. Please enable location services in your device settings to use this feature.'**
  String get locationServiceDisabledMessage;

  /// Title for location permission denied dialog
  ///
  /// In en, this message translates to:
  /// **'Location Permission Required'**
  String get locationPermissionDeniedTitle;

  /// Message for location permission denied dialog
  ///
  /// In en, this message translates to:
  /// **'Location access is disabled. Please allow location permissions in your device settings to enable this feature.'**
  String get locationPermissionDeniedMessage;

  /// Title for disable location permission dialog
  ///
  /// In en, this message translates to:
  /// **'Disable Location Permission'**
  String get disableLocationPermissionTitle;

  /// Message for disable location permission dialog
  ///
  /// In en, this message translates to:
  /// **'To disable location permissions, please turn off Location in your device settings.'**
  String get disableLocationPermissionMessage;
}

class _AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) => <String>['en'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'en':
      return AppLocalizationsEn();
  }

  throw FlutterError('AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
      'an issue with the localizations generation tool. Please file an issue '
      'on GitHub with a reproducible sample app and the gen-l10n configuration '
      'that was used.');
}
