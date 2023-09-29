export type RawForecastData = {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number
    };
    weather: [
        {
            id: number;
            main: string;
            description: string;
            icon: string
        }
    ];
    clouds: {
        all: number
    };
    wind: {
        speed: number;
        deg: number;
        gust: number
    };
    visibility: number;
    pop: number;
    rain: {
        [key: string]: number
    };
    sys: {
        pod: string
    };
    dt_txt: string
};

export type ForecastMetric = 'metric' | 'imperial';

export type ForecastData = RawForecastData & {
    id: string;
}

export type ForecastState = {
    ids: ForecastData['id'][],
    byId: Record<ForecastData['id'], ForecastData[]>
};
