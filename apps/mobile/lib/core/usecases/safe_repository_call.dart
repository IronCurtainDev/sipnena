import 'package:react_hono_flutter_template/core/error/error.dart';
import 'package:react_hono_flutter_template/core/usecases/result.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A utility function to execute repository calls safely.
///
/// **Problem Solved:**
/// Before this utility, every single repository method across the app duplicated
/// the exact same boilerplate code for null-checking the remote data source and
/// wrapping API calls in a `try/catch` block to map exceptions to domain `Failure`s.
/// This led to massive code duplication and a violation of the DRY principle.
///
/// **Benefits:**
/// 1. **DRY Principle**: Removes hundreds of lines of duplicated `try/catch` boilerplate.
/// 2. **Consistent Error Handling**: Ensures all uncaught exceptions across all features
///    are uniformly mapped through `Exception.toFailure()`.
/// 3. **Type Safety**: Automatically wraps the returned type `T` in a domain `Result.success(T)`.
///
/// **Before (Without `safeRepositoryCall`):**
/// ```dart
/// Future<Result<UserProfile>> getProfile() async {
///   if (remoteDataSource == null) {
///     return const Result.failure(ServerFailure('Remote data source not configured'));
///   }
///   try {
///     final profile = await remoteDataSource!.getProfile();
///     return Result.success(profile.toEntity());
///   } on Exception catch (e) {
///     return Result.failure(e.toFailure());
///   }
/// }
/// ```
///
/// **After (With `safeRepositoryCall`):**
/// ```dart
/// Future<Result<UserProfile>> getProfile() async {
///   return safeRepositoryCall(
///     requireRemote: true,
///     remoteDataSource: remoteDataSource,
///     () async {
///       final profile = await remoteDataSource!.getProfile();
///       return profile.toEntity();
///     },
///   );
/// }
/// ```
///
/// It wraps the [call] in a try-catch block and maps any resulting [Exception]
/// to a [Failure] using the `toFailure()` extension.
///
/// You can optionally provide [remoteDataSource] to verify it is not null
/// before executing the call by setting [requireRemote] to true.
Future<Result<T>> safeRepositoryCall<T>(
  Future<T> Function() call, {
  Object? remoteDataSource,
  bool requireRemote = false,
}) async {
  if (requireRemote && remoteDataSource == null) {
    return const Result.failure(ServerFailure('Remote data source not configured'));
  }

  try {
    final result = await call();
    return Result.success(result);
  } on Failure catch (f) {
    return Result.failure(f);
  } on Exception catch (e) {
    return Result.failure(e.toFailure());
  } catch (e) {
    return Result.failure(ServerFailure(e.toString()));
  }
}
