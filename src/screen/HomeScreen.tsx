import React, { useEffect } from 'react'
import Carousel from 'react-native-snap-carousel';
import { View, Text, Button, ActivityIndicator, Dimensions, FlatList, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { Movie } from '../interfaces/movieInterface';
import { HorizontalSlider } from '../components/HorizontalSlider';



const { width: sliderWidth } = Dimensions.get('window')


export const HomeScreen = () => {

    const { newPlay, popular, topRated, upcoming, isLoading } = useMovies()
    const { top } = useSafeAreaInsets()

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }} >
                <ActivityIndicator color='red' size={100} />
            </View>
        )
    }

    return (
        <ScrollView>


            <View style={{ marginTop: top + 20 }}>

                {/* Carosel Principal */}
                <View style={{ height: 440 }}>
                    <Carousel
                        data={newPlay}
                        // renderItem={() => <MoviePoster movie={peliculasEnCine[1]} />}
                        renderItem={({ item }: any) => <MoviePoster movie={item} />}
                        // renderItem={(item: { item: Movie }) => <MoviePoster movie={item.item} />}
                        sliderWidth={sliderWidth}
                        itemWidth={300}
                        inactiveSlideOpacity={0.9}

                    />
                </View>

                {/* Peliculas Popublares */}
                <HorizontalSlider movies={popular} title={'Peliculas populares'} />
                <HorizontalSlider movies={topRated} title={'Más valoradas'} />
                <HorizontalSlider movies={upcoming} title={'Próximamente'} />




            </View>
        </ScrollView>
    )
}
