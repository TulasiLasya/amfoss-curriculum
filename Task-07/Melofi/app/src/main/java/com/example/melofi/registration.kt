package com.example.melofi

import android.R.attr.text
import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.*
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun RegistrationPage() {

    var email by remember { mutableStateOf("") }

    var password by remember { mutableStateOf("") }

    var username by remember { mutableStateOf("") }

    val gradientBrush = Brush.linearGradient(

        0.0f to Color.Black,
        0.5f to Color(0xFFFF6060), // Still black at the middle
        1.0f to Color.Black, // Transition complete at bottom
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
    ){
    Text(text = "Registration", fontSize = 28.sp, color = Color.Black)
    Spacer(modifier = Modifier.height(16.dp))

    OutlinedTextField(value=username, onValueChange = { username = it } , label = @androidx.compose.runtime.Composable { Text(text = "Username")}  , colors= OutlinedTextFieldDefaults.colors(focusedBorderColor = Color.White, unfocusedBorderColor = Color.White, focusedPlaceholderColor = Color.Black, unfocusedPlaceholderColor = Color.White, focusedLabelColor = Color.Black, unfocusedLabelColor = Color.Black, ))

    Spacer(modifier = Modifier.height(16.dp))

    OutlinedTextField(value=email, onValueChange = { email = it } , label = @androidx.compose.runtime.Composable { Text(text = "Email-Id")}  , colors= OutlinedTextFieldDefaults.colors(focusedBorderColor = Color.White, unfocusedBorderColor = Color.White, focusedPlaceholderColor = Color.White, unfocusedPlaceholderColor = Color.White, focusedLabelColor = Color.Black, unfocusedLabelColor = Color.Black, ))

    Spacer(modifier = Modifier.height(16.dp))

    OutlinedTextField(value = password, onValueChange = { password = it }, label = { Text(text = "Password") }, visualTransformation = PasswordVisualTransformation(),colors= OutlinedTextFieldDefaults.colors(focusedBorderColor = Color.White, unfocusedBorderColor = Color.White, focusedPlaceholderColor = Color.White, unfocusedPlaceholderColor = Color.White, focusedLabelColor = Color.Black, unfocusedLabelColor = Color.Black))

        Spacer(modifier = Modifier.height(16.dp))

        Button(onClick = { Log.i("Credential", "Username $username Email $email Password: $password")}, colors = ButtonDefaults.buttonColors(
            containerColor = Color.White, contentColor = Color.Black
        )) { Text(text = "SignUp") }

        Spacer(modifier = Modifier.height(16.dp))

        Text(text = "Already had Account? then click below", modifier = Modifier.clickable { }, color= Color.White)

        Spacer(modifier = Modifier.height(16.dp))

        Button(onClick = { },colors = ButtonDefaults.buttonColors(
            containerColor = Color.White, contentColor = Color.Black)) { Text(text = "Login") }

    }
}