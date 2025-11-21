package com.stumili.Sound

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.support.v4.media.MediaBrowserCompat
import android.support.v4.media.MediaMetadataCompat
import android.support.v4.media.session.MediaSessionCompat
import android.support.v4.media.session.PlaybackStateCompat
import androidx.core.app.NotificationCompat
import androidx.media.MediaBrowserServiceCompat
import com.google.android.exoplayer2.ExoPlayer
import com.google.android.exoplayer2.MediaItem
import com.google.android.exoplayer2.Player

class MyAudioService : MediaBrowserServiceCompat() {

    private lateinit var mediaSession: MediaSessionCompat
    private lateinit var exoPlayer: ExoPlayer

    private val NOTIFICATION_ID = 1
    private val CHANNEL_ID = "audio_channel_id"

    private val playlist = mutableListOf<String>()
    private var currentIndex = 0

    private val handler = Handler(Looper.getMainLooper())

    // 🔊 Independent volume variable
    private var customVolume = 1.0f

    // Volume animation handler
    private var volumeFadeHandler = Handler(Looper.getMainLooper())
    private var isFading = false

    private val updateRunnable =
            object : Runnable {
                override fun run() {
                    if (::exoPlayer.isInitialized && exoPlayer.isPlaying) {
                        updateNotificationProgress()
                        sendProgressUpdate()
                        handler.postDelayed(this, 1000)
                    }
                }
            }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()

        mediaSession = MediaSessionCompat(this, "MyAudioService")
        sessionToken = mediaSession.sessionToken
        mediaSession.isActive = true

        exoPlayer = ExoPlayer.Builder(this).build()
        exoPlayer.volume = customVolume

        exoPlayer.addListener(
                object : Player.Listener {
                    override fun onPlaybackStateChanged(state: Int) {
                        when (state) {
                            Player.STATE_ENDED -> skipToNext()
                            Player.STATE_READY -> {
                                updateNotification()
                                if (exoPlayer.isPlaying) startProgressUpdates()
                            }
                            Player.STATE_BUFFERING -> updateNotification()
                        }
                    }

                    override fun onIsPlayingChanged(isPlaying: Boolean) {
                        if (isPlaying) startProgressUpdates() else stopProgressUpdates()
                        updateNotification()
                    }
                }
        )

        mediaSession.setCallback(
                object : MediaSessionCompat.Callback() {
                    override fun onPlay() {
                        playCurrent()
                        startProgressUpdates()
                    }

                    override fun onPause() {
                        exoPlayer.pause()
                        updatePlaybackState(PlaybackStateCompat.STATE_PAUSED)
                        stopProgressUpdates()
                    }

                    override fun onStop() {
                        exoPlayer.stop()
                        stopForeground(true)
                        stopSelf()
                        updatePlaybackState(PlaybackStateCompat.STATE_STOPPED)
                        stopProgressUpdates()
                    }

                    override fun onSeekTo(pos: Long) {
                        exoPlayer.seekTo(pos)
                        updateNotificationProgress()
                    }

                    override fun onSkipToNext() = skipToNext()
                    override fun onSkipToPrevious() = skipToPrevious()
                }
        )
    }

    private fun startProgressUpdates() {
        handler.removeCallbacks(updateRunnable)
        handler.post(updateRunnable)
    }

    private fun stopProgressUpdates() {
        handler.removeCallbacks(updateRunnable)
    }

    private fun sendProgressUpdate() {
        val intent = Intent("AUDIO_PROGRESS")
        intent.putExtra("current", exoPlayer.currentPosition)
        intent.putExtra("duration", exoPlayer.duration)
        sendBroadcast(intent)
    }

    private fun sendVolumeUpdate() {
        val intent = Intent("AUDIO_VOLUME_CHANGED")
        intent.putExtra("volume", customVolume)
        sendBroadcast(intent)
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel =
                    NotificationChannel(
                            CHANNEL_ID,
                            "Audio Playback",
                            NotificationManager.IMPORTANCE_LOW
                    )
            channel.setSound(null, null)
            val manager = getSystemService(NotificationManager::class.java)
            manager?.createNotificationChannel(channel)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        intent?.action?.let {
            when (it) {
                "SET_PLAYLIST" -> {
                    val urls = intent.getStringArrayListExtra("URLS")
                    if (!urls.isNullOrEmpty()) {
                        playlist.clear()
                        playlist.addAll(urls)
                        currentIndex = 0
                        playCurrent()
                    }
                }
                "PLAY_ACTION" -> mediaSession.controller.transportControls.play()
                "PAUSE_ACTION" -> mediaSession.controller.transportControls.pause()
                "NEXT_ACTION" -> mediaSession.controller.transportControls.skipToNext()
                "PREV_ACTION" -> mediaSession.controller.transportControls.skipToPrevious()
                "STOP_ACTION" -> mediaSession.controller.transportControls.stop()
                "SEEK_ACTION" -> {
                    val pos = intent.getLongExtra("POSITION", 0L)
                    mediaSession.controller.transportControls.seekTo(pos)
                }
                // 🔊 Independent Volume Actions
                "VOLUME_UP_ACTION" -> increaseVolume()
                "VOLUME_DOWN_ACTION" -> decreaseVolume()
                "FADE_OUT_ACTION" -> fadeOutVolume()
                "FADE_IN_ACTION" -> fadeInVolume()
                "SET_VOLUME_ACTION" -> {
                    val value = intent.getFloatExtra("VOLUME_VALUE", customVolume)
                    setVolumeFromReact(value)
                }
            }
        }
        return START_STICKY
    }

    private fun playCurrent() {
        if (playlist.isEmpty()) return

        val url = playlist[currentIndex]
        val mediaItem = MediaItem.Builder().setUri(url).setMediaId(url).build()

        if (exoPlayer.currentMediaItem == null || exoPlayer.currentMediaItem?.mediaId != url) {
            exoPlayer.setMediaItem(mediaItem)
            exoPlayer.prepare()
        }

        exoPlayer.volume = customVolume
        exoPlayer.play()

        mediaSession.setMetadata(
                MediaMetadataCompat.Builder()
                        .putString(
                                MediaMetadataCompat.METADATA_KEY_TITLE,
                                "Song ${currentIndex + 1}"
                        )
                        .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, "Artist")
                        .putLong(MediaMetadataCompat.METADATA_KEY_DURATION, exoPlayer.duration)
                        .build()
        )

        updatePlaybackState(PlaybackStateCompat.STATE_PLAYING)
        updateNotification()
    }

    private fun skipToNext() {
        if (currentIndex + 1 < playlist.size) {
            currentIndex++
            playCurrent()
        } else {
            mediaSession.controller.transportControls.stop()
        }
    }

    private fun skipToPrevious() {
        if (currentIndex - 1 >= 0) {
            currentIndex--
            playCurrent()
        } else {
            exoPlayer.seekTo(0)
        }
    }

    private fun updatePlaybackState(state: Int) {
        val playbackState =
                PlaybackStateCompat.Builder()
                        .setState(state, exoPlayer.currentPosition, 1.0f)
                        .setActions(
                                PlaybackStateCompat.ACTION_PLAY or
                                        PlaybackStateCompat.ACTION_PAUSE or
                                        PlaybackStateCompat.ACTION_STOP or
                                        PlaybackStateCompat.ACTION_SEEK_TO or
                                        PlaybackStateCompat.ACTION_SKIP_TO_NEXT or
                                        PlaybackStateCompat.ACTION_SKIP_TO_PREVIOUS
                        )
                        .build()
        mediaSession.setPlaybackState(playbackState)
        updateNotification()
    }

    private fun updateNotification() {
        updateNotificationProgress()
    }

    private fun updateNotificationProgress() {
        if (!::exoPlayer.isInitialized) return

        val metadata = mediaSession.controller.metadata
        val title = metadata?.getString(MediaMetadataCompat.METADATA_KEY_TITLE) ?: "Audio"
        val artist = metadata?.getString(MediaMetadataCompat.METADATA_KEY_ARTIST) ?: "Unknown"
        val isPlaying = exoPlayer.isPlaying

        val current = exoPlayer.currentPosition.coerceAtLeast(0)
        val total = exoPlayer.duration.coerceAtLeast(1)

        val playIntent =
                PendingIntent.getService(
                        this,
                        0,
                        Intent(this, MyAudioService::class.java).setAction("PLAY_ACTION"),
                        PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
                )
        val pauseIntent =
                PendingIntent.getService(
                        this,
                        1,
                        Intent(this, MyAudioService::class.java).setAction("PAUSE_ACTION"),
                        PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
                )
        val nextIntent =
                PendingIntent.getService(
                        this,
                        2,
                        Intent(this, MyAudioService::class.java).setAction("NEXT_ACTION"),
                        PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
                )
        val prevIntent =
                PendingIntent.getService(
                        this,
                        3,
                        Intent(this, MyAudioService::class.java).setAction("PREV_ACTION"),
                        PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
                )
        val volUpIntent =
                PendingIntent.getService(
                        this,
                        4,
                        Intent(this, MyAudioService::class.java).setAction("VOLUME_UP_ACTION"),
                        PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
                )
        val volDownIntent =
                PendingIntent.getService(
                        this,
                        5,
                        Intent(this, MyAudioService::class.java).setAction("VOLUME_DOWN_ACTION"),
                        PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
                )

        val builder =
                NotificationCompat.Builder(this, CHANNEL_ID)
                        .setContentTitle(title)
                        .setContentText("$artist | Volume: ${(customVolume * 100).toInt()}%")
                        .setSubText("${formatTime(current)} / ${formatTime(total)}")
                        .setSmallIcon(android.R.drawable.ic_media_play)
                        .setOngoing(isPlaying)
                        .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                        .setOnlyAlertOnce(true)
                        .addAction(android.R.drawable.ic_media_previous, "Prev", prevIntent)
                        .addAction(
                                if (isPlaying) android.R.drawable.ic_media_pause
                                else android.R.drawable.ic_media_play,
                                if (isPlaying) "Pause" else "Play",
                                if (isPlaying) pauseIntent else playIntent
                        )
                        .addAction(android.R.drawable.ic_media_next, "Next", nextIntent)
                        .addAction(android.R.drawable.ic_media_ff, "Vol+", volUpIntent)
                        .addAction(android.R.drawable.ic_media_rew, "Vol-", volDownIntent)
                        .setStyle(
                                androidx.media.app.NotificationCompat.MediaStyle()
                                        .setMediaSession(mediaSession.sessionToken)
                                        .setShowActionsInCompactView(0, 1, 2, 3, 4)
                        )

        val notificationManager = getSystemService(NotificationManager::class.java)
        if (isPlaying) startForeground(NOTIFICATION_ID, builder.build())
        else notificationManager?.notify(NOTIFICATION_ID, builder.build())
    }

    private fun formatTime(ms: Long): String {
        val totalSeconds = ms / 1000
        val minutes = totalSeconds / 60
        val seconds = totalSeconds % 60
        return String.format("%d:%02d", minutes, seconds)
    }

    // 🎚️ Independent Volume Functions
    fun setCustomVolume(volume: Float) {
        customVolume = volume.coerceIn(0f, 1f)
        exoPlayer.volume = customVolume
        sendVolumeUpdate()
        updateNotification()
    }

    fun increaseVolume(step: Float = 0.1f) {
        setCustomVolume(customVolume + step)
    }

    fun decreaseVolume(step: Float = 0.1f) {
        setCustomVolume(customVolume - step)
    }

    // 🔄 Smooth fade out
    fun fadeOutVolume(durationMs: Long = 2000L) {
        if (isFading) return
        isFading = true
        val start = customVolume
        val steps = 20
        val delay = durationMs / steps
        var i = 0
        volumeFadeHandler.post(
                object : Runnable {
                    override fun run() {
                        val newVol = start * (1f - i / steps.toFloat())
                        setCustomVolume(newVol)
                        if (i++ < steps) volumeFadeHandler.postDelayed(this, delay)
                        else isFading = false
                    }
                }
        )
    }

    // 🔄 Smooth fade in
    fun fadeInVolume(durationMs: Long = 2000L) {
        if (isFading) return
        isFading = true
        val end = customVolume
        setCustomVolume(0f)
        val steps = 20
        val delay = durationMs / steps
        var i = 0
        volumeFadeHandler.post(
                object : Runnable {
                    override fun run() {
                        val newVol = i / steps.toFloat() * end
                        setCustomVolume(newVol)
                        if (i++ < steps) volumeFadeHandler.postDelayed(this, delay)
                        else isFading = false
                    }
                }
        )
    }

    override fun onGetRoot(
            clientPackageName: String,
            clientUid: Int,
            rootHints: Bundle?
    ): BrowserRoot? = BrowserRoot("root_id", null)

    override fun onLoadChildren(
            parentId: String,
            result: Result<MutableList<MediaBrowserCompat.MediaItem>>
    ) {
        result.sendResult(null)
    }

    override fun onDestroy() {
        super.onDestroy()
        stopProgressUpdates()
        handler.removeCallbacksAndMessages(null)
        exoPlayer.release()
        mediaSession.release()
    }

    fun addToPlaylist(urls: List<String>) {
        playlist.addAll(urls)
    }
    fun setVolumeFromReact(value: Float) {
        val newVol = value.coerceIn(0f, 1f)
        setCustomVolume(newVol)
    }
}
