package com.example.melofi_1

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.melofi_1.api.RetrofitInstance
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch



class DashboardViewModel : ViewModel() {

    private val _songs = MutableStateFlow<List<Song>>(emptyList())
    val songs: StateFlow<List<Song>> = _songs

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    init {
        fetchSongs()
    }


    fun fetchSongs() {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                val result = RetrofitInstance.songApi.getSongs()
                _songs.value = result

            } catch (e: Exception) {
                _error.value = "Failed to load songs: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }
}