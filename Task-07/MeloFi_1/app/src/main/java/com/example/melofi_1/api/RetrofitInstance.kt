package com.example.melofi_1.api

import com.example.melofi_1.Song
import retrofit2.Retrofit

//This is the Translator. It automatically converts the JSON text from the server into the Kotlin data classes
import retrofit2.converter.moshi.MoshiConverterFactory

import retrofit2.http.GET
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import java.util.concurrent.TimeUnit

object RetrofitInstance {
    private const val BASE_URL = "http://10.0.2.2:8000/"

    private val logging =
        HttpLoggingInterceptor().apply { // httplogginginterceptor sends and receives to the logcat so u can see the json is correct.
            level = HttpLoggingInterceptor.Level.BODY
        }

    private val client = OkHttpClient.Builder() // this okhttpclient make to moves the data
        .addInterceptor(logging)
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .build()

    val songApi: SongApiService by lazy { // by lazy means: they won't be created until the exact second your app actually needs to use them.
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(client)
            .addConverterFactory(MoshiConverterFactory.create())
            .build()
            .create(SongApiService::class.java)
    }

    // for authentication
    val authApi: AuthApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(client)
            .addConverterFactory(MoshiConverterFactory.create())
            .build()
            .create(AuthApiService::class.java)
    }
}
