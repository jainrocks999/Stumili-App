package com.stumili.volume

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.media.AudioManager
import android.content.BroadcastReceiver
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class VolumeModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val audioManager: AudioManager =
        reactContext.getSystemService(Context.AUDIO_SERVICE) as AudioManager

    private var volumeReceiver: BroadcastReceiver? = null

    override fun getName() = "VolumeModule"

    // --- Set Volume ---
    @ReactMethod
    fun setVolume(level: Double) {
        val maxVolume = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
        val safeLevel = level.coerceIn(0.0, 1.0)
        val newVolume = (safeLevel * maxVolume).toInt()
        audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, newVolume, 0)
    }

    // --- Get Volume ---
    @ReactMethod
    fun getVolume(promise: Promise) {
        try {
            val current = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC)
            val max = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
            promise.resolve(current.toDouble() / max)
        } catch (e: Exception) {
            promise.reject("VOLUME_ERROR", "Failed to get volume: ${e.message}")
        }
    }

    // --- Start listening to volume changes ---
    @ReactMethod
    fun startListening() {
        if (volumeReceiver != null) return // already registered

        volumeReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                if (intent?.action == "android.media.VOLUME_CHANGED_ACTION") {
                    val current = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC)
                    val max = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
                    val volume = current.toDouble() / max

                    sendEvent("onVolumeChanged", volume)
                }
            }
        }

        val filter = IntentFilter("android.media.VOLUME_CHANGED_ACTION")
        reactContext.registerReceiver(volumeReceiver, filter)
    }

    // --- Stop listening ---
    @ReactMethod
    fun stopListening() {
        if (volumeReceiver != null) {
            reactContext.unregisterReceiver(volumeReceiver)
            volumeReceiver = null
        }
    }

    private fun sendEvent(eventName: String, volume: Double) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, Arguments.createMap().apply {
                putDouble("volume", volume)
            })
    }

    override fun onCatalystInstanceDestroy() {
        stopListening()
        super.onCatalystInstanceDestroy()
    }
}
