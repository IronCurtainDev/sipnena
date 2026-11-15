// ignore_for_file: depend_on_referenced_packages

import 'dart:developer';
import 'dart:io';

import 'package:adaptive_dialog/adaptive_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';
import 'package:image_cropper/image_cropper.dart';
import 'package:image_picker/image_picker.dart';
import 'package:image_picker_android/image_picker_android.dart';
import 'package:image_picker_platform_interface/image_picker_platform_interface.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';

/// A service provider for image utilities.
///
/// This class provides methods for picking and taking images using the device's camera or gallery.
/// It uses the `image_picker` package to handle image selection.
class AppImageUtils {
  AppImageUtils._() {
    _init();
  }
  static AppImageUtils? _instance;

  static AppImageUtils get instance {
    _instance ??= AppImageUtils._();
    return _instance!;
  }

  /// Initializes the image picker platform and sets the Android photo picker option if the platform is Android.
  void _init() {
    final imagePickerPlatform = ImagePickerPlatform.instance;
    if (imagePickerPlatform is ImagePickerAndroid) {
      imagePickerPlatform.useAndroidPhotoPicker = true;
    }
  }

  Future<XFile?> _compressImage(File file) async {
    final directory = await getTemporaryDirectory();
    final targetPath = '${directory.path}/compressed_${DateTime.now().millisecondsSinceEpoch}.jpg';

    final result = await FlutterImageCompress.compressAndGetFile(file.path, targetPath, quality: 80);
    return result != null ? XFile(result.path) : null;
  }

  Future<CroppedFile?> getImageBySource(BuildContext context) async {
    log('getImageBySource() called');
    final result = await showModalActionSheet<ImageSource>(
      context: context,
      title: 'Select Image Source',
      message: 'Choose the source of the image',
      actions: [
        const SheetAction(key: ImageSource.camera, label: 'Camera', icon: Icons.camera_alt),
        const SheetAction(key: ImageSource.gallery, label: 'Gallery', icon: Icons.photo_library),
      ],
    );

    log('Action sheet result: $result');
    if (result == null) return null;

    if (result == ImageSource.camera) {
      log('Requesting camera permission...');
      final status = await Permission.camera.request();
      log('Camera permission status: $status');
      if (!context.mounted) return null;
      if (status.isPermanentlyDenied) {
        await showOkAlertDialog(
          context: context,
          title: 'Camera Access Required',
          message: 'Camera access is permanently denied. Please enable it in settings to take a profile picture.',
        );
        await openAppSettings();
        return null;
      }
      if (!status.isGranted) return null;
      return takeImage();
    } else {
      if (Platform.isIOS) {
        log('Requesting photo permission...');
        final status = await Permission.photos.request();
        log('Photo permission status: $status');
        if (!context.mounted) return null;
        if (status.isPermanentlyDenied) {
          await showOkAlertDialog(
            context: context,
            title: 'Photo Access Required',
            message: 'Photo access is permanently denied. Please enable it in settings to upload a profile picture.',
          );
          await openAppSettings();
          return null;
        }
        if (!status.isGranted && !status.isLimited) return null;
      }
      return pickImage();
    }
  }

  Future<CroppedFile?> pickImage() async {
    log('pickImage() called');
    final pickedImage = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (pickedImage == null) {
      log('No image picked from gallery');
      return null;
    }
    log('Image picked: ${pickedImage.path}');
    return _cropAndCompressImage(file: File(pickedImage.path));
  }

  Future<CroppedFile?> takeImage() async {
    log('takeImage() called');
    final pickedImage = await ImagePicker().pickImage(source: ImageSource.camera);
    if (pickedImage == null) {
      log('No image taken from camera');
      return null;
    }

    final file = File(pickedImage.path);
    final fileSize = await file.length();
    log('Before cropping: ${_formatBytes(fileSize)}');

    return _cropAndCompressImage(file: file);
  }

  Future<CroppedFile?> _cropAndCompressImage({required File file}) async {
    log('_cropAndCompressImage() for file: ${file.path}');
    final croppedFile = await ImageCropper().cropImage(
      sourcePath: file.path,
      aspectRatio: const CropAspectRatio(ratioX: 1, ratioY: 1),
      uiSettings: [
        AndroidUiSettings(
          toolbarTitle: 'PROFILE',
          toolbarColor: const Color.fromRGBO(18, 19, 23, 1),
          toolbarWidgetColor: Colors.white,
          initAspectRatio: CropAspectRatioPreset.square,
          lockAspectRatio: true,
          activeControlsWidgetColor: const Color.fromRGBO(180, 236, 81, 1),
          dimmedLayerColor: const Color.fromRGBO(0, 0, 0, 0.7),
          cropFrameColor: const Color.fromRGBO(180, 236, 81, 1),
          cropGridColor: Colors.white.withValues(alpha: 0.3),
        ),
        IOSUiSettings(
          title: 'PROFILE',
          aspectRatioLockEnabled: true,
          resetAspectRatioEnabled: false,
          doneButtonTitle: 'Apply',
          cancelButtonTitle: 'Cancel',
        ),
      ],
    );

    if (croppedFile == null) {
      log('Cropping cancelled or failed');
      return null;
    }
    log('Image cropped: ${croppedFile.path}');

    final croppedFileSize = await File(croppedFile.path).length();
    log('After cropping: ${_formatBytes(croppedFileSize)}');

    log('Compressing image...');
    final compressedFile = await _compressImage(File(croppedFile.path));

    if (compressedFile != null) {
      final compressedSize = await compressedFile.length();
      log('After compression: ${_formatBytes(compressedSize)}');
      return CroppedFile(compressedFile.path);
    }

    log('Compression failed, returning cropped file');
    return CroppedFile(croppedFile.path); // Return uncompressed if compression fails
  }

  String _formatBytes(int bytes) {
    final kb = bytes / 1024;
    final mb = kb / 1024;
    return '$bytes bytes | ${kb.toStringAsFixed(2)} KB | ${mb.toStringAsFixed(2)} MB';
  }

  /// Deprecated: Use [getImageBySource] instead.
  @Deprecated('Use getImageBySource instead')
  Future<CroppedFile?> showPicker(BuildContext context) async {
    return getImageBySource(context);
  }
}
