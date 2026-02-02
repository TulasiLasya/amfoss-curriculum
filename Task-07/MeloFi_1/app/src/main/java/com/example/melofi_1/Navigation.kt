package com.example.melofi_1

import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.BlendMode
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

@Composable
fun AppNavigation(){
    val navController = rememberNavController()

    NavHost( // navHost is a layout container that acts as a window to display different screens
        navController = navController,
        startDestination = Screen.Login.route
    ){
        composable(Screen.Login.route){
            LoginScreen(navController)
        }
        composable(Screen.Dashboard.route){
            DashboardScreen()
        }
    }
}

