@ECHO OFF
color 0a
cd /D "C:\xampp\htdocs\imabuilder\outputs\andokala"
%ANDROID_SDK_ROOT%/platform-tools/adb install "platforms/android/app/build/outputs/apk/debug/app-debug.apk"