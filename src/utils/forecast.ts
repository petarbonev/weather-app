import moment from 'moment';
import { ForecastMetric, ForecastState, RawForecastData } from './../hooks/useForecast/useForecast.types';
import { FORECAST_DATE_FORMAT } from '../constants/forecast';
import { getKey } from '../i18n';

export const buildForecastState = (data: RawForecastData[]) =>
    data.reduce((accum: ForecastState, item) => {
        const id = moment(item.dt_txt).format(FORECAST_DATE_FORMAT);

        if (!accum.ids.includes(id)) {
            accum.ids = [...accum.ids, id];
        }

        accum.byId[id] = [...(accum.byId[id] || []), { id, ...item }];

        return accum;
    }, { ids: [], byId: {} });

export const formatTemperature = (value: number, metric: ForecastMetric) => {
    const sign = getKey(`sign.${metric === 'metric' ? 'celsius' : 'farenheit'}`);

    return `${Math.round(value)} ${sign}`;
};
