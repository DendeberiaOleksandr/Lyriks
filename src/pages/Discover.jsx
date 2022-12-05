import {genres} from "../assets/constants";
import {Error, Loader, SongCard} from "../components";
import {useGetSongsByGenreQuery} from "../redux/services/shazamCore";
import {useDispatch, useSelector} from "react-redux";
import {selectGenreListId} from "../redux/features/playerSlice";

const Discover = () => {

    const dispatch = useDispatch()
    const {isPlaying, activeSong, genreListId } = useSelector(state => state.player)

    const { data, isLoading, error } = useGetSongsByGenreQuery(genreListId || 'POP');

    if (isLoading) return <Loader title="Loading songs..."/>

    if (error) return <Error/>

    const genreTitle = genres.find(({ value }) => value === genreListId)?.title

    return (
        <div className={"flex flex-col"}>
            <div className="w-full flex justify-between items-center
                sm:flex-row flex-col mt-4 mb-10">
                <h2 className={"font-bold text-3xl text-white text-left"}>Discover {genreTitle}</h2>
                <select
                    className="bg-black text-gray-300 p-3 text-sm
                    rounded-lg outline-none sm:mt-0 mt-5"
                    onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                    value={genreListId || 'pop'}

                >
                    {genres.map(genre => <option value={genre.value} key={genre.value}>
                        {genre.title}
                    </option>)}
                </select>
            </div>

            <div className="flex flex-wrap sm:justify-start
                justify-center gap-8">
                {
                    data?.map((song, i) => (
                        <SongCard
                            data={data}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            i={i}
                            key={song.key}
                            song={song}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Discover;
