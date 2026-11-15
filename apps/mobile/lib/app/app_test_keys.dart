import 'package:flutter/widgets.dart';

/// Stable widget identifiers shared by integration hosts and accessibility tooling.
abstract final class AppTestKeys {
  static const introSignUp = ValueKey<String>('intro-sign-up');
  static const signUpEmail = ValueKey<String>('sign-up-email');
  static const signUpPassword = ValueKey<String>('sign-up-password');
  static const signUpTerms = ValueKey<String>('sign-up-terms');
  static const signUpSubmit = ValueKey<String>('sign-up-submit');
  static const verificationCode = ValueKey<String>('verification-code');
  static const moreTab = ValueKey<String>('more-tab');
  static const contactMenu = ValueKey<String>('contact-menu');
  static const contactMessage = ValueKey<String>('contact-message');
  static const contactSubmit = ValueKey<String>('contact-submit');
  static const contactSuccess = ValueKey<String>('contact-success');
  static const introSignIn = ValueKey<String>('intro-sign-in');
  static const signInEmail = ValueKey<String>('sign-in-email');
  static const signInPassword = ValueKey<String>('sign-in-password');
  static const signInSubmit = ValueKey<String>('sign-in-submit');
  static const homeRequests = ValueKey<String>('home-requests');
  static const pickupInput = ValueKey<String>('pickup-input');
  static const dropOffInput = ValueKey<String>('drop-off-input');
  static const locationSuggestion = ValueKey<String>('location-suggestion');
  static const checkAvailability = ValueKey<String>('check-availability');
  static const setLocation = checkAvailability;
  static const requestQuote = ValueKey<String>('request-quote');
  static const vehicleOption = ValueKey<String>('vehicle-option');
  static const confirmBooking = ValueKey<String>('confirm-booking');
  static const savedPaymentMethod = ValueKey<String>('saved-payment-method');
  static const submitPayment = ValueKey<String>('submit-payment');
  static const trackingDriver = ValueKey<String>('tracking-driver');
  static const trackingEta = ValueKey<String>('tracking-eta');
  static const logout = ValueKey<String>('logout');
  static const mapSurface = ValueKey<String>('map-surface');
  static const confirmDroppedPin = ValueKey<String>('confirm-dropped-pin');
}
