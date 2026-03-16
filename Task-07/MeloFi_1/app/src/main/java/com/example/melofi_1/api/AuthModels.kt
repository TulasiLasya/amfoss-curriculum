package com.example.melofi_1.api

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

// Request for registration

@JsonClass(generateAdapter = true)
data class RegisterRequest(
    @Json(name = "username") val username: String,
    @Json(name = "email") val email: String,
    @Json(name = "password") val password: String
)

// Response from registration
@JsonClass(generateAdapter = true)
data class RegisterResponse(
    @Json(name = "message") val message: String,
    @Json(name = "user") val user: UserResponse?
)

// Request for login
@JsonClass(generateAdapter = true)
data class LoginRequest(
    @Json(name = "email") val email: String,
    @Json(name = "password") val password: String
)

// Response from login
@JsonClass(generateAdapter = true)
data class LoginResponse(
    @Json(name = "message") val message: String,
    @Json(name = "user") val user: UserResponse?,
    @Json(name = "token") val token: String?
)

// User data returned from API
@JsonClass(generateAdapter = true)
data class UserResponse(
    @Json(name = "id") val id: Int,
    @Json(name = "username") val username: String,
    @Json(name = "email") val email: String
)