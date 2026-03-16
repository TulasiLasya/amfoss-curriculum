package com.example.melofi_1

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class SharedViewModel : ViewModel() {
    private val _selectedSong = MutableStateFlow<Song?>(null)
    val selectedSong: StateFlow<Song?> = _selectedSong

    private val _allSongs = MutableStateFlow<List<Song>>(emptyList())
    val allSongs: StateFlow<List<Song>> = _allSongs

    fun selectSong(song: Song) {
        _selectedSong.value = song
    }

    fun updateSongs(songs: List<Song>) {
        _allSongs.value = songs
    }

    fun getSongById(songId: String): Song? {
        return _allSongs.value.find { it.id == songId }
    }

    fun clearSelectedSong() {
        _selectedSong.value = null
    }
}