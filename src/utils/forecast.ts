import moment from 'moment';
import { ForecastState, RawForecastData } from './../hooks/useForecast/useForecast.types';
import { FORECAST_DATE_FORMAT } from '../constants/forecast';

export const buildForecastState = (data: RawForecastData[]) =>
    data.reduce((accum: ForecastState, item) => {
        const id = moment(item.dt_txt).format(FORECAST_DATE_FORMAT);

        if (!accum.ids.includes(id)) {
            accum.ids = [...accum.ids, id];
        }

        accum.byId[id] = [...(accum.byId[id] || []), { id, ...item }];

        return accum;
    }, { ids: [], byId: {} });
