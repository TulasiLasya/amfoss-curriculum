package com.example.melofi_1.api

// this is like a contract
//  it tells retrofit exactly how to talk to your servers music db.
import com.example.melofi_1.Song
import retrofit2.http.GET

interface SongApiService {
    @GET("api/songs")
    suspend fun getSongs(): List<Song>
}