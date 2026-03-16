package com.example.melofi_1

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.media3.common.MediaItem
import androidx.media3.common.PlaybackException
import androidx.media3.common.Player
import androidx.media3.exoplayer.ExoPlayer
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class PlayerViewModel : ViewModel() {

    private var _exoPlayer: ExoPlayer? = null

    private val _isPlaying = MutableStateFlow(false)
    val isPlaying: StateFlow<Boolean> = _isPlaying.asStateFlow()

    private val _currentPosition = MutableStateFlow(0L)
    val currentPosition: StateFlow<Long> = _currentPosition.asStateFlow()

    private val _duration = MutableStateFlow(0L)
    val duration: StateFlow<Long> = _duration.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    fun initializePlayer(context: Context, songUrl: String) {
        if (_exoPlayer != null) return

        try {
            val player = ExoPlayer.Builder(context).build().apply {
                val mediaItem = MediaItem.Builder()
                    .setUri(songUrl)
                    .build()

                setMediaItem(mediaItem)
                prepare()

                addListener(object : Player.Listener {
                    override fun onIsPlayingChanged(isPlaying: Boolean) {
                        _isPlaying.update { isPlaying }
                    }

                    override fun onPlaybackStateChanged(playbackState: Int) {
                        when (playbackState) {
                            Player.STATE_READY -> {
                                _duration.update { duration }
                            }
                            Player.STATE_ENDED -> {
                                seekTo(0)
                                playWhenReady = false
                            }
                        }
                    }

                    override fun onPlayerError(error: PlaybackException) {
                        _error.update { "Playback error: ${error.message}" }
                    }
                })
            }

            _exoPlayer = player

            // Start position updates
            viewModelScope.launch {
                while (true) {
                    _exoPlayer?.let {
                        _currentPosition.value = player.currentPosition
                    }
                    kotlinx.coroutines.delay(500) // Update every 500ms
                }
            }
        } catch (e: Exception) {
            _error.update { "Failed to initialize player: ${e.message}" }
        }
    }

    fun playPause() {
        _exoPlayer?.let {
            if (it.isPlaying) {
                it.pause()
            } else {
                it.play()
            }
        }
    }

    fun seekTo(positionMs: Long) {
        _exoPlayer?.seekTo(positionMs)
    }

    fun releasePlayer() {
        _exoPlayer?.release()
        _exoPlayer = null
    }

    override fun onCleared() {
        super.onCleared()
        releasePlayer()
    }
}