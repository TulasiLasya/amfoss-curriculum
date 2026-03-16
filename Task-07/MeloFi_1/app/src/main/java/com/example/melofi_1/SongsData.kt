package com.example.melofi_1

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class Song(
    @Json(name="_id") val id: String,
    @Json(name="songName") val songName: String,
    @Json(name= "songBanner") val songBanner: String,
    @Json(name= "singer")val singer: String,
    @Json(name= "url") val url: String,
    @Json(name= "albumname") val albumname: String
)