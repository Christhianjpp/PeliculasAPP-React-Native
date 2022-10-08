import { useEffect, useState } from "react"
import movieDB from "../api/movieDB"
import { Movie, MovieDBMoviesResponse } from "../interfaces/movieInterface"


interface MoviesState {
    newPlay: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true)

    const [moviesState, setMoviesState] = useState<MoviesState>({
        newPlay: [],
        popular: [],
        topRated: [],
        upcoming: [],
    })


    const getMovies = async () => {

        const newPlayPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing')
        const popularPromise = movieDB.get<MovieDBMoviesResponse>('/popular')
        const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated')
        const upcomingPromise = movieDB.get<MovieDBMoviesResponse>('/upcoming')

        const resps = await Promise.all([
            newPlayPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise])

        setMoviesState({
            newPlay: resps[0].data.results,
            popular: resps[1].data.results,
            topRated: resps[2].data.results,
            upcoming: resps[3].data.results,
        })
        setIsLoading(false)
    }

    useEffect(() => {
        getMovies()
    }, [])


    return {
        ...moviesState,
        isLoading
    }
}
