package com.example.melofi

import android.R.attr.label
import android.R.attr.onClick
import android.R.attr.text
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ButtonDefaults.buttonColors
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.*
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight.Companion.Bold
import androidx.compose.ui.unit.dp
import java.nio.file.WatchEvent

@Composable
fun CreatePlaylist() {

    var playlistName by remember { mutableStateOf("") }

    val gradientBrush = Brush.linearGradient(


        0.25f to Color(0xFFF1C9BB), // Still black at the middle
        1.0f to Color(0xFFF23594), // Transition complete at bottom
        start = Offset(0f, 0f), // Top
        end = Offset(0f, Float.POSITIVE_INFINITY) // Bottom
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(gradientBrush)
    )
    Column(
        modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {

        Text(text = "Give your Playlist name", color = Color.Black, fontWeight = Bold)
        Spacer(modifier = Modifier.height(20.dp))
        OutlinedTextField(
            value = playlistName,
            onValueChange = { playlistName = it  },
            label = {Text(text = "playlist Name")},
            colors = OutlinedTextFieldDefaults.colors(
                focusedLabelColor = Color.Black,
                focusedPlaceholderColor = Color.Black,
                focusedBorderColor = Color.Black,
                unfocusedLabelColor = Color.Black,
                unfocusedPlaceholderColor = Color.Black,
                unfocusedBorderColor = Color.Black
            )
        )
        Spacer(modifier = Modifier.height(20.dp))
        Row(
            modifier = Modifier, horizontalArrangement = Arrangement.Center,
        ){

        Button(onClick = { }, modifier = Modifier.padding(20.dp), colors = ButtonDefaults.buttonColors(
            containerColor = Color.White, contentColor = Color.Black)) {Text(text = "Create")}
            Spacer(modifier = Modifier.height(50.dp))
        Button(onClick = { }, modifier = Modifier.padding(20.dp) , colors = ButtonDefaults.buttonColors(
            containerColor = Color.White, contentColor = Color.Black)) {Text(text = "Cancel") }
        }

    }
}