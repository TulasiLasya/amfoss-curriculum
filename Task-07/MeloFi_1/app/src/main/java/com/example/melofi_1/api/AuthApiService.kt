package com.example.melofi_1.api

import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApiService {

    @POST("users")  // This matches Flask endpoint
    suspend fun register(@Body request: RegisterRequest): RegisterResponse

    @POST("login")  // This matches Flask endpoint
    suspend fun login(@Body request: LoginRequest): LoginResponse
}