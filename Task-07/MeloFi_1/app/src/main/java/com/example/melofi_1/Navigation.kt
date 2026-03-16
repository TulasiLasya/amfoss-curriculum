package com.example.melofi_1

import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument


@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    val sharedViewModel: SharedViewModel = viewModel()


    NavHost( // navHost is a layout container that acts as a window to display different screens
        navController = navController,
        startDestination = Screen.Login.route
    ) {
        composable(Screen.Login.route) {
            LoginScreen(navController)

        }
        composable(Screen.Registration.route) {
            RegistrationScreen(navController)
        }

        composable(Screen.Dashboard.route) {
            DashboardScreen(
                onSongClick = { song ->
                    sharedViewModel.selectSong(song)
                    navController.navigate(Screen.SongPlay.passSongId(song.id))
                }
            )
        }
        composable(
            route = Screen.SongPlay.route,
            arguments = listOf(navArgument("songId") { type = NavType.StringType })
        ) { backStackEntry ->
            val songId = backStackEntry.arguments?.getString("songId") ?: ""

            SongPlayScreen(
                navController = navController,
                songId = songId,
                sharedViewModel = sharedViewModel
            )
        }

    }
}

