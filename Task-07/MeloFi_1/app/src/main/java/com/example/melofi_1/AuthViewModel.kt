package com.example.melofi_1

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.melofi_1.api.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.io.IOException

class AuthViewModel : ViewModel() {

    // Registration states
    private val _registerLoading = MutableStateFlow(false) // only view-model can change the values
    val registerLoading: StateFlow<Boolean> = _registerLoading.asStateFlow() // here the above values are passed out and it cannot be changed.

    private val _registerError = MutableStateFlow<String?>(null)
    val registerError: StateFlow<String?> = _registerError.asStateFlow()

    private val _registerSuccess = MutableStateFlow(false)
    val registerSuccess: StateFlow<Boolean> = _registerSuccess.asStateFlow()

    // Login states
    private val _loginLoading = MutableStateFlow(false)
    val loginLoading: StateFlow<Boolean> = _loginLoading.asStateFlow()

    private val _loginError = MutableStateFlow<String?>(null)
    val loginError: StateFlow<String?> = _loginError.asStateFlow()

    private val _loginSuccess = MutableStateFlow(false)
    val loginSuccess: StateFlow<Boolean> = _loginSuccess.asStateFlow()

    private val _currentUser = MutableStateFlow<UserResponse?>(null)
    val currentUser: StateFlow<UserResponse?> = _currentUser.asStateFlow()

    private val _authToken = MutableStateFlow<String?>(null)
    val authToken: StateFlow<String?> = _authToken.asStateFlow()

    fun register(username: String, email: String, password: String) {
        println("Register called with $username, $email")
        viewModelScope.launch {
            _registerLoading.value = true
            _registerError.value = null

            try {
                val request = RegisterRequest(username, email, password)
                val response = RetrofitInstance.authApi.register(request)
                println("API response: $response")

                if (response.message?.contains("successfully") == true) {
                    _registerSuccess.value = true
                } else {
                    _registerError.value = response.message ?: "Registration failed"
                }
            } catch (e: retrofit2.HttpException) {
                println("Exception: ${e.message}")
                when (e.code()) {
                    400 -> _registerError.value = "Invalid input. Please check your details."
                    409 -> _registerError.value = "Email already exists. Please use a different email."
                    else -> _registerError.value = "Server error (${e.code()}). Please try again."
                }
            } catch (e: Exception) {
                _registerError.value = "Network error: ${e.message}"
            } finally {
                _registerLoading.value = false
            }
        }
    }

    // for debugging:

//fun register(username: String, email: String, password: String) {
//    println("📱 Register called with $username, $email")
//    viewModelScope.launch {
//        _registerLoading.value = true
//        _registerError.value = null
//        try {
//            println("🌐 Making network call...")
//            val response = RetrofitInstance.authApi.register(RegisterRequest(username, email, password))
//            println("✅ Network call succeeded, response: $response")
//            if (response.message?.contains("successfully") == true) {
//                _registerSuccess.value = true
//            } else {
//                _registerError.value = response.message ?: "Registration failed"
//            }
//        } catch (e: retrofit2.HttpException) {
//            println("❌ HTTP error: ${e.code()} - ${e.message()}")
//            _registerError.value = "Server error (${e.code()})"
//        } catch (e: IOException) {
//            println("🚫 Network error: ${e.message}")
//            _registerError.value = "Network error: ${e.message}"
//        } catch (e: Exception) {
//            println("❌ Unexpected error: ${e.message}")
//            e.printStackTrace()
//            _registerError.value = "Unexpected error: ${e.message}"
//        } finally {
//            _registerLoading.value = false
//        }
//    }
//}
    fun login(email: String, password: String) {
        viewModelScope.launch {
            _loginLoading.value = true
            _loginError.value = null

            try {
                val request = LoginRequest(email, password)
                val response = RetrofitInstance.authApi.login(request)

                if (response.token != null) {
                    _currentUser.value = response.user
                    _authToken.value = response.token
                    _loginSuccess.value = true
                } else {
                    _loginError.value = response.message ?: "Login failed"
                }
            } catch (e: retrofit2.HttpException) {
                when (e.code()) {
                    400 -> _loginError.value = "Email and password are required"
                    401 -> _loginError.value = "Invalid password"
                    404 -> _loginError.value = "User not found"
                    else -> _loginError.value = "Server error (${e.code()}). Please try again."
                }
            } catch (e: Exception) {
                _loginError.value = "Network error: ${e.message}"
            } finally {
                _loginLoading.value = false
            }
        }
    }

    fun resetStates() {
        _registerSuccess.value = false
        _loginSuccess.value = false
        _registerError.value = null
        _loginError.value = null
    }

    fun logout() {
        _currentUser.value = null
        _authToken.value = null
    }
}