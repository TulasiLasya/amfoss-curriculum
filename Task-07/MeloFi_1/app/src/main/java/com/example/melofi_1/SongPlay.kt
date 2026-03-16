package com.example.melofi_1


import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Pause
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.SkipNext
import androidx.compose.material.icons.filled.SkipPrevious
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel


@Composable
fun SongPlayScreen(
    navController: NavController,
    songId: String,
    sharedViewModel: SharedViewModel,
    playerViewModel: PlayerViewModel = viewModel()
) {
    val selectedSong by sharedViewModel.selectedSong.collectAsState()
    val allSongs by sharedViewModel.allSongs.collectAsState()
    val song = selectedSong ?: allSongs.find { it.id == songId }

    val context = LocalContext.current
    val isPlaying by playerViewModel.isPlaying.collectAsState()
    val currentPosition by playerViewModel.currentPosition.collectAsState()
    val duration by playerViewModel.duration.collectAsState()
    val error by playerViewModel.error.collectAsState()

    LaunchedEffect(song) {
        song?.let {
            playerViewModel.initializePlayer(context, it.url)
        }
    }

    // to clear player and shared view model
    DisposableEffect(Unit) {
        onDispose {
            playerViewModel.releasePlayer()
            sharedViewModel.clearSelectedSong()
        }
    }

    if (song == null) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                CircularProgressIndicator(color = Color(0xFFFF69D9))
                Spacer(modifier = Modifier.height(16.dp))
                Text("Loading song...", color = Color.White)
            }
        }
        return
    }


    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Back button
        Row(
            modifier = Modifier.fillMaxWidth(),
//            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Skip Previous Button
            IconButton(
                onClick = { navController.popBackStack() },
//                modifier = Modifier.size(48.dp)
            ) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Back",
                    tint = Color.White,
                    modifier = Modifier.size(24.dp)
                )
            }

//            Spacer(modifier = Modifier.width(16.dp))
            Text(
                text = "Now Playing",
                color = Color.White,
                fontSize = 20.sp,
                modifier = Modifier.weight(1f),
                textAlign = androidx.compose.ui.text.style.TextAlign.Center
            )

            // Empty space for balance
            Spacer(modifier = Modifier.size(48.dp))
        }

        Spacer(modifier = Modifier.height(16.dp))
        AsyncImage(
            model = song.songBanner,
            contentDescription = song.songName,
            modifier = Modifier
                .size(250.dp)
                .padding(16.dp)
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Song Info
        Text(
            text = song.songName,
            color = Color.White,
            fontSize = 24.sp
        )

        Text(
            text = song.singer,
            color = Color.Gray,
            fontSize = 18.sp
        )

        Text(
            text = song.albumname,
            color = Color.Gray,
            fontSize = 16.sp
        )

        Spacer(modifier = Modifier.height(24.dp))
        // Progress Bar
        if (duration > 0) {
            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Slider(
                    value = currentPosition.toFloat(),
                    onValueChange = { playerViewModel.seekTo(it.toLong()) },
                    valueRange = 0f..duration.toFloat(),
                    modifier = Modifier.fillMaxWidth(0.9f),
                    colors = SliderDefaults.colors(
                        thumbColor = Color(0xFFFF69D9),
                        activeTrackColor = Color(0xFFFF69D9)
                    )
                )

                Row(
                    modifier = Modifier.fillMaxWidth(0.9f),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = formatDuration(currentPosition),
                        color = Color.Gray,
                        fontSize = 12.sp
                    )
                    Text(
                        text = formatDuration(duration),
                        color = Color.Gray,
                        fontSize = 12.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))
        }
        // Playback Controls Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Skip Previous Button
            IconButton(
                onClick = { /* TODO: Skip to previous */ },
                modifier = Modifier.size(48.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.SkipPrevious,
                    contentDescription = "Previous",
                    tint = Color.White,
                    modifier = Modifier.size(32.dp)
                )
            }

            Spacer(modifier = Modifier.width(16.dp))

            // Play/Pause Button
            IconButton(
                onClick = { playerViewModel.playPause() },
                modifier = Modifier.size(64.dp)
            ) {
                Icon(
                    imageVector = if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                    contentDescription = if (isPlaying) "Pause" else "Play",
                    tint = Color(0xFFFF69D9),
                    modifier = Modifier.size(48.dp)
                )
            }

            Spacer(modifier = Modifier.width(16.dp))

            // Skip Next Button
            IconButton(
                onClick = { /* TODO: Skip to next */ },
                modifier = Modifier.size(48.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.SkipNext,
                    contentDescription = "Next",
                    tint = Color.White,
                    modifier = Modifier.size(32.dp)
                )
            }
        }
    }
    // Error message if any
    error?.let {
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = it,
            color = Color.Red,
            fontSize = 14.sp
        )
    }
}


// Helper function to format duration
private fun formatDuration(durationMs: Long): String {
    if (durationMs <= 0) return "0:00"
    val totalSeconds = durationMs / 1000
    val minutes = totalSeconds / 60
    val seconds = totalSeconds % 60
    return String.format("%d:%02d", minutes, seconds)
}