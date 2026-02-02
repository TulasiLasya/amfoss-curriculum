package com.example.melofi_1



sealed class Screen(val route:String){
    object Login : Screen("login")
    object Dashboard : Screen("dashboard")
}