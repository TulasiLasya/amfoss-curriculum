package com.example.melofi_1

import android.R.attr.end
import android.R.attr.onClick
import android.util.Log
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
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
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController


@Composable
fun ResetPasswordScreen(navController: NavController) {

    var email by remember { mutableStateOf("") }

    var password by remember { mutableStateOf("") }

    var confirmPassword by remember { mutableStateOf("") }

    val gradientBrush = Brush.linearGradient(

        0.0f to Color(0xFFFF6060),
        0.05f to Color(0xFFFF6060), // Still black at the middle
        1.0f to Color.Black, // Transition complete at bottom
        start = Offset(0f, 0f), // Top
        end = Offset(0f, Float.POSITIVE_INFINITY) // Bottom
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(gradientBrush)
    )
//    Image(
//            painter = painterResource(id = R.drawable.music),
//            contentDescription = "music image",
//            modifier = Modifier.size(50.dp)
//        )

    Column(
        modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {


        //Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Registration",
            fontSize = 28.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )

        Spacer(modifier = Modifier.height(16.dp))

        Text(text = "Create a account", color = Color.White)

        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = @androidx.compose.runtime.Composable { Text(text = "Email") },
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = Color.White,
                unfocusedBorderColor = Color.White,
                focusedPlaceholderColor = Color.White,
                unfocusedPlaceholderColor = Color.White,
                focusedLabelColor = Color.White,
                unfocusedLabelColor = Color.White,
            )
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = @androidx.compose.runtime.Composable { Text(text = "Password") },
            visualTransformation = PasswordVisualTransformation(),
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = Color.White,
                unfocusedBorderColor = Color.White,
                focusedPlaceholderColor = Color.White,
                unfocusedPlaceholderColor = Color.White,
                focusedLabelColor = Color.White,
                unfocusedLabelColor = Color.White,
                cursorColor = Color.White,
                focusedTextColor = Color.White,
                unfocusedTextColor = Color.White,

                )
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = confirmPassword,
            onValueChange = { confirmPassword = it },
            label = { Text(text = "Confirm Password") },
            visualTransformation = PasswordVisualTransformation(),
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = Color.White,
                unfocusedBorderColor = Color.White,
                focusedPlaceholderColor = Color.White,
                unfocusedPlaceholderColor = Color.White,
                focusedLabelColor = Color.White,
                unfocusedLabelColor = Color.White,
                cursorColor = Color.White,
                focusedTextColor = Color.White,
                unfocusedTextColor = Color.White,

                )
        )

        Spacer(modifier = Modifier.height(16.dp))

        //Text(text = "Forgot Password?", modifier = Modifier.clickable { }, color = Color.White)

        //Spacer(modifier = Modifier.height(16.dp))
        //Log.i("Credential", "Email $email Password: $password"
        Button(
            onClick = {
                navController.navigate(Screen.Login.route) {

                }
            },
            colors = ButtonDefaults.buttonColors(
                containerColor = Color.White, contentColor = Color.Black
            )
        ) { Text(text = "Reset") }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "All Reset? Login",
            modifier = Modifier.clickable { navController.navigate(Screen.Login.route) },
            color = Color.White
        )


    }
}

