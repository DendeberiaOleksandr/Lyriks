import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '8d982efdddmsh080ff4a74ec72e4p18090ejsn442cf80970c5')
            headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com')
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: () => ({
                url: '/charts/world',
                method: 'GET'
            })
        }),
        getSongsByGenre: builder.query({
            query: (genre) => ({
                url: `/charts/genre-world?genre_code=${genre}`,
                method: 'GET'
            })
        }),
        getSongDetails: builder.query({
            query: (songid) => ({
                url: `/tracks/details?track_id=${songid}`,
                method: 'GET'
            })
        }),
        getSongRelated: builder.query({
            query: (songid) => ({
                url: `/tracks/related?track_id=${songid}`,
                method: 'GET'
            })
        }),
        getArtistDetails: builder.query({
            query: (artistid) => ({
                url: `/artists/details?artist_id=${artistid}`
            })
        }),
        getSongsByCountry: builder.query({
            query: (country) => ({
                url: `/charts/country?country_code=${country}`,
                method: 'GET'
            })
        }),
        getSongsBySearch: builder.query({
            query: (searchTerm) => ({
                url: `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`
            })
        }),
    })
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenreQuery,
    useGetSongsBySearchQuery,
} = shazamCoreApi