import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import {useGetSongsByCountryQuery} from "../redux/services/shazamCore";
import {Error, Loader, SongCard} from "../components";

const AroundYou = () => {

    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector(state => state.player)
    const { data, isLoading, error } = useGetSongsByCountryQuery(country)

    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_u7ZMBpToVxvy0nSiwUMyEIGCI5AnL`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [country])

    if (isLoading && loading) return <Loader title={"Loading songs around you"}/>

    if (error && country) return <Error/>

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Around You <span className="font-black">{country}</span>
            </h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    );
}

export default AroundYou;
