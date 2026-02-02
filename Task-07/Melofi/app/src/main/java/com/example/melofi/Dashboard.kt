package com.example.melofi

import android.R.attr.label
import android.R.attr.onClick
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.wear.compose.navigation.currentBackStackEntryAsState


@Composable
fun Dashboard(navController: NavController){

    val navController =  rememberNavController()
    Scaffold(
        bottomBar = { BottomNavigationBar(navController)}
    ){ paddingValues ->
        NavHost(
            navController,
            startDestination = "home",
            Modifier.padding(paddingValues)
        )
        {
            composable("dashboard") { Dashboard(navController) }
            composable("profile") { Prof(navController) }
            composable("Playlist") { Playlist(navController) }
        }
    }
    Box(
        modifier= Modifier
            .fillMaxSize()
            .background(color = Color.Black)

    ){

    }

    
}
data class BottomNavItem(
    val label:String,
    val route: String
)

@Composable
fun BottomNavigationBar(navController: NavController){
    Header()
//    val navItems = listOf(
//        BottomNavItem("Dashboard", "dashboard"),
//        BottomNavItem("Prof","prof"),
//        BottomNavItem("Profile", "profile")
//    )
//    BottomNavigation {
//        val navBackStackEntry = navController.currentBackStackEntryAsState()
//        val currentRoute = navBackStackEntry.value?.destination?.route
//
//        navItems.forEach { item ->
//            BottomNavigationItem(
//                selected = currentRoute == item.route,
//                onClick = {navController.navigate(item.route)},
//                label = { Text(item.label)}
//            )
//        }


    }

