# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# Keep your audio service class (prevent renaming/removal)
-keep class com.stumili.Sound.MyAudioService { *; }

# Keep ExoPlayer + MediaSession + AndroidX media stuff
-keep class com.google.android.exoplayer2.** { *; }
-keep class androidx.media.** { *; }
-keep class android.support.v4.media.** { *; }
-keep class android.support.v4.media.session.** { *; }