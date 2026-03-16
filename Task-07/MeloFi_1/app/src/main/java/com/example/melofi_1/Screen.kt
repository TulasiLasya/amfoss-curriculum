package com.example.melofi_1


sealed class Screen(val route: String) {
    object Login : Screen("login")
    object Dashboard : Screen("dashboard")

    object Registration : Screen("registration")
    object ForgotPassword : Screen("forgot_password")
    object SongPlay : Screen("song_play/{songId}") {
        fun passSongId(songId: String): String = "song_play/$songId"
    }
}