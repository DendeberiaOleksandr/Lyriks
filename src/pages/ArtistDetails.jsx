import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetArtistDetailsQuery} from "../redux/services/shazamCore";
import {DetailsHeader, Error, Loader, RelatedSongs} from "../components";

const ArtistDetails = () => {
    const { id: artistId } = useParams()

    const { activeSong, isPlaying } = useSelector(state => state.player)

    const { data, isLoading, error } = useGetArtistDetailsQuery(artistId)

    if (isLoading) return <Loader title={"Searching artist details"}/>

    if (error) return <Error/>

    return (
        <div className="flex flex-col">
            <DetailsHeader
                artistId={artistId}
                artistData={data}
            />

            <RelatedSongs
                data={Object.values(data?.songs)}
                isPlaying={isPlaying}
                activeSong={activeSong}
                artistId={artistId}
            />
        </div>
    );
}

export default ArtistDetails;
